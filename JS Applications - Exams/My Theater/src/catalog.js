import { html } from "./lib.js";
import { getAll } from "./requests.js";
//Home page
const templateCatalog = (items) => html`
  <section class="welcomePage">
    <div id="welcomeMessage">
      <h1>My Theater</h1>
      <p>
        Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI
        Cooperating Members, theatre professionals, theatre organizations,
        theatre universities and theatre lovers all over the world on the 27th
        of March. This day is a celebration for those who can see the value and
        importance of the art form “theatre”, and acts as a wake-up-call for
        governments, politicians and institutions which have not yet recognised
        its value to the people and to the individual and have not yet realised
        its potential for economic growth.
      </p>
    </div>
    <div id="events">
      <h1>Future Events</h1>
      <div class="theaters-container">
        ${items.length > 0
          ? items.map((x) => templateCart(x))
          : html`<h4 class="no-event">No Events Yet...</h4>`}

        <!--No Theaters-->
      </div>
    </div>
  </section>
`;
const templateCart = (item) => html`<div class="eventsInfo">
  <div class="home-image">
    <img src=${item.imageUrl} />
  </div>
  <div class="info">
    <h4 class="title">${item.title}</h4>
    <h6 class="date">${item.date}</h6>
    <h6 class="author">${item.author}</h6>
    <div class="info-buttons">
      <a class="btn-details" href="/details/${item._id}">Details</a>
    </div>
  </div>
</div>`;
export function catalogPage(ctx) {
  console.log("catalog");
  async function load() {
    const user = JSON.parse(localStorage.getItem("user"));
    let items = await getAll();

    ctx.render(templateCatalog(items));
  }
  load();
}
