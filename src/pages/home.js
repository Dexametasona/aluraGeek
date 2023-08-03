import { getProducts } from "../service/serviceProduct";

const cardTemplate = (maskUrl, bgUrl, name, price, discount, id) => {
  const templateCard = `
  <div class="stock__category__card__photo">
    <img class="stock__category__card__photo__mask" src=${maskUrl} alt="funko_profile">
    <img class="stock__category__card__photo__bg" src=${bgUrl} alt="funko-background">
  </div>
  <p>${name}</p>
  <h4>$${(price * (1 - discount)).toFixed(2)}</h4>
  <div class="stock__category__card__actions">
    <button class="stock__category__card__actions__fav" title="favoritos">
      <img src="assets/star-icon.png" alt="favorite-icon" >
    </button>
    <button class="stock__category__card__actions__detail" data-id=${id}>
      <span>Mas detalles</span>
      <img src="assets/detail-icon.png" alt="detail-icon">
    </button>
  </div>
  <div class="stock__category__card__discount">
    <span>-${Math.floor(discount * 100)}%</span>
  </div>`;
  return templateCard;
};

function createCard(maskUrl, bgUrl, name, price, discount, contenedor, id) {
  const card = document.createElement("div");
  card.classList.add("stock__category__card");
  card.innerHTML = cardTemplate(maskUrl, bgUrl, name, price, discount, id);
  if (contenedor != null) {
    contenedor.appendChild(card);
  }

  const btn = document.querySelector(".stock__category__card__actions__detail");
}

export const renderStockProducts = async () => {
  if (window.location.pathname.includes("/index.html")) {
    await getProducts().then((res) => {
      const contenedorA = document.querySelector("[data-categoryA]");
      const contenedorB = document.querySelector("[data-categoryB");
      let lista = res;
      shuffle(lista);
      let counterA = 0;
      let counterB = 0;
      lista.forEach(
        ({ data: { name, photo, price, discount, category }, id }, i) => {
          if (category == "politic" && counterA < 6) {
            createCard(
              photo.mask,
              photo.bg,
              name,
              price,
              discount,
              contenedorA,
              id
            );
            counterA++;
          } else if (counterB < 6) {
            createCard(
              photo.mask,
              photo.bg,
              name,
              price,
              discount,
              contenedorB,
              id
            );
            counterB++;
          }
        }
      );
    });

    const btns = document.querySelectorAll(
      ".stock__category__card__actions__detail"
    );
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        let url = `productDetail.html?id=${encodeURIComponent(btn.dataset.id)}`;
        window.location.href = url;
      });
    });
  }
};
function shuffle(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
}

const cardSearchTemplate = (maskUrl, name) => {
  const template = `
    <img src=${maskUrl} alt="card-profile">
    <p>${name}</p>`;
    return template;
};
const fillCardSearch = (maskUrl, name, contenedor, id) => {
  const card=document.createElement('a');
  card.classList.add('menu__nav__search__results__card')
  card.href=`/aluraGeek/productDetail.html?id=${encodeURIComponent(id)}`
  card.innerHTML=cardSearchTemplate(maskUrl,name);
  if(contenedor!= null){
    contenedor.appendChild(card);
  } 
};

export async function renderSearch() {
  const input=document.querySelector('.menu__nav__search input');
  let data=[];
  await getProducts().then(res=>{
    data=res
    input.disabled=false;
  });

  const contenedor=document.querySelector('.menu__nav__search__results')
  input.addEventListener('input', ()=>{
    let newData=data.filter(producto=>(producto.data.name.toLowerCase()).includes(input.value.toLowerCase()))
    newData=newData.slice(0,5)
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }
    newData.forEach(({data:{name, photo:{mask}},id})=>{
      fillCardSearch(mask,name, contenedor, id)
    })
  })
  
  input.addEventListener('focus', ()=>{
    contenedor.style.maxHeight='255px'
  })
  input.addEventListener('blur', ()=>{
    contenedor.style.maxHeight='0px'
  })
}
