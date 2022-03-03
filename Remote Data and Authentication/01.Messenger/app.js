function attachEvents() {
   const url='http://localhost:3030/jsonstore/messenger';
   const author=document.querySelector('input[name="author"]');
   const content=document.querySelector('input[name="content"]');
   const messages=document.getElementById('messages');

   const btnSubmit=document.querySelector('#submit');
   const btnRefresh=document.querySelector('#refresh');

   btnSubmit.addEventListener('click',(e)=>{
       e.preventDefault();
       
       messenge(author.value,content.value);
       author.value='';
       content.value='';

   })
   btnRefresh.addEventListener('click',allMessages);
 
   async function allMessages() {
    messages.value='';
       const res=await fetch(url);
       try {
           if(!res.ok){
               throw new Error()
           }
       } catch (err) {
           alert(err.message)
       }
       const data=Object.values(await res.json());

    const arr=data.map(x=>`${x.author}: ${x.content}`)
       messages.value=arr.join('\n');
   }
   async function messenge (person,content) {
       const res=await fetch(url,{
           method:'post',
           headers:{'Content-type':'application/json'},
           body:JSON.stringify({author:person,content})
       })
       try {
           if(!res.ok){
             throw new Error()
           }
       

       } catch (error) {
           alert(error.messenge);
       }
       const data=await res.json();
       return data

   }

}

attachEvents();