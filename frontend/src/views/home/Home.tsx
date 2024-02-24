import { PageLayout } from "../../components/page-layout/PageLayout";
import { FooterPresentation } from "./top-page/FooterPressentation";
import { HomePresentation } from "./top-page/HomePresentation";

import "./home.css";
import { Discover } from "./mid-page/Discover";
import { Show } from "solid-js";
import { getUser } from "../../app.state";
import { SerivceUse } from "./bottom-page/ServiceUse";

export function Home() {
  return (
    <>
      <PageLayout isBottomNavbar={true} class="home">
        <HomePresentation />
        <FooterPresentation />
      </PageLayout>

      <PageLayout>
        <Discover />
        {/* TODO: Show model métrics */}
      </PageLayout>

      <Show when={getUser() != undefined}>
        <PageLayout>
          <SerivceUse />
        </PageLayout>
      </Show>
    </>
  );
}
