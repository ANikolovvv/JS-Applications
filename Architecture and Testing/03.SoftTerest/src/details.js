import { links, sections } from "./api.js";
import { detailsDom } from "./domElements.js";
import { deleteId, getIdea } from "./rest.js";

const main = document.querySelector("main");
export async function detailsPage(idea) {
 
  const app = await getIdea(idea);
  const user = JSON.parse(localStorage.getItem("user"));
  const a = detailsDom(app, user);
  main.replaceChildren(a);
  if(user){
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.tagName === "A") {
        const id = e.target.parentNode.id;
        //console.log(parent)
        deleteId(id, user.accessToken);
        const sec = sections["dash"];
        links["dash"](sec);
      }
    });
  }

 
}
