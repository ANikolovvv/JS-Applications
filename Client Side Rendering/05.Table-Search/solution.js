import { html, render } from "./node_modules/lit-html/lit-html.js";

const url = "http://localhost:3030/jsonstore/advanced/table";
const root = document.querySelector("tbody");
const input = document.getElementById("searchField");
const btn = document.getElementById("searchBtn");

async function getAll() {
  const res = await fetch(url);
  const data = Object.values(await res.json());
  //console.log(data);
  let clases = data.map((x) => ({
    firstName: x.firstName,
    lastName: x.lastName,
    email: x.email,
    course: x.course,
    clas: "",
  }));

  render(template(clases), root);
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    selects(clases);
  });
}
getAll();
//class=${t.match ? 'active':""
const template = (data) => html`
  ${data.map(
    (n) => html`<tr class=${n.clas}>
      <td>${n.firstName} ${n.lastName}</td>
      <td>${n.email}</td>
      <td>${n.course}</td>
    </tr>`
  )}
`;

function selects(data) {
  let match = input.value.trim().toLocaleLowerCase();

  for (const i of data) {
    let name = i.firstName.toLocaleLowerCase().includes(match);
    let lNmae = i.lastName.toLocaleLowerCase().includes(match);
    let email = i.email.toLocaleLowerCase().includes(match);
    let course = i.course.toLocaleLowerCase().includes(match);
    if (name || lNmae || email || course) {
      i.clas = "select";
    }
  }
  input.value = "";

  render(template(data), root);
  data.map((x) => (x.clas = ""));
  
}
