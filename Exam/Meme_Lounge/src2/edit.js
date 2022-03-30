import { errTemplate } from "./errTemplate.js";
import { html } from "./lib.js";
import { getData, updateMeme } from "./requests/crud.js";

const templateEdit = (onSubmit, dataMeme, error) => html`
  <section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
      <h1>Edit Meme</h1>
      <div class="container">
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter Title"
          name="title"
          .value=${dataMeme.title}
        />
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          name="description"
          .value=${dataMeme.description}
        >
        </textarea>
        <label for="imageUrl">Image Url</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Enter Meme ImageUrl"
          name="imageUrl"
          value=${dataMeme.imageUrl}
        />
        <input type="submit" class="registerbtn button" value="Edit Meme" />
      </div>
    </form>
  </section>
  ${error ? errTemplate(error) : null}
`;
export async function showEdit(ctx) {
  console.log("edit");
  const dataMeme = await getData(ctx.params.id);
  console.log(dataMeme);

  ctx.render(templateEdit(onSubmit, dataMeme));
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const imageUrl = formData.get("imageUrl").trim();

    const option = {
      title,
      description,
      imageUrl,
    };

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      if (title == "" || description == "" || imageUrl == "") {
        throw new Error("All fields are required!");
      }
      await updateMeme(option, ctx.params.id, user.accessToken);

      ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (err) {
      ctx.render(templateEdit(onSubmit, dataMeme, err.message));
      document.querySelector("div.notification ").style.display = "block";
      setTimeout(function () {
        ctx.render(templateEdit(onSubmit, dataMeme));
      }, 3000);
    }
  }
}
