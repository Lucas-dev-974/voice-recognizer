import { Component, Switch, Match, onMount } from "solid-js";

import "./index.css";
import { Navbar } from "./components/navbar/Navbar";
import { Pages, currentPage, setLogged, getUser } from "./app.state";
import { Home } from "./views/home/Home";
import { Authentication } from "./views/authentification/Authentication";
import { AuthenticationService } from "./services/authentication.service";
import { User } from "./model/User";
import { NotificationsService } from "./nofication/Notification";

import "./app.utils";

const App: Component = () => {
  onMount(async () => {
    const response = await AuthenticationService.token(getUser() as User);
    if (!!response) return setLogged(true);
  });

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
