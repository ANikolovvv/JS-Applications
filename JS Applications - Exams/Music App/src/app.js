import { render, page } from "./lib.js";
import { catalogPage } from "./catalog.js";
import { createPage } from "./create.js";
import { detailsPage } from "./details.js";
import { editPage } from "./edit.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { resLogout } from "./requests.js";
import { searchPage } from "./search.js";
import { homePage } from "./home.js";

const root = document.querySelector("#main-content");
document.getElementById("logoutBtn").addEventListener("click", logoutUser);
const allLi = Array.from(document.querySelectorAll("nav li"));
console.log(allLi);

userNav();
page(decorateContex);
page("/", homePage);
page("/catalog", catalogPage);
page("/details/:id", detailsPage);
page("/create", createPage);
page("/edit/:id", editPage);
page("/login", loginPage);
page("/register", registerPage);
page("/search", searchPage);

page.start();

function decorateContex(ctx, next) {
  ctx.render = (content) => render(content, root);

  next();
}

export function userNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    allLi[2].style.display = "none";
    allLi[3].style.display = "none";
    allLi[4].style.display = "inline-block";
    allLi[5].style.display = "inline-block";
  } else {
    allLi[2].style.display = "inline-block";
    allLi[3].style.display = "inline-block";
    allLi[4].style.display = "none";
    allLi[5].style.display = "none";
  }
}

async function logoutUser() {
  const token = JSON.parse(localStorage.getItem("user"));
  await resLogout(token.accessToken);
  page.redirect("/");
  userNav();
}
