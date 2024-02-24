import { JSXElement, children } from "solid-js";

import "./PageLayout.css";

interface PageLayoutProps {
  isBottomNavbar?: boolean;
  children: JSXElement;
  class?: string;
}

export function PageLayout(props: PageLayoutProps) {
  const child = children(() => props.children);

  return (
    <div
      class={"page-layout " + props.class}
      classList={{
        " bottom-nav": props.isBottomNavbar ?? false,
      }}
    >
      {child()}

      <div class="separator" />
    </div>
  );
}
