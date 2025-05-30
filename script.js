import { servicesArray } from "/data.js";

let selectedServiceIds = [];

// TODO: add functionality to complete order btn
// TODO: style modal
// TODO: modal functionality and input validations
// TODO: modal pay btn functionality closes modal and sends to thank you screen
// TODO: REFACTOR

document.addEventListener("click", (e) => {
  if (e.target.dataset.selectBtn) {
    toggleServiceSelection(e.target.dataset.selectBtn);
  }

  if (e.target.dataset.removeBtn) {
    toggleServiceSelection(e.target.dataset.removeBtn);
  }

  if (e.target.id === "checkout-btn") {
    handleCheckoutBtn();
  }

  if (e.target.id === "close-modal") {
    closeModal();
  }

  if (e.target.id === "pay-btn") {
    e.preventDefault();

    handlePayBtn();
  }
});

function toggleServiceSelection(serviceID) {
  const orderSection = document.getElementById("order-section");
  const selectRemoveBtn = document.querySelector(
    `[data-select-btn="${serviceID}"]`
  );

  if (selectRemoveBtn.textContent === "Select") {
    selectRemoveBtn.innerText = "Remove";
  } else {
    selectRemoveBtn.innerText = "Select";
  }

  if (orderSection.classList.contains("hidden")) {
    orderSection.classList.remove("hidden");
  }

  if (!selectedServiceIds.includes(serviceID)) {
    selectedServiceIds.push(serviceID);
    renderSelectedService();
    updateTotalPrice(serviceID);
  } else {
    selectedServiceIds = selectedServiceIds.filter((id) => id !== serviceID);
    renderSelectedService();
    updateTotalPrice(serviceID);
  }

  if (selectedServiceIds.length === 0) {
    orderSection.classList.add("hidden");
  }
}

function updateTotalPrice() {
  const totalAmount = document.getElementById("total-amount");

  const total = selectedServiceIds.reduce((total, id) => {
    const selectedServiceObj = servicesArray.find(
      (service) => service.uuid === id
    );

    if (selectedServiceObj) {
      return (total += selectedServiceObj.price);
    }
  }, 0);

  totalAmount.textContent = "$" + total;
}

function closeModal() {
  const modal = document.getElementById("checkout-modal");

  modal.classList.add("hidden");
}

function handleCheckoutBtn() {
  const modal = document.getElementById("checkout-modal");

  modal.classList.remove("hidden");
}

function handlePayBtn() {
  closeModal();
  renderThankYou();
}

function renderThankYou() {
  document.querySelector("#order-section").innerHTML = getThankYouHtml(
    document.querySelector("#name").value
  );
}

function getThankYouHtml(name) {
  return `
    <p class="thank-you">Thanks, ${name}! Check your email for more information.</p>
  `;
}

function getSelectedHTML() {
  const selectedServicesHTML = selectedServiceIds
    .map((id) => {
      const service = servicesArray.find((service) => service.uuid === id);

      const { name, price, uuid } = service;

      return `
      <p data-service="${uuid}">
        <span class="text-left bold-text">
          ${name}
          <button type="button" class="remove-btn" data-remove-btn="${uuid}">remove</button>
        </span>
        <span class="cost-right bold-text">$${price}</span>
      </p>
      `;
    })
    .join("");

  return selectedServicesHTML;
}

function renderSelectedService() {
  document.getElementById("services").innerHTML = getSelectedHTML();
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
