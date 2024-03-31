import Handlebars from "handlebars/runtime";
import * as Components from "./components";
import { LoginPage } from "./pages";

Object.entries(Components).forEach(([name, value]) => {
  Handlebars.registerPartial(`component/${name}`, value);
});

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root") as HTMLElement;
  // тут менять страницы
  root.innerHTML = LoginPage({});
});
