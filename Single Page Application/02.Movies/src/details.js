import { links, sections } from "./app.js";
import { detailMovieDom } from "./createDom.js";
import { edtMovieData } from "./edit.js";
import {
  addLike,
  createMovie,
  deleteMovie,
  getIfUserLikedMovie,
  getMovieData,
  getMovieLikesNumber,
  removeLike,
} from "./requests.js";

const main = document.querySelector("main");
export async function details(id) {
  const sec = sections["movie-example"];
  main.replaceChildren(sec);
  const attach = sec.querySelector("div > div");

  const dataMovie = await getMovieData(id);
  const fragment = document.createDocumentFragment();

  fragment.appendChild(detailMovieDom(dataMovie));

  const btnAll = Array.from(fragment.querySelectorAll("a"));
  const btndel = btnAll[0];
  const btnEdit = btnAll[1];
  const btnLike = btnAll[2];
  const span = fragment.querySelector("span");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  //console.log(dataMovie._id);
  //console.log(id);
  if (user._id === dataMovie._ownerId) {
    btndel.style.display = "block";
    btnEdit.style.display = "block";
    btnEdit.addEventListener("click", (e) => {
      e.preventDefault();
      edtMovieData(dataMovie);
    });
    btndel.addEventListener("click", (e) => {
      e.preventDefault();
     // const user = JSON.parse(localStorage.getItem("user"));
      //const token = user.accessToken;
      deleteMovie(dataMovie._id, token);
      const s = sections["home"];
      links["home"](s);
    });
    //Liked 1
  } else {
    btndel.style.display = "none";
    btnEdit.style.display = "none";
  }
  //console.log(span.textContent);
  btnLike.addEventListener("click", likes);
  async function likes(e) {
    e.preventDefault();
    const we = await getIfUserLikedMovie(dataMovie._id, user._id);
    //console.log(we);
    if(user._id === dataMovie._ownerId){
      btnLike.style.disabled = true;
    }else{
      const number = await getMovieLikesNumber(dataMovie._id);
      //movieId, userId)
       const data={ movieId:dataMovie._id}
      
       const some=we.some(x=>x._ownerId===user._id);
       const l=we.find(x=>x._ownerId===user._id);
      
       if(some===false){
        addLike(data,token)
        btnLike.textContent = `Liked ${number + 1}`;
        span.textContent = '';
       }else{
             //console.log(l._id)
           removeLike(l._id,token);
          btnLike.textContent = `Liked ${number -1}`;
          span.textContent = '';
       }
      
      
    }
    
  }

  attach.replaceChildren(fragment);
}
