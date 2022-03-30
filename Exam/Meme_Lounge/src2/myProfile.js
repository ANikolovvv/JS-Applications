import { html } from "./lib.js"
import { getNumberMeme } from "./requests/crud.js";
const templateProfile=(user,number)=>html`<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src=${user.gender==='male'?"/images/male.png":"/images/female.png"}>
    <div class="user-content">
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>My memes count: ${number.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    <!-- Display : All created memes by this user (If any) --> 
    ${number.length>0 ? number.map(x=>templateMeme(x)):html`<p class="no-memes">No memes in database.</p>`}
 

    <!-- Display : If user doesn't have own memes  --> 
</div>
</section>`
const templateMeme=(meme)=>html`  <div class="user-meme">
<p class="user-meme-title">${meme.title}</p>
<img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
<a class="button" href="/details/${meme._id}">Details</a>
</div>`
export async function showProfile(ctx) {
    console.log('prifile');
    const user = JSON.parse(localStorage.getItem("user"));
    const number=await getNumberMeme(user._id)
    console.log(user);
    console.log(number);

    ctx.render(templateProfile(user,number));
}