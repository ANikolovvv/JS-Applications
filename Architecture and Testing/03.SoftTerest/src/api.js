import { showCatalog } from "./catalog.js";
import { createPage } from "./create.js";
import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showLogout } from "./logout.js";
import { showRegister } from "./register.js";

export const links = {
  "login": showLogin,
  "logout": showLogout,
  "register": showRegister,
  "dash": showCatalog,
  "img": showHome,
  "create": createPage,
};
export const sections = {
  "login": document.getElementById("login"),
  "register": document.getElementById("register"),
  "img": document.getElementById("img"),
  "dash": document.getElementById("dashboard-holder"),
  "diner": document.getElementById("diner"),
  "create": document.getElementById("create"),
};
export const btnView = {
  dash: document.querySelector('a[data-link="dash"]'),
  login: document.querySelector('a[data-link="login"]'),
  logout: document.querySelector('a[data-link="logout"]'),
  register: document.querySelector('a[data-link="register"]'),
  create: document.querySelector('a[data-link="create"]'),
};
btnView.logout.style.display = "none";
btnView.dash.style.display = "block";
btnView.create.style.display = "none";
btnView.login.style.display = "block";
btnView.register.style.display = "block";

const allSec = Array.from(document.querySelectorAll("section"));
console.log(allSec);
allSec.map((x) => x.remove());
const nav = document.querySelector("nav");
nav.addEventListener("click", navigatorPage);

function navigatorPage(e) {
  e.preventDefault();
  if (e.target.tagName == "A" || e.target.tagName == "IMG") {
    const link = e.target.getAttribute("data-link");
    const page = links[link];
    if (typeof page === "function") {
      const i = sections[link];
      page(i);
    }
  }
}
