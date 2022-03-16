import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const root = document.querySelector("#towns");
let town = towns.map((x) => ({ name: x, match: false }));

const templete = (towns) => html`
  <ul>
    ${towns.map(
      (t) => html`<li class=${t.match ? "active" : ""}>${t.name}</li>`
    )}
  </ul>
`;

render(templete(town), root);
const input = document.getElementById("searchText");
const btn = document.querySelector("button");
const result = document.querySelector("#result");
btn.addEventListener("click", (e) => {
  //e.preventDefault();

  let match = input.value.trim().toLocaleLowerCase();
  let c = 0;
  for (const i of town) {
    if (match && i.name.toLocaleLowerCase().includes(match)) {
      i.match = match && i.name.toLocaleLowerCase().includes(match);
      c++;
    }
  }

  result.textContent = c;
  input.value = "";
  render(templete(town), root);
  town = towns.map((x) => ({ name: x, match: false }));
});
