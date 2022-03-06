import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showLogout } from "./logout.js";
import { showRegister } from "./register.js";

export const links={
    "login":showLogin,
    "logout":showLogout,
    "register":showRegister,
    "movies":showHome,
    "home":showHome
}
export const sections={
    "login":document.getElementById('form-login'),
    "register":document.getElementById('form-sign-up'),
    "home":document.getElementById('home-page'),
    "movies":document.getElementById('home-page'),
    "movie":document.getElementById('movie'),
    "btnAdd":document.getElementById('add-movie-button'),
    "add-movie":document.getElementById('add-movie'),
    "movie-example":document.getElementById('movie-example'),
    "edit-movie":document.getElementById('edit-movie')

}
export const btnView={
    welcome:document.querySelector('a[data-link="welcome"]'),
    login:document.querySelector('a[data-link="login"]'),
    logout:document.querySelector('a[data-link="logout"]'),
    register:document.querySelector('a[data-link="register"]'),
}
btnView.logout.style.display='none';
btnView.welcome.style.display='none';


const allSec=Array.from(document.querySelectorAll('section'));

allSec.map(x=>x.remove());
const nav=document.querySelector('nav');
nav.addEventListener('click',navigatorPage);

function navigatorPage(e) {
    e.preventDefault();
    if (e.target.tagName=='A') {
        const link=e.target.getAttribute("data-link");
        const page=links[link];
        if(typeof page==='function'){
            const i=sections[link];
            page(i)
        }
    }
}