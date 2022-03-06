import { btnView, links, sections } from "./app.js";
import { resLogout } from "./requests.js";

const main=document.querySelector('main');
export function showLogout(section) {
    main.replaceChildren(section);
    const user=JSON.parse(localStorage.getItem('user'));
    resLogout(user.accessToken);
    const s=sections['login'];
    links['login'](s);
    btnView.login.style.display='block'; 
    btnView.register.style.display='block'; 
    btnView.logout.style.display='none'; 
    btnView.welcome.style.display='none'; 

}