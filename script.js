import { servicesArray } from "/data.js";

let selectedServices = [];
let total = 0;

document.addEventListener("click", (e) => {
  const serviceID = e.target.dataset.selectBtn;

  if (serviceID) {
    handleSelectBtn(serviceID);
  }
});

function handleSelectBtn(serviceID) {
  const orderSection = document.getElementById("order-section");

  if (orderSection.classList.contains("hidden")) {
    orderSection.classList.remove("hidden");
  }

  if (!selectedServices.includes(serviceID)) {
    selectedServices.push(serviceID);
    renderSelectedService(serviceID);
    updateTotalPrice(serviceID);
  }
}

function updateTotalPrice(serviceID) {
  const totalAmount = document.getElementById("total-amount");

  const selectedServiceObj = servicesArray.find(
    (service) => service.uuid === serviceID
  );

  total += selectedServiceObj.price;

  totalAmount.textContent = "$" + total;
}

function getSelectedHTML(serviceID) {
  const selectedServiceObj = servicesArray.find(
    (service) => service.uuid === serviceID
  );

  const { name, price, uuid } = selectedServiceObj;

  return `
    <p data-service="${uuid}">
      <span class="text-left bold-text">
        ${name}
        <button type="button" class="remove-btn">remove</button>
      </span>
      <span class="cost-right bold-text">$${price}</span>
    </p>
    `;
}

function renderSelectedService(serviceID) {
  document.getElementById("services").innerHTML += getSelectedHTML(serviceID);
}

function getServicesHTML() {
  const servicesHTML = servicesArray
    .map((service) => {
      const { name, summary, description, price, uuid, icon } = service;

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
          <button type="button" class="add-btn bold-text btn" data-select-btn="${uuid}">Select</button>
        </div>
      </div>
    `;
    })
    .join("");

  return servicesHTML;
}

function renderServices() {
  document.getElementById("services-section").innerHTML = getServicesHTML();
}

renderServices();
