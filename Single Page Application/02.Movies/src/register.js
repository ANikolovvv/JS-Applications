import { btnView, links, sections } from "./app.js";
import { regUsers } from "./requests.js";

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
    //console.log(email);
    //console.log(valid);
    if (valid !== null && password.length > 5 && password === repeatPassword) {
      //console.log("yes");
      const info = { email, password, repeatPassword };
      const res = await regUsers(info);
      if (res.ok) {
        const s = sections["home"];
        links["home"](s);
        btnView.login.style.display = "none";
        btnView.register.style.display = "none";
        btnView.logout.style.display = "block";
        btnView.welcome.style.display = "block";
      }
    }
    form.reset();
  }
}
