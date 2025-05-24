import { servicesArray } from "/data.js";

renderServiceCards();

function renderServiceCards() {
  document.getElementById("services-section").innerHTML = createHTML();
}

function createHTML() {
  const servicesHTML = servicesArray
    .map((service) => {
      const { name, summary, description, price, icon } = service;

      return `
      <div class="card-container">
        ${icon}
        <h2 class="card-title">${name}</h2>
        <p class="card-summary">
          ${summary}
        </p>
        <ul class="card-description-list">
          <li class="card-list-item">
            <i class="fa-solid fa-circle-check check"></i>
            <span class="bold-text">${description[0]}</span>
          </li>
          <li class="card-list-item">
            <i class="fa-solid fa-circle-check check"></i>
            <span class="bold-text">${description[1]}</span>
          </li>
          <li class="card-list-item">
            <i class="fa-solid fa-circle-check check"></i>
            <span class="bold-text">${description[2]}</span>
          </li>
        </ul>
        <div class="card-btm-container">
          <p class="bold-text price">$${price}</p>
          <button type="button" class="add-btn bold-text">Add to cart</button>
        </div>
      </div>
    `;
    })
    .join("");

  return servicesHTML;
}
