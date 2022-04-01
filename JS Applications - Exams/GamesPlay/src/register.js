import { userNav } from "./app.js";
import { html } from "./lib.js";
import { regUsers } from "./requests.js";

const templateReg = (onSubmit) => html` <section id="register-page" class="content auth">
<form @submit=${onSubmit} id="register">
    <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com">

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password">

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password">

        <input class="btn submit" type="submit" value="Register">

        <p class="field">
            <span>If you already have profile click <a href="/login">here</a></span>
        </p>
    </div>
</form>
</section>

`;

export function registerPage(ctx) {
  console.log("reg");

  ctx.render(templateReg(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("confirm-password").trim();
    const option = { email, password };
    if (email !== "" && password === rePass && password !== "") {
      const ok = await regUsers(option);
      
      try {
        if (ok.status === 403) {
          e.target.reset();
          throw new Error(ok);
        }
        e.target.reset();
        userNav();
        ctx.page.redirect("/home");
      } catch (error) {
        console.log(error.message);
        alert(error);
      }
    } else {
      e.target.reset();
      alert("Password dont match or wrong email!");
    }
   }
}
