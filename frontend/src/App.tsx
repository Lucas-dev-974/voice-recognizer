import { Component, Switch, Match, onMount, createEffect, on } from "solid-js";

import "./index.css";
import { Navbar } from "./components/navbar/Navbar";
import { Pages, currentPage, getUser, setUser } from "./app.state";
import { Home } from "./views/home/Home";
import { Authentication } from "./views/authentification/Authentication";
import { AuthenticationService } from "./services/authentication.service";
import { User } from "./model/User";
import { NotificationsService } from "./nofication/Notification";

import "./app.utils";
import { retrieveLocal, saveInLocal } from "./app.utils";

const App: Component = () => {
  retrieveLocal();
  onMount(async () => {
    const response = await AuthenticationService.token();
    console.log("response: " + response);

    if (!response) return setUser();
  });

  createEffect(
    on(getUser, () => {
      if (getUser()) saveInLocal("user", getUser());
    })
  );

  return (
    <div class="app">
      <Navbar />
      <NotificationsService />
      <div class="app-content">
        <Switch>
          <Match when={currentPage() == Pages.home}>
            <Home />
          </Match>
          <Match when={currentPage() == Pages.authentication}>
            <Authentication />
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default App;
