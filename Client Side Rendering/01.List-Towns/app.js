import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById("root");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let towns = document.getElementById("towns").value;
  let spl = towns.split(", ").map((t) => t.trim());
  const result = list(spl);
  render(result, root);
  document.querySelector("form").reset();
});
const list = (towns) => html`
  <ul>
    ${towns.map((r) => html`<li>${r}</li>`)}
  </ul>
`;
