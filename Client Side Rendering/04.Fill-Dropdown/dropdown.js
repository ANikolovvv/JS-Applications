import { html, render } from "./node_modules/lit-html/lit-html.js";

const url = "http://localhost:3030/jsonstore/advanced/dropdown";
const root = document.querySelector("#menu");

async function server() {
  const res = await fetch(url);
  const data = await res.json();
  const key = Object.values(data);
  console.log(key);
  render(template(key), root);
}
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("work");
  let text = document.querySelector("#itemText");
  postdata(text.value);
  server();
  text.value = "";
});
const template = (key) => html`
  ${key.map((t) => html`<option value="${t._id}">${t.text}</option>`)}
`;

async function postdata(text) {
  const res = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return res.json();
}

server();
