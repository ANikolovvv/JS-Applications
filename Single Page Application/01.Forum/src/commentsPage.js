import { conteiner, create, more } from "./domCreate.js";
import { obj } from "./app.js";
import { all, allComen, idea, myComments } from "./request.js";

export async function page(comments) {
  const h = obj.home;
  h.style.display = "none";
  const fragment = document.createDocumentFragment();

  const allPosts = Object.values(await all());
  async function call() {
    const callAll = Object.values(await allComen());
    callAll.forEach((x) => {
      fragment.appendChild(create(x));
    });
  }
  const allCom = Object.values(await allComen());
  allPosts.forEach((x) => {
    fragment.appendChild(create(x));
  });
  obj.topic.appendChild(fragment);

  //console.log(allPosts);
  obj.topic.style.display = "block";
  obj.topic.addEventListener("click", (e) => {
    e.preventDefault();
    const parent = e.target.parentNode;
    if (parent.tagName === "A") {
      const v = localStorage.getItem("post");
      const t = parent.querySelector("h2");
      console.log(allCom);
      const arr = [];
      let count = 0;
      allCom.forEach((x) => {
        if (x.title === t.textContent) {
          count++;
          arr.push(x);
          const fragment = document.createDocumentFragment();
          if (count > 1) {
            fragment.appendChild(more(x));
          } else {
            fragment.appendChild(conteiner(x));
          }

          comments.appendChild(fragment);
        }
      });
      obj.comment.style.display = "block";
      obj.topic.style.display = "none";
      obj.users.style.display = "block";
      const like = obj.users.querySelector("form");

      like.addEventListener("submit", (e) => {
        e.preventDefault();
        const formdata = new FormData(like);
        const post = formdata.get("postText");
        const username = formdata.get("username");
        //const user=localStorage.get('accessToken');
        const info = { title: t.textContent, username, post };
        myComments(info);
        call();
        h.style.display = "block";
        obj.comment.style.display = "noe";
        obj.topic.style.display = "none";
        obj.users.style.display = "none";
        like.reset();
      });

      console.log(arr);

      //console.log(find);
    }
  });
}
