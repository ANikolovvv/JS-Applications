import { page } from "./commentsPage.js";
import { conteiner, create, more } from "./domCreate.js";
import { all, makePost, myComments } from "./request.js";

const form = document.querySelector("main div > form");
const btnPost = document.getElementById("post");
const btnCancel = document.getElementById("cancelBtn");

const topic = document.getElementById("topic");
const comments = document.getElementById("myC");

const users = document.getElementById("users");
users.style.display = "none";
export const obj = {
  topic: document.getElementById("topic"),
  comment: document.getElementById("myC"),
  home: document.getElementById("home"),
  users: document.getElementById("users"),
};

btnCancel.addEventListener("click", (e) => {
  e.preventDefault();

  form.reset();
});

btnPost.addEventListener("click", createPost);

async function createPost(e) {
  e.preventDefault();
  const formdata = new FormData(form);
  const title = formdata.get("topicName");
  const username = formdata.get("username");
  const post = formdata.get("postText");
  const info = { title, username, post };

  if (title.trim() !== "" && username.trim() !== "" && post.trim() !== "") {
    makePost(info);
    myComments(info);
    const fragment = document.createDocumentFragment();

    const allPosts = Object.values(await all());
    allPosts.forEach((x) => {
      fragment.appendChild(create(x));
    });
    topic.appendChild(fragment);
    page(comments);
    console.log(allPosts);
  } else {
    alert(" You have empty field");
  }

  form.reset();
}
