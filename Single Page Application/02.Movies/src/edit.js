import { sections } from "./app.js";
import { data } from "./createDom.js";
import { details } from "./details.js";
import { updateMovie } from "./requests.js";

const main = document.querySelector("main");

export async function edtMovieData(dataMovie) {
  const sec = sections["edit-movie"];
  const fragment = document.createDocumentFragment();
  fragment.appendChild(data(dataMovie));
  sec.replaceChildren(fragment);

  const form = sections["edit-movie"].querySelector("form");

  form.addEventListener("submit", updateMoviess);
  async function updateMoviess(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("imageUrl");
    if (title.trim() !== "" && description.trim() !== "" && img.trim()) {
        const info = { title, description, img };
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
       
        updateMovie(info,dataMovie._id,token);
         details(dataMovie._id)
          //const s = sections["home"];
          //links["home"](s);
        
      }
  
      form.reset();
  }
  main.replaceChildren(sec);
}
