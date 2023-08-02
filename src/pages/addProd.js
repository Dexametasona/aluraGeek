import Swal from "sweetalert2";
import {
  createProduct,
  getOnlyProduct,
  updateProduct,
} from "../service/serviceProduct";
import { getUser } from "../service/serviceUser";
import { formAnimationANdValidation } from "../animations/addProdAnimations";

export const newProd = async () => {
  if (location.pathname.includes("/addProducts.html")) {
    formAnimationANdValidation();
    const title = document.querySelector("[data-title]");
    title.innerHTML = hasParam() ? "Actualizar Producto" : "Registrar producto";

    const btn = document.querySelector(".addProd__form__btn>button");
    const form = document.querySelector(".addProd__form");
    let dataRef = new FormData(form);

    if (hasParam()) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      await getOnlyProduct(id).then(
        ({ name, category, price, stock, discount, description, photo }) => {
          dataRef.set("name", name);
          dataRef.set("category", category);
          dataRef.set("price", price);
          dataRef.set("stock", stock);
          dataRef.set("description", description);
          dataRef.set("discount", discount);
          dataRef.set("photoPerfil", photo.mask);
          dataRef.set("photoBg", photo.bg);

          for (const [key, value] of dataRef.entries()) {
            const input = form.elements[key];
            if (input) {
              input.value = value;
            }
          }
        }
      );
    }

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      dataRef = new FormData(form);
      const data = {
        name: dataRef.get("name"),
        category: dataRef.get("category"),
        price: +dataRef.get("price"),
        stock: +dataRef.get("stock"),
        discount: +dataRef.get("discount"),
        description: dataRef.get("description"),
        photo: {
          mask: dataRef.get("photoPerfil"),
          bg: dataRef.get("photoBg"),
        },
      };
      const messageBox = document.querySelector(".addProd__message");

      if(getUser()){
        if (!hasParam()) {
          createProduct(data).then(() => {
            messageBox.innerHTML = "Producto registrado exitosamente.";
            setTimeout(() => {
              messageBox.innerHTML = "";
            }, 3000);
          });
        } 
        else {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get("id");
          updateProduct(id, data).then(()=>{
            messageBox.innerHTML = "Producto actualizado exitosamente. Redirigiendo en 3s...";
            setTimeout(() => {
              messageBox.innerHTML = "";
              window.location.href='/products.html'
            }, 3000);
          })
        }
      }else{
        Swal.fire({
          icon:'error',
          title:'Error',
          text:'Debes iniciar sesión para modificar la bases de datos.'
        })
      }

      /* limpia los campos del form */
      fieldClean(dataRef,form);
    });
  }
};

function fieldClean(dataRef,form) {
  dataRef.forEach((value, key) => {
    dataRef.set(key, "");
  });
  for (const [key, value] of dataRef.entries()) {
    const input = form.elements[key];
    if (input) {
      input.value = value;
    }
  }
}
function hasParam() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("id");
}
