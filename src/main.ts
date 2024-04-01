import Handlebars, { TemplateDelegate } from "handlebars/runtime";
import { Navigate } from "./components";
import * as Components from "./components";
import * as Pages from "./pages";

const pages: { [key: string]: TemplateDelegate } = Object.entries(Pages).reduce(
  (acc, current) => {
    const [key, value] = current;
    return { ...acc, [key]: value };
  },
  {}
);

function navigate(page: keyof typeof Pages) {
  const container = document.getElementById("root")!;
  container.innerHTML = Navigate({}) + pages[page]({});
}

Object.entries(Components).forEach(([name, value]) => {
  Handlebars.registerPartial(`component/${name}`, value);
});

document.addEventListener("DOMContentLoaded", () => {
  navigate("LoginPage");
});

document.addEventListener("click", (e) => {
  // @ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
