import { addMovieForm } from "./addMovieForm.js";
import { btnView, sections } from "./app.js";
import { domMovies } from "./createDom.js";
import { details } from "./details.js";
import { getMovies } from "./requests.js";

const main=document.querySelector('main');
export  async function showHome(section) {
     const appMovie=Array.from(sections['movie'].querySelectorAll('div'));
     section.appendChild(sections['btnAdd'])
     sections['btnAdd'].style.display='none';
     //console.log(appMovie[2])
    main.replaceChildren(section);
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user)
     if(user){
         const detailsBtn=sections['movie'];
         detailsBtn.addEventListener('click',(e)=>{
             e.preventDefault();
             if(e.target.className==='btn btn-info'){
                const parent=e.target.parentNode;
                const url=parent.href.split('/')
                const id=url[url.length-1].trim()
                 details(id);
             }
         });
         
       btnView.login.style.display='none'; 
       btnView.register.style.display='none'; 
       btnView.logout.style.display='block'; 
       btnView.welcome.style.display='block';
       btnView.welcome.textContent=user.email ;
       sections['btnAdd'].style.display='block';
       const btn=sections['btnAdd'].querySelector('a');
       btn.addEventListener('click',(e)=>{
           e.preventDefault();
           addMovieForm();
       })
     }else{
        btnView.login.style.display='block'; 
        btnView.register.style.display='block'; 
        btnView.logout.style.display='none'; 
        btnView.welcome.style.display='none'; 
     }
     
     const allMovies=Object.values(await getMovies());
     //console.log(allMovies)
     const fragment=document.createDocumentFragment();
     allMovies.forEach(x=>{
         let art=domMovies(x)
         //console.log(art)
         fragment.appendChild(art);
     })
     appMovie[2].replaceChildren(fragment);
     section.appendChild(sections['movie'])
     //console.log(fragment   

}