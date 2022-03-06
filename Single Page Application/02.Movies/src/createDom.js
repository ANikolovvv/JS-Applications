

export function domMovies(element) {
    const div=document.createElement('div');
    div.className="card mb-4";
    div.id=element._ownerId
    div.innerHTML=`
    <img class="card-img-top" src=${element.img}
         alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${element.title}</h4>
    </div>
    <div class="card-footer">
        <a href=#/details/${element._id}>
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>`
    return div;
}
export function detailMovieDom(info){
    const div=document.createElement('div');
    div.className='row bg-light text-dark';
    div.innerHTML=`<h1>Movie title: ${info.title}</h1>

    <div class="col-md-8">
        <img class="img-thumbnail" src=${info.img}
             alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${info.description}</p>
        <a class="btn btn-danger" href="#">Delete</a>
        <a class="btn btn-warning" href="#">Edit</a>
        <a class="btn btn-primary" href="#">Like</a>
        <span class="enrolled-span">Liked 1</span>
    </div>`
    return div
}
export function data(movie){
    const form =document.createElement('form');
    //class="text-center border border-light p-5" action="#" method=""
    form.className="text-center border border-light p-5";
    form.action='#';
    form.method='';
    form.innerHTML=` <h1>Edit Movie</h1>
    <div class="form-group">
      <label for="title">Movie Title</label>
      <input
        id="title"
        type="text"
        class="form-control"
        placeholder="Movie Title"
        value=${movie.title}
        name="title"
      />
    </div>
    <div class="form-group">
      <label for="description">Movie Description</label>
      <textarea 
        class="form-control"
        placeholder="Movie Description..."
        name="description"
      > ${movie.description}</textarea>
    </div>
    <div class="form-group">
      <label for="imageUrl">Image url</label>
      <input
        id="imageUrl"
        type="text"
        class="form-control"
        placeholder="Image Url"
        value=${movie.img}
        name="imageUrl"
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>`
    return form
}