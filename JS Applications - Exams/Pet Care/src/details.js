import { html } from "./lib.js";
import {
  addDonate,
  deletePets,
  getData,
  getIfUserDonate,
  getPetDonateNumber,
} from "./requests.js";

const templateDetails = (
  item,
  check,
  onDelete,
  reg,
  num,
  donateBtn,
  don
) => html`<section id="detailsPage">
  <div class="details">
    <div class="animalPic">
      <img src=${item.image} />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${item.name}</h1>
        <h3>Breed: ${item.breed}</h3>
        <h4>Age: ${item.age}</h4>
        <h4>Weight: ${item.weight}</h4>
        <h4 class="donation" id="total">Donation: ${num}$</h4>
      </div>
      <!-- if there is no registered user, do not display div-->
      ${check
        ? html` <div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
            ${reg
              ? html` <a href="/edit/${item._id}" class="edit">Edit</a>
                  <a href="#" @click=${onDelete} class="remove">Delete</a>`
              : ""}
            ${don
              ? html`<a href="#" @click=${donateBtn} id="hid" class="donate"
                  >Donate</a
                >`
              : ""}
            <!--(Bonus Part) Only for no creator and user-->
          </div>`
        : ""}
    </div>
  </div>
</section> `;

export async function detailsPage(ctx) {
  const item = await getData(ctx.params.id);
  const user = JSON.parse(localStorage.getItem("user"));
  let num = await getPetDonateNumber(item._id);
  let ifDonate = await getIfUserDonate(item._id, user._id);
  console.log(ifDonate);
  let check = false;
  let reg = false;
  let don = false;
  if (user === null) {
  } else if (user) {
    check = true;
    if (user._id === item._ownerId) {
      reg = true;
    } else if (ifDonate === 0) {
      don = true;
    }
  }

  console.log(reg);
  ctx.render(
    templateDetails(item, check, onDelete, reg, num * 100, donateBtn, don)
  );
  //ctx.render(templateDetails(item, check, onDelete));
  console.log("details", ctx.params.id);
  //console.log(user._id);
  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this furniture!");
    if (choice) {
      await deletePets(ctx.params.id, user.accessToken);
      ctx.page.redirect("/");
    }
  }
  async function donateBtn(e) {
    e.preventDefault();
    let petId = ctx.params.id;
    const user = JSON.parse(localStorage.getItem("user"));
    let num = await getPetDonateNumber(item._id);
    let ifDonate = await getIfUserDonate(petId, user._id);
    console.log(ifDonate);
    if (ifDonate === 0) {
      num += 100;
      document.getElementById("total").textContent = `Donation: ${num}$`;
      const data = { petId };
      addDonate(data, user.accessToken);
      document.getElementById("hid").disabled = true;
      don = false;
      ctx.render(
        templateDetails(item, check, onDelete, reg, num, donateBtn, don)
      );
    }
  }
}
