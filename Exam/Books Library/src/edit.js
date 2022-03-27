import { html } from "./lib.js";
import { getData, updateMovie } from "./requests.js";

const templateEdit = (onSubmit, data) => html` <section
  id="edit-page"
  class="edit"
>
  <form @submit=${onSubmit} id="edit-form" action="#" method="">
    <fieldset>
      <legend>Edit my Book</legend>
      <p class="field">
        <label for="title">Title</label>
        <span class="input">
          <input type="text" name="title" id="title" value=${data.title} />
        </span>
      </p>
      <p class="field">
        <label for="description">Description</label>
        <span class="input">
          <textarea name="description" id="description">
${data.description}</textarea
          >
        </span>
      </p>
      <p class="field">
        <label for="image">Image</label>
        <span class="input">
          <input
            type="text"
            name="imageUrl"
            id="image"
            value=${data.imageUrl}
          />
        </span>
      </p>
      <p class="field">
        <label for="type">Type</label>
        <span class="input">
          <select id="type" name="type" value=${data.type}>
            <option value="Fiction" selected>Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Mistery">Mistery</option>
            <option value="Classic">Clasic</option>
            <option value="Other">Other</option>
          </select>
        </span>
      </p>
      <input class="button submit" type="submit" value="Save" />
    </fieldset>
  </form>
</section>`;

export async function editPage(ctx) {
  console.log("edit", ctx.params.id);

  const dataBook = await getData(ctx.params.id);
  console.log(dataBook);
  ctx.render(templateEdit(onSubmit, dataBook));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const type = formData.get("type").trim();

    const user = JSON.parse(localStorage.getItem("user"));
    if (title !== "" && description !== "" && imageUrl !== "" && type !== "") {
      const option = {
        title,
        description,
        imageUrl,
        type,
      };
      
      console.log(option);
      const res = await updateMovie(option, ctx.params.id, user.accessToken);
      try {
        if (res.status !== 200) {
          throw new Error();
        }
       
      } catch (error) {
        console.log(error.message);
      }
      e.target.reset();
      ctx.page.redirect(`/details/${ctx.params.id}`);
     
    }else{
      alert('All fields are require')
    }
  }
}
