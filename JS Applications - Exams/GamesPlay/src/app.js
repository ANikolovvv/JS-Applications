import { render, page } from "./lib.js";
import { catalogPage } from "./catalog.js";
import { createPage } from "./create.js";
import { detailsPage } from "./details.js";
import { editPage } from "./edit.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { resLogout } from "./requests.js";

import { homePage } from "./home.js";

export const root = document.querySelector("#main-content");
document.getElementById("logoutBtn").addEventListener("click", logoutUser);

userNav();
page(decorateContex);
page("/", homePage);
page("/home", homePage);
page("/all", catalogPage);
page("/details/:id", detailsPage);
page("/create", createPage);
page("/edit/:id", editPage);
page("/login", loginPage);
page("/register", registerPage);

page.start();

function decorateContex(ctx, next) {
  ctx.render = (content) => render(content, root);

  next();
}

export function userNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("user").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "block";
  }
}

async function logoutUser() {
  const token = JSON.parse(localStorage.getItem("user"));
  await resLogout(token.accessToken);
  page.redirect("/home");
  userNav();
}
