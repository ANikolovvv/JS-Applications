export function create(person, topic) {
  const div = document.createElement("div");
  div.className = "topic-name-wrapper";

  div.innerHTML = `
    <div class="topic-name">
        <a href="#" class="normal">
            <h2>${person.title}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
                <div class="nick-name">
                    <p>Username: <span>${person.username}</span></p>
                </div>
            </div>


        </div>
    </div>
</div>`;
  return div;
}
export function conteiner(info) {
  //<div  class="theme-content">
  const div = document.createElement("div");
  div.className = "header";
  div.innerHTML = `
     <img src="./static/profile.png" alt="avatar">
     <p><span>${info.title}</span> posted on <time>2020-10-10 12:08:28</time></p>

     <p class="post-content">${info.post}</p>`;
  return div;
}
export function more(info) {
  const div = document.createElement("div");
  div.id = `user-comment`;
  div.innerHTML = `
     <div class="topic-name-wrapper">
         <div class="topic-name">
             <p><strong>${info.title}</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
             <div class="post-content">
                 <p>${info.post}</p>
             </div>
         </div>
     </div>`;
  return div;
}
