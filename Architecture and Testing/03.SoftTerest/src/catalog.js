import { btnView } from "./api.js";
import { detailsPage } from "./details.js";
import { dashDom } from "./domElements.js";
import { all } from "./rest.js";

const main = document.querySelector("main");
export async function showCatalog(sec) {
   
  main.replaceChildren(sec);
  const allDish = Array.from(await all());
  //console.log(allDish);
  const user = JSON.parse(localStorage.getItem("user"));
  const h1 = sec.querySelector("h1");
  const div = sec.querySelector("#carts");
  div.replaceChildren("");
  if (allDish.length === 0) {
    div.replaceChildren(h1);
  } else {
    allDish.forEach((x) => {
      div.appendChild(dashDom(x));
    });
    div.addEventListener('click',(e)=>{
     
         e.preventDefault();
         if(e.target.tagName==='A'){
            const parent=e.target.parentNode;
             detailsPage(parent.id);
         }
     });
  }
  if (user) {
    btnView.logout.style.display = "block";
    btnView.dash.style.display = "block";
    btnView.create.style.display = "block";
    btnView.login.style.display = "none";
    btnView.register.style.display = "none";
  }
 
}
