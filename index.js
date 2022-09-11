import { urlRoutes } from "./routes.js";

document.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("nav a")) {
    return;
  }
  event.preventDefault();
  console.log(target);
  urlRoute(event);
});

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  const location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }

  const route = urlRoutes[location] || urlRoutes["404"];
  const html = await fetch(route.template).then((response) => response.text());
  document.querySelector("#content").innerHTML = html;
  document.title = route.title;
  document.querySelector('meta[name="description"]').content =
    route.description;
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();
