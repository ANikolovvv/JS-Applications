function attachEvents() {
  const person = document.getElementById("person");
  const phone = document.getElementById("phone");
  const createBtn = document.getElementById("btnCreate");
  const ul = document.getElementById("phonebook");

  const btnLoad = document.getElementById("btnLoad");
  const url = "http://localhost:3030/jsonstore/phonebook";
  ul.replaceChildren("");
  btnLoad.addEventListener("click", allLoad);
  createBtn.addEventListener("click", createPerson);

  async function createPerson(e) {
    const info = { person: person.value, phone: phone.value };
    person.value = "";
    phone.value = "";
    const res = await fetch(url, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(info),
    });
    allLoad();
  }

  async function allLoad(e) {
    ul.replaceChildren("");
    const res = await fetch(url);
    const date = Object.values(await res.json());
    date.forEach((x) => {
      const li = document.createElement("li");
      li.textContent = `${x.person}: ${x.phone}`;
      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.addEventListener("click", removeData);
      li.appendChild(btn);
      ul.appendChild(li);
    });
  }
  async function removeData(e) {
    const current = e.target.parentNode;
    const [name, phoneNum] = current.textContent.split(": ");

    const res = await fetch(url);
    const date = Object.values(await res.json());
    const find = date.find((x) => x.person === name.trim());
    removePerson(find._id,current);
  }
  async function removePerson(id,current) {
    const delUrl = `${url}/${id}`;
    const response = await fetch(delUrl, {
      method: "delete",
    });
    try {
        if(!response.ok){
            throw new Error()
        }
    } catch (error) {
        alert(error);
    }
    current.remove();
  }
}

attachEvents();
