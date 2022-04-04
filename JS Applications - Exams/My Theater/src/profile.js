import { html, until } from "./lib.js";
import { getMyData } from "./requests.js";

const templateProfile = (myData, user) => html`<section id="profilePage">
  <div class="userInfo">
    <div class="avatar">
      <img src="./images/profilePic.png" />
    </div>
    <h2>${user.email}</h2>
  </div>
  <div class="board">
    <!--If there are event-->
    ${myData.length > 0
      ? myData.map((x) => templateMy(x))
      : html` <div class="no-events">
          <p>This user has no events yet!</p>
        </div>`}
    <!--If there are no event-->
  </div>
</section>`;
const templateMy = (item) => html`<div class="eventBoard">
  <div class="event-info">
    <img src=${item.imageUrl} />
    <h2>${item.title}</h2>
    <h6>${item.date}</h6>
    <a href="details/${item._id}" class="details-button">Details</a>
  </div>
</div>`;
export async function profilePage(ctx) {
  console.log("pofile");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const myData = await getMyData(user._id);
  console.log(myData);
  ctx.render(templateProfile(myData, user));
}
