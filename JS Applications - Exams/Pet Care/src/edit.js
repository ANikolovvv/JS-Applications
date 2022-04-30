import { html } from "./lib.js";
import { getData,updatePets } from "./requests.js";

const templateEdit = (onSubmit, data) => html` <section id="editPage">
<form @submit=${onSubmit} class="editForm">
    <img src=${data.image}>
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" value=${data.name}>
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" value=${data.breed}>
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" value=${data.age}>
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" value=${data.weight}>
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" value=${data.image}>
        </div>
        <button class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section> `;

export async function editPage(ctx) {
  console.log("edit", ctx.params.id);

  const dataBook = await getData(ctx.params.id);
  console.log(dataBook);
  ctx.render(templateEdit(onSubmit, dataBook));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name=formData.get('name').trim();
    const breed=formData.get("breed").trim();
    const image=formData.get("image").trim();
    const weight=formData.get('weight').trim();
    const age=formData.get('age').trim();
    const user = JSON.parse(localStorage.getItem("user"));
    if (name !==''&& breed !=='' &&image!=='' && age!=='' && weight!=='') {
      const option = {
        name,
        breed,
        age,
        weight,
        image
      }
      
      console.log(option);
      const res = await updatePets(option, ctx.params.id, user.accessToken);
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
