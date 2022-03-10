import { btnView } from "./api.js";
import { resLogout } from "./rest.js";

const main = document.querySelector("main");
export function showLogout() {
  main.replaceChildren("");
  const user = JSON.parse(localStorage.getItem("user"));
  resLogout(user.accessToken);

  btnView.logout.style.display = "none";
  btnView.dash.style.display = "block";
  btnView.create.style.display = "none";
  btnView.login.style.display = "block";
  btnView.register.style.display = "block";
}
