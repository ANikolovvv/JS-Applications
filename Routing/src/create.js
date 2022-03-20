import { html } from "./lib.js";
import { createMovie } from "./requests.js";

const templateCreate = (onSubmit) => html` <div class="row space-top">
    <div class="col-md-12">
      <h1>Create New Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input
            class=${"form-control"}
            id="new-make"
            type="text"
            name="make"
          />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input
            class="form-control "
            id="new-model"
            type="text"
            name="model"
          />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input
            class="form-control "
            id="new-year"
            type="number"
            name="year"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description"
            >Description</label
          >
          <input
            class="form-control"
            id="new-description"
            type="text"
            name="description"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input
            class="form-control"
            id="new-price"
            type="number"
            name="price"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input class="form-control" id="new-image" type="text" name="img" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material"
            >Material (optional)</label
          >
          <input
            class="form-control"
            id="new-material"
            type="text"
            name="material"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </div>
    </div>
  </form>`;

export function createPage(ctx) {
  console.log("create");
  ctx.render(templateCreate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = [...formData.entries()].reduce(
      (a, [k, v]) => Object.assign(a, { [k]: v }),
      {}
    );
    const parent = e.target;
    const inputs = Array.from(parent.querySelectorAll("input"));

    if (data.make.length > 3) {
      inputs[0].className = "form-control is-valid";
    } else {
      inputs[0].className = "form-control is-invalid";
    }
    if (data.model.length > 3) {
      inputs[1].className = "form-control is-valid";
    } else {
      inputs[1].className = "form-control is-invalid";
    }
    if (Number(data.year) >= 1950 && Number(data.year) <= 2050) {
      inputs[2].className = "form-control is-valid";
    } else {
      inputs[2].className = "form-control is-invalid";
    }
    if (data.description.length > 10) {
      inputs[3].className = "form-control is-valid";
    } else {
      inputs[3].className = "form-control is-invalid";
    }
    if (Number(data.price) >= 0) {
      inputs[4].className = "form-control is-valid";
    } else {
      inputs[4].className = "form-control is-invalid";
    }
    if (data.img !== "") {
      inputs[5].className = "form-control is-valid";
    } else {
      inputs[5].className = "form-control is-invalid";
    }
    const some = inputs.map((x) => x.className === "form-control is-invalid");
    if (some.includes(true) === false) {
      data.make = inputs[0].value;
      data.model = inputs[1].value;
      data.year = inputs[2].value;
      data.description = inputs[3].value;
      data.price = inputs[4].value;
      data.img = inputs[5].value;
      data.material = inputs[6].value;

      const user = JSON.parse(localStorage.getItem("user"));
      createMovie(data, user.accessToken);

      e.target.reset();
      ctx.page.redirect("/");
    }
  }
}
