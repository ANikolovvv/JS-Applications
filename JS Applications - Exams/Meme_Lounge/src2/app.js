import { showAll } from "./allMemes.js";
import { showCreate } from "./create.js";
import { showDetails } from "./details.js";
import { showEdit } from "./edit.js";
import { showHome } from "./home.js";
import { render ,page} from "./lib.js";
import { showLogin } from "./login.js";
import { showProfile } from "./myProfile.js";
import { showReg } from "./register.js";
import { resLogout } from "./requests/crud.js";

const root=document.querySelector('main');
document.getElementById("logoutBtn").addEventListener("click", logoutUser);
nav()
page(navPages)
page('/',showHome)
page('/all',showAll)
page('/profile',showProfile)
page('/login',showLogin)
page('/create',showCreate)
page('/register',showReg)
page('/edit/:id',showEdit)
page('/details/:id',showDetails)

page.start();

function navPages(ctx,next) {
    ctx.render=(content)=>render(content,root)
    next();
}
export function nav() {
    const user=JSON.parse(localStorage.getItem('user'));

    if(user){
        document.getElementById('users').style.display='Inline-block';
        document.getElementById("guests").style.display="none";
        const span=document.querySelector('#users span');
        console.log(user)
        span.textContent=user.email;
        page.redirect("/all")
    }else{
        document.getElementById('users').style.display='none';
        document.getElementById("guests").style.display="inline-block";
        page.redirect("/")
    }
}
async function logoutUser() {
    const token = JSON.parse(localStorage.getItem("user"));
    await resLogout(token.accessToken);
    page.redirect("/");
    nav();
  }
  