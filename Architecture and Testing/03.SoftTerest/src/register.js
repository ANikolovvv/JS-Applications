import { links, sections } from "./api.js";
import { regUsers } from "./rest.js";

const main = document.querySelector("main");
export function showRegister(section) {
  main.replaceChildren(section);
  console.log("reg");
  const form = sections["register"].querySelector("form");

  form.addEventListener("submit", regPerson);
  async function regPerson(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatPassword");
    const reg = /^\w+@\w+\.\w+$/;
    const valid = email.match(reg);

    if (
      valid !== null &&
      email.length > 2 &&
      password.length > 2 &&
      password === repeatPassword
    ) {
      const info = { email, password, repeatPassword };
      const res = await regUsers(info);
      if (res.ok) {
        const s = sections["img"];
        links["img"](s);
      }
    }
    form.reset();
  }
}
