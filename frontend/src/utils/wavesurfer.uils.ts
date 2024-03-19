import { createSignal } from "solid-js";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";
import { setStartedRecording } from "../views/home/bottom-page/VoiceAnalysis";
import { AudioService } from "../services/audio.service";

const [audioBlob, setAudioBlob] = createSignal<Blob>();

export class WaveSurferUtils {
  static wavesurfer: WaveSurfer;
  static microphone: HTMLDivElement;
  static scrollingWaveform = false;
  static record: RecordPlugin;
  static progress: HTMLDivElement;

  static initWaveSurfer() {
    this.wavesurfer = WaveSurfer.create({
      container: "#mic",
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
    });
  }

  static initRecorder() {
    this.record = this.wavesurfer.registerPlugin(
      RecordPlugin.create({
        scrollingWaveform: this.scrollingWaveform,
        renderRecordedAudio: false,
      })
    );
  }

  static setRecorderEvents() {
    if (!this.record) return;

    this.record.on("record-end", async (blob) => {
      setAudioBlob(blob);
      console.log("okok");

      await AudioService.import(blob);
      console.log("imported");

      const container = document.querySelector("#recordings") as HTMLDivElement;
      const recordedUrl = URL.createObjectURL(blob);

      // Create wavesurfer from the recorded audio
      this.wavesurfer = WaveSurfer.create({
        container,
        waveColor: "rgb(200, 100, 0)",
        progressColor: "rgb(100, 50, 0)",
        url: recordedUrl,
      });

      // Play button
      const button = container.appendChild(document.createElement("button"));
      button.textContent = "Play";
      button.onclick = () => this.wavesurfer.playPause();
      this.wavesurfer.on("pause", () => (button.textContent = "Play"));
      this.wavesurfer.on("play", () => (button.textContent = "Pause"));

      // Download link
      const link = container.appendChild(document.createElement("a"));
      Object.assign(link, {
        href: recordedUrl,
        download:
          "recording." + blob.type.split(";")[0].split("/")[1] || "webm",
        textContent: "Download recording",
      });
    });

    this.record.on("record-progress", (time) => {
      this.updateProgress(time);
    });
  }

  static createWavSurfer() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }

    this.initWaveSurfer();
    this.initRecorder();

    this.setRecorderEvents();
  }

  static enableEndRecord() {
    this.record.on("record-end", (blob) => {
      setAudioBlob(blob);
      setStartedRecording(false);
    });
  }

  static async startRecord() {
    if (!this.record) return;

    if (this.record.isRecording() || this.record.isPaused()) {
      this.record.stopRecording();
      return;
    }

    // get selected device
    const deviceId = (await RecordPlugin.getAvailableAudioDevices())[0];
    this.record.startRecording({ deviceId: deviceId.deviceId }).then(() => {
      // TODO: what todo ?
    });
  }

  static setMicrophone(microphone: HTMLDivElement) {
    this.microphone = microphone;
  }

  static setProgress(progress: HTMLDivElement) {
    this.progress = progress;
  }

  static updateProgress(time: number) {
    // time will be in milliseconds, convert it to mm:ss format
    const formattedTime = [
      Math.floor((time % 3600000) / 60000), // minutes
      Math.floor((time % 60000) / 1000), // seconds
    ]
      .map((v) => (v < 10 ? "0" + v : v))
      .join(":");
    this.progress.textContent = formattedTime;
  }
}
