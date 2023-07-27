import { getProducts } from "../service/serviceProduct";

const cardTemplate = (maskUrl, bgUrl, name, price) => {
  const templateCard = `
  <div class="product__box__card__photo">
    <img class="product__box__card__photo__mask" src=${maskUrl} alt="funko_profile">
    <img class="product__box__card__photo__bg" src=${bgUrl} alt="funko-background">
  </div>
  <p>${name}</p>
  <h4>$${price}</h4>
  <div class="product__box__card__actions">
    <button class="product__box__card__actions__fav" title="favoritos">
      <img src="assets/star-icon.png" alt="favorite-icon" >
    </button>
    <button class="product__box__card__actions__detail">
      <span>Mas detalles</span>
      <img src="assets/detail-icon.png" alt="detail-icon">
    </button>
  </div>`;
  return templateCard;
};

function createCard(maskUrl, bgUrl, name, price) {
  const contenedor = document.querySelector(".product__box");
  const card = document.createElement("div");
  card.classList.add("product__box__card");
  card.innerHTML = cardTemplate(maskUrl, bgUrl, name, price);
  if(contenedor!=null){
    contenedor.appendChild(card);
  }

  const btn = document.querySelector(".product__box__card__actions__detail");
}

export const renderProducts =()=>{
  if(window.location.pathname=="/products.html"){
    getProducts().then(res => {
      res.forEach(({ name, photo, price }) => {
        createCard(photo.mask, photo.bg, name, price);
      });
    });
  }
}
