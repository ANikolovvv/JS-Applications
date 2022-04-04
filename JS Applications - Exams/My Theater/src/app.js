import { render, page } from "./lib.js";
import { catalogPage } from "./catalog.js";
import { createPage } from "./create.js";
import { detailsPage } from "./details.js";
import { editPage } from "./edit.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { resLogout } from "./requests.js";

import { profilePage } from "./profile.js";

const root = document.querySelector("#content");
document.getElementById("logoutBtn").addEventListener("click", logoutUser);

const allLiEl = Array.from(document.querySelectorAll("nav li"));
userNav();
page(decorateContex);
page("/", catalogPage);
page("/details/:id", detailsPage);
page("/create", createPage);
page("/edit/:id", editPage);
page("/login", loginPage);
page("/register", registerPage);
page("/profile", profilePage);

page.start();

function decorateContex(ctx, next) {
  ctx.render = (content) => render(content, root);

  next();
}

export function userNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    allLiEl[0].style.display = "inline-block";
    allLiEl[1].style.display = "inline-block";
    allLiEl[2].style.display = "inline-block";
    allLiEl[3].style.display = "none";
    allLiEl[4].style.display = "none";
    document.getElementById("l").style.display = "none";
  } else {
    allLiEl[0].style.display = "none";
    allLiEl[1].style.display = "none";
    allLiEl[2].style.display = "none";
    allLiEl[3].style.display = "inline-block";
    allLiEl[4].style.display = "inline-block";
    document.getElementById("l").style.display = "inline-block";
  }
}

async function logoutUser() {
  const token = JSON.parse(localStorage.getItem("user"));
  await resLogout(token.accessToken);
  page.redirect("/");
  userNav();
}
