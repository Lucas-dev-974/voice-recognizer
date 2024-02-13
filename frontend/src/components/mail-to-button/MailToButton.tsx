import "./mailToButton.css";

interface MailToButtonProps {
  text: string;
}

export function MailToButton(props: MailToButtonProps) {
  return (
    <a class="mail-to-button px-10" href="mailto:lucas.lvn97439@gmail.com">
      {props.text}
    </a>
  );
}
