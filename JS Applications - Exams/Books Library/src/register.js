import { userNav } from "./app.js";
import { html } from "./lib.js";
import { regUsers } from "./requests.js";

const templateReg = (onSubmit) => html`
  <section id="register-page" class="register">
    <form @submit=${onSubmit} id="register-form" action="" method="">
      <fieldset>
        <legend>Register Form</legend>
        <p class="field">
          <label for="email">Email</label>
          <span class="input">
            <input type="text" name="email" id="email" placeholder="Email" />
          </span>
        </p>
        <p class="field">
          <label for="password">Password</label>
          <span class="input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </span>
        </p>
        <p class="field">
          <label for="repeat-pass">Repeat Password</label>
          <span class="input">
            <input
              type="password"
              name="confirm-pass"
              id="repeat-pass"
              placeholder="Repeat Password"
            />
          </span>
        </p>
        <input class="button submit" type="submit" value="Register" />
      </fieldset>
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
    const rePass = formData.get("confirm-pass").trim();
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
        ctx.page.redirect("/");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      e.target.reset();
      alert("Password dont match or wrong email!");
    }
  }
}
