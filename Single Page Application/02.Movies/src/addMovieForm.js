import { links, sections } from "./app.js";
import { createMovie } from "./requests.js";

const main = document.querySelector("main");
export async function addMovieForm() {

  main.replaceChildren(sections["add-movie"]);
  const form = sections["add-movie"].querySelector("form");
  form.addEventListener("submit", createMovieAdd);
  async function createMovieAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("imageUrl");

    if (title.trim() !== "" && description.trim() !== "" && img.trim()) {
      const info = { title, description, img };
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;
      //console.log(token);
       createMovie(info, token);
        const s = sections["home"];
        links["home"](s);
      
    }

    form.reset();
  }
}
