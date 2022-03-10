import { btnView } from "./api.js";

const main = document.querySelector("main");
export function showHome(params) {
  main.replaceChildren(params);
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    btnView.logout.style.display = "block";
    btnView.dash.style.display = "block";
    btnView.create.style.display = "block";
    btnView.login.style.display = "none";
    btnView.register.style.display = "none";
  }else{
    btnView.dash.style.display = "none";
  }
}
