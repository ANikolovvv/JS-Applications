
import { regUsers } from "./crud.js";

console.log('TODO:// Implement Register functionality');
const links={
    "register":document.getElementById('register'),
    "login":document.getElementById('login'),
    "logout":document.getElementById('logout'),
}

links['logout'].style.display='none';
const form=document.querySelector("#register-view > form");

form.addEventListener('submit',regFunc);

async function regFunc(e) {
    e.preventDefault();
    const formData=new FormData(e.target);
    const email=formData.get("email");
    const password=formData.get("password");
    const repeatpassword=formData.get("rePass");
    if(password===repeatpassword){
        const option={email,password,repeatpassword};
        regUsers(option);
        form.reset()
    }
    
}