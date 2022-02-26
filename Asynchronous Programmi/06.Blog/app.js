function attachEvents() {
    const btnLoad=document.getElementById('btnLoadPosts');
    const posts=document.getElementById('posts');
    const btnView=document.getElementById('btnViewPost');

    btnLoad.addEventListener('click',solution);
    btnView.addEventListener('click',view);

    const urlPosts='http://localhost:3030/jsonstore/blog/posts';
    const url='http://localhost:3030/jsonstore/blog/comments';

    function create(post) {
        const option=document.createElement('option');
        option.value=post.id;
        option.textContent=post.title;
        posts.appendChild(option);
    }
    function createPost(post,comments){
        console.log(`vcvc${post}`)
        const h1=document.getElementById('post-title');
        const ulBody=document.getElementById('post-body');
        const ulComments=document.getElementById('post-comments');
        
        h1.textContent=post[2];
        ulBody.textContent=post[0];
        
        ulComments.replaceChildren();

        comments.map(c=>{
            const li=document.createElement('li');
            li.textContent=c.text;
            ulComments.appendChild(li)
        })
    }
    async function view(e) {
        const comments=Object.values(await loadComments());
        const id=document.getElementById('posts').value;
        const find=comments.find(x=>x.postId===id);
        const filter=comments.filter(x=>x.postId===id);
       //console.log(filter)
        //console.log(find)                                         
         if(find!==undefined){
             const postId=find.postId;
            const dates=Object.values(await getComments(postId));
           
            createPost(dates,filter);
            //console.log(dates);
         }
        

    }

    async function solution(e) {
        e.preventDefault();
        const date=Object.values(await loadPosts());
        
        //console.log(date);
        //console.log(comments);
        date.map(p=>create(p))

    }
    async function loadPosts() {
        const res=await fetch(urlPosts);
        
        try {
            if(res.status!==200){
                throw new Error();
            }
            const data=await res.json();
            return data
        } catch (error) {
            alert(error)
        }
    }
    async function loadComments() {
        const res=await fetch(url);
        
        try {
            if(res.status!==200){
                throw new Error();
            }
            const data=await res.json();
            return data
        } catch (error) {
            alert(error)
        }
    }
    async function getComments(id) {
        const res=await fetch(`http://localhost:3030/jsonstore/blog/posts/${id}`);
        
        try {
            if(res.status!==200){
                throw new Error();
            }
            const data=await res.json();
            return data
        } catch (error) {
            alert(`Dont have a id`)
        }
    }


}

attachEvents();