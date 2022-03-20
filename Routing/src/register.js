import { userNav } from "./app.js";
import { html } from "./lib.js";
import { regUsers } from "./requests.js";

const templateReg = (onSubmit) => html` <div class="row space-top">
    <div class="col-md-12">
      <h1>Register New User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            name="password"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="rePass">Repeat</label>
          <input
            class="form-control"
            id="rePass"
            type="password"
            name="rePass"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </div>
    </div>
  </form>`;

export function registerPage(ctx) {
  console.log("reg");

  ctx.render(templateReg(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("rePass").trim();
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
      alert("Password dont match or wrong email!");
    }
  }
}
