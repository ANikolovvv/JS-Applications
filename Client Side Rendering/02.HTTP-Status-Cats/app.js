import { cats } from "./catSeeder.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

let root = document.getElementById("allCats");
const c = cats;

const template = (cat) => html`
  <li>
    <img
      src="./images/${cat.imageLocation}.jpg"
      width="250"
      height="250"
      alt="Card image cap"
    />
    <div class="info">
      <button class="showBtn">Show status code</button>
      <div class="status" style="display: none" id="${cat.id}">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
      </div>
    </div>
  </li>
`;
let final = (c) => html`
  <ul>
    ${c.map((x) => template(x))}
  </ul>
`;
render(final(c), root);
root.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    let element = e.target.parentNode.querySelector(".status");

    if (element.style.display === "none") {
      element.style.display = "block";
      e.target.textContent = "Hide status code";
    } else {
      element.style.display = "none";
      e.target.textContent = "Show status code";
    }
  }
});
