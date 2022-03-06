import { links, sections } from "./app.js";
import { onLogin } from "./requests.js";

const main = document.querySelector("main");
export async function showLogin(section) {
  main.replaceChildren(section);
  const form = section.querySelector("form");

  form.addEventListener("submit", resLogin);

  async function resLogin(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const email = formdata.get("email");
    const password = formdata.get("password");
    const info = { email, password };
    const res = await onLogin(info);
    if (res.ok) {
        const s=sections['home'];
        links['home'](s)
    }
    form.reset()
  }
}
