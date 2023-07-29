import { getProducts } from "../service/serviceProduct";

const cardTemplate = (maskUrl, bgUrl, name, price, discount, id) => {
  const templateCard = `
  <div class="product__box__card__photo">
    <img class="product__box__card__photo__mask" src=${maskUrl} alt="funko_profile">
    <img class="product__box__card__photo__bg" src=${bgUrl} alt="funko-background">
  </div>
  <p>${name}</p>
  <h4>$${(price*(1-discount)).toFixed(2)}</h4>
  <div class="product__box__card__actions">
    <button class="product__box__card__actions__fav" title="favoritos">
      <img src="assets/star-icon.png" alt="favorite-icon" >
    </button>
    <button class="product__box__card__actions__detail" data-id=${id}>
      <span>Mas detalles</span>
      <img src="assets/detail-icon.png" alt="detail-icon">
    </button>
  </div>`;
  return templateCard;
};

function createCard(maskUrl, bgUrl, name, price, discount, id) {
  const contenedor = document.querySelector(".product__box");
  const card = document.createElement("div");
  card.classList.add("product__box__card");
  card.innerHTML = cardTemplate(maskUrl, bgUrl, name, price, discount, id);
  if (contenedor != null) {
    contenedor.appendChild(card);
  }
}

export const renderProducts = async () => {
  if (window.location.pathname == "/products.html") {
    await getProducts().then((res) => {
      res.forEach(({ data: { name, photo, price,discount }, id }) => {
        createCard(photo.mask, photo.bg, name, price, discount, id);
      });
    });

    const btns=document.querySelectorAll('.product__box__card__actions__detail')
    btns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        let url=`productDetail.html?id=${encodeURIComponent(btn.dataset.id)}`
        window.location.href=url;
      })
    })
  }
};
