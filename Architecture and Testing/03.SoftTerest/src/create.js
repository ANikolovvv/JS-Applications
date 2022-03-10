import { links, sections } from "./api.js";
import { idea } from "./rest.js";

const main = document.querySelector("main");

export function createPage(art) {
  main.replaceChildren(art);

  const form = art.querySelector("form");
  form.addEventListener("submit", createIdea);

  async function createIdea(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const img = formData.get("imageURL");

    if (title.length > 5 && description.length > 9 && img.length > 4) {
      const info = { title, description, img };
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;
      idea(info, token);

      const sec = sections["dash"];
      links["dash"](sec);
    }
    form.reset();
  }
}
