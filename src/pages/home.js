import { getProducts } from "../service/serviceProduct";

const cardTemplate = (maskUrl, bgUrl, name, price, discount) => {
  const templateCard = `
  <div class="stock__category__card__photo">
    <img class="stock__category__card__photo__mask" src=${maskUrl} alt="funko_profile">
    <img class="stock__category__card__photo__bg" src=${bgUrl} alt="funko-background">
  </div>
  <p>${name}</p>
  <h4>$${price}</h4>
  <div class="stock__category__card__actions">
    <button class="stock__category__card__actions__fav" title="favoritos">
      <img src="assets/star-icon.png" alt="favorite-icon" >
    </button>
    <button class="stock__category__card__actions__detail">
      <span>Mas detalles</span>
      <img src="assets/detail-icon.png" alt="detail-icon">
    </button>
  </div>
  <div class="stock__category__card__discount">
    <span>-${discount * 100}%</span>
  </div>`;
  return templateCard;
};

function createCard(maskUrl, bgUrl, name, price, discount, contenedor) {
  const card = document.createElement("div");
  card.classList.add("stock__category__card");
  card.innerHTML = cardTemplate(maskUrl, bgUrl, name, price, discount);
  if (contenedor != null) {
    contenedor.appendChild(card);
  }

  const btn = document.querySelector(".stock__category__card__actions__detail");
}

export const renderStockProducts =()=>{
  if(window.location.pathname=="/index.html"){
    getProducts().then(res => {
      const contenedorA = document.querySelector("[data-categoryA]");
      const contenedorB = document.querySelector("[data-categoryB");
      res.forEach(({ name, photo, price, discount, category }, i) => {
        if (category == "politic" && i < 13) {
          createCard(photo.mask, photo.bg, name, price, discount, contenedorA);
        } else if (category == "history" && i < 13) {
          createCard(photo.mask, photo.bg, name, price, discount, contenedorB);
        }
      });
    });
  }
}
