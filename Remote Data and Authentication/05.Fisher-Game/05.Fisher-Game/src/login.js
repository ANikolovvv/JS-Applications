import { onSubmit } from "./crud.js";

console.log("TODO:// Implement Login functionality");
const links = {
  register: document.getElementById("register"),
  login: document.getElementById("login"),
  logout: document.getElementById("logout"),
};

links["logout"].style.display = "none";

const form = document.querySelector("#login-view > form");
const p=document.querySelector('nav > p > span');
console.log(p)
form.addEventListener("submit", regFunc);

async function regFunc(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  const option = { email, password };
  p.textContent=email;
  onSubmit(option);
  form.reset()
}
