export function dashDom(dish) {
  const div = document.createElement("div");
  div.id = dish._id;
  div.className = "card overflow-hidden current-card details";
  div.style = "width: 20rem; height: 18rem;";
  div.innerHTML = `
    <div class="card-body">
        <p class="card-text">${dish.title}</p>
    </div>
    <img class="card-image" src=${dish.img} alt="Card image cap">
    <a class="btn" href="">Details</a>`;
  return div;
}
export function detailsDom(info, user) {
  const div = document.createElement("div");
  div.className = "container home some";
  div.innerHTML = `
    <img class="det-img" src=${info.img} />
    <div class="desc">
        <h2 class="display-5">${info.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${info.description}</p>
    </div>`;

  const users = JSON.parse(localStorage.getItem("user"));
  if (users) {
    if (user._id === info._ownerId) {
      const btn = document.createElement("div");
      btn.innerHTML = `<div id=${info._id} class="text-center">
           <a  class="btn detb" href="">Delete</a>
       </div>`;
      div.appendChild(btn);
    }
  }

  return div;
}
