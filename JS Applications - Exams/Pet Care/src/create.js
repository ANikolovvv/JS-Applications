import { html } from "./lib.js";
import { createPets } from "./requests.js";

const templateCreate = (onSubmit) => html`
  <section id="createPage">
    <form @submit=${onSubmit} class="createForm">
      <img src="./images/cat-create.jpg" />
      <div>
        <h2>Create PetPal</h2>
        <div class="name">
          <label for="name">Name:</label>
          <input name="name" id="name" type="text" placeholder="Max" />
        </div>
        <div class="breed">
          <label for="breed">Breed:</label>
          <input name="breed" id="breed" type="text" placeholder="Shiba Inu" />
        </div>
        <div class="Age">
          <label for="age">Age:</label>
          <input name="age" id="age" type="text" placeholder="2 years" />
        </div>
        <div class="weight">
          <label for="weight">Weight:</label>
          <input name="weight" id="weight" type="text" placeholder="5kg" />
        </div>
        <div class="image">
          <label for="image">Image:</label>
          <input
            name="image"
            id="image"
            type="text"
            placeholder="./image/dog.jpeg"
          />
        </div>
        <button class="btn" type="submit">Create Pet</button>
      </div>
    </form>
  </section>
`;

export function createPage(ctx) {
  console.log("create");
  ctx.render(templateCreate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name").trim();
    const breed = formData.get("breed").trim();
    const image = formData.get("image").trim();
    const weight = formData.get("weight").trim();
    const age = formData.get("age").trim();
    if (
      name !== "" &&
      breed !== "" &&
      image !== "" &&
      age !== "" &&
      weight !== ""
    ) {
      const option = {
        name,
        breed,
        age,
        weight,
        image,
      };

      console.log(option);
      const user = JSON.parse(localStorage.getItem("user"));
      createPets(option, user.accessToken);
      e.target.reset();
      ctx.page.redirect("/");
    } else {
      alert("All fields are required");
    }
  }
}
