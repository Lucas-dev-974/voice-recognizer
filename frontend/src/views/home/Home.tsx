import { JSXElement } from "solid-js";
import "./home.css";
import { DefaultButton } from "../../components/button/Button";
import { MailToButton } from "../../components/mail-to-button/MailToButton";

function Presentation(): JSXElement {
  return (
    <div class="home-presentation">
      <h1 class="text-center text-[100px] tracking-[0.2em]">Secure Voice</h1>
      <h2 class="text-center text-[30px] ">Biométrie Vocale API</h2>
      <p class="text-center text-[20px]">
        Bienvenue sur le site de Secure Voice, ce site est un projet réaliser
        par Leveneur Lucas, il est l'interface qui permet d'utiliser un modèle
        d'intelligence artificielle entrainer pour faire de la reconnaissance
        vocale biométrique, ce modèle se nome SecureVoice.
      </p>
      <div class="flex justify-center mt-5">
        <MailToButton text="me contacter" />
      </div>
    </div>
  );
}

export function Home() {
  return (
    <div class="home">
      <Presentation />
    </div>
  );
}
