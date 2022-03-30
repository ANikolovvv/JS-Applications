import { errTemplate } from "./errTemplate.js";
import { html } from "./lib.js";
import { createMovie } from "./requests/crud.js";

const templateCreate = (onSubmit,error) => html`<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
      <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" />
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          name="description"
        ></textarea>
        <label for="imageUrl">Meme Image</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Enter meme ImageUrl"
          name="imageUrl"
        />
        <input type="submit" class="registerbtn button" value="Create Meme" />
      </div>
    </form>
  </section>
  ${error ? errTemplate(error) : null}`;
export async function showCreate(ctx) {
  console.log("create");
  ctx.render(templateCreate(onSubmit));
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const imageUrl = formData.get("imageUrl").trim();
    try {
      if (title == "" || description == "" || imageUrl == "") {
         throw new Error("All fields are required!")
      }
      const option = {
        title,
        description,
        imageUrl,
      };
      console.log(option);
      const user = JSON.parse(localStorage.getItem("user"));
      await createMovie(option, user.accessToken);
      e.target.reset();
      ctx.page.redirect("/all");
    } catch (err) {
      ctx.render(templateCreate(onSubmit, err.message));
      document.querySelector("div.notification ").style.display = "block";
      setTimeout(function () {
        ctx.render(templateCreate(onSubmit));
      }, 3000);
      e.target.reset();
    }
  }
}
