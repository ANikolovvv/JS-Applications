import { html } from "./lib.js"

export const errTemplate = (err) => html`
<section id="notifications">
    <div id="errorBox" class="notification">
        <span>${err}</span>
    </div>
</section>`
export const section=document.getElementById("errorBox")