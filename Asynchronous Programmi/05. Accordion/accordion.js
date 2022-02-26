function solution() {
    //TODO .....
    let mainId = document.querySelector("section");
    Promise.all([sections(),info()]);
  
  
    async function sections() {
      const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
      let res = await fetch(url);
      try {
        if (res.status !== 200) {
          throw new Error();
        }
      } catch (error) {}
      let data = await res.json();
  
      return data;
    }
  
    async function info() {
      let urlInfo = `http://localhost:3030/jsonstore/advanced/articles/details/`;
  
      let r = await fetch(urlInfo);
      console.log(r);
      try {
        if (r.status !== 200) {
          throw new Error();
        }
  
        let d = await r.json();
        //let html = create(d._id, d.title);
  
        for (const key in d) {
          let html = create(d[key]._id, d[key].title, d[key].content);
          mainId.appendChild(html);
        }
        return d
      } catch (error) {}
      
    }
  
    function create(id, title, content) {
      let div = document.createElement("div");
      div.setAttribute("class", "accordion");
  
      let inerDiv = document.createElement("div");
      inerDiv.setAttribute("class", "head");
  
      let span = document.createElement("span");
      span.textContent = title;
  
      let btn = document.createElement("button");
      btn.setAttribute("class", "button");
      btn.id = id;
      btn.textContent = "More";
  
      inerDiv.appendChild(span);
      inerDiv.appendChild(btn);
  
      let divExtra = document.createElement("div");
      divExtra.setAttribute("class", "button");
  
      let p = document.createElement("p");
      p.textContent = content;
      p.style.display = "none";
      divExtra.appendChild(p);
  
      btn.addEventListener("click", btnMore);
      function btnMore(e) {
        if (btn.textContent === "More") {
          btn.textContent = "Less";
          p.style.display = "block";
        } else {
          btn.textContent = "More";
          p.style.display = "none";
        }
      }
  
      div.appendChild(inerDiv);
      div.appendChild(divExtra);
  
      return div;
    }
  }
  
  document.addEventListener("DOMContentLoaded", solution);