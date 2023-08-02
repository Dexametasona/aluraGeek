import Swal from "sweetalert2";
import { deleteProduct, getOnlyProduct } from "../service/serviceProduct";
import { getUser } from "../service/serviceUser";

export const renderOnlyProduct = async () => {
  if (window.location.pathname.includes("/productDetail.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    await getOnlyProduct(id).then(
      ({ name, description, photo, category, discount, price, stock }) => {
        createTemplate(
          photo.bg,
          discount,
          name,
          price,
          stock,
          category,
          description
        );
        zoomHoverInOut();
      }
    );
    const btnDel = document.querySelector(".detail__info__actions__delete");
    const btnUpd = document.querySelector(".detail__info__actions__update");
    deleteProd(btnDel, id);
    toUpdateProd(btnUpd, id);
  }
};

function fillTemplate(
  photoBg,
  discount,
  name,
  price,
  stock,
  category,
  description
) {
  const template = `    
  <div class="detail__profile">
    <img src=${photoBg}>
    <div class="detail__profile__discount">
      <span>${discount * 100}%</span>
    </div>
  </div>
  <div class="detail__info">
    <h3>${name}</h3>
    <p><span class="detail__info__price">S/${price}</span><span class="detail__info__priceActual">S/${(
    price *
    (1 - discount)
  ).toFixed(2)}</span></p>
    <p><img src="assets/check_circle_fill-icon.png" alt="check-icon"><span class="detail__info__stock">${stock}</span>Disponibles</p>
    <p>Categor&iacute;a: <span class="detail__info__category">${category}</span></p>
    <div class="detail__info__actions">
      <button class="detail__info__actions__delete">Eliminar</button>
      <button class="detail__info__actions__update">Actualizar</button>
    </div>
    <h4>Descripci&oacute;n:</h4>
    <p class="detail__info__description">${description}</p>
  </div>`;
  return template;
}

function createTemplate(
  photoBg,
  discount,
  name,
  price,
  stock,
  category,
  description
) {
  const box = document.createElement("div");
  box.classList.add("detail");
  box.innerHTML = fillTemplate(
    photoBg,
    discount,
    name,
    price,
    stock,
    category,
    description
  );
  const container = document.querySelector(".product");
  container.appendChild(box);
}

function zoomHoverInOut() {
  const productProfile = document.querySelector(".detail__profile");

  productProfile.addEventListener("mousemove", (event) => {
    const img = document.querySelector(".detail__profile>img");
    const boundigProd = productProfile.getBoundingClientRect();
    const mouseX = event.clientX - boundigProd.left;
    const mouseY = event.clientY - boundigProd.top;
    const moveX = (mouseX / boundigProd.width) * 100 - 50;
    const moveY = (mouseY / boundigProd.height) * 100 - 50;

    img.style.transform = `scale(1.2) translate(${moveX}px, ${moveY}px)`;
  });
  productProfile.addEventListener("mouseleave", () => {
    const img = document.querySelector(".detail__profile>img");
    img.style.transform = "scale(1)";
  });
}

function deleteProd(button, id) {
  button.addEventListener("click", () => {

    if(getUser()){
      Swal.fire({
        icon:'question',
        title:'Seguro desea eliminar este producto?',
        showCancelButton:true,
        showConfirmButton:true
      }).then(res=>{
        if(res.isConfirmed){
          deleteProduct(id).then(() => {
            window.location.href = "/index.html";
          });
        }
      })
    }else{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Debes iniciar sesión para modificar la base de datos.'
      })
    }
  });
}
function toUpdateProd(button, id) {
  button.addEventListener("click", () => {
    const url = `addProducts.html?id=${encodeURIComponent(id)}`;
    window.location.href = url;
  });
}
