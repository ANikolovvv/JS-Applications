import { userNav } from "./app.js";
import { html } from "./lib.js";
import { onLogin } from "./requests.js";

const templateLogin = (onSubmit) => html`<section id="login-page" class="auth">
<form @submit=${onSubmit} id="login">

    <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password">
        <input type="submit" class="btn submit" value="Login">
        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </div>
</form>
</section>
`;

export function loginPage(ctx) {
  console.log("login");

  ctx.render(templateLogin(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const option = { email, password };
    const ok = await onLogin(option);
     if(email !=="" && password !==""){
      try {
        if (ok.status === 403) {
          e.target.reset();
          throw new Error(ok);
        }
        e.target.reset();
        userNav();
        ctx.page.redirect("/home");
      } catch (error) {
        alert(error.message);
        e.target.reset();
        
      }
     }else{
       alert("Empty fields")
     }
  
  }
}
