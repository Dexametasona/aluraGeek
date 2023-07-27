 import { createProduct } from '../service/serviceProduct';

export const newProd = () => {
  if (window.location.pathname == "/addProducts.html") {
    const form = document.querySelector(".addProd__form");
    const btn = document.querySelector(".addProd__form__btn>button");

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const dataRef = new FormData(form);
      const data={
        name:dataRef.get('name'),
        category:dataRef.get('category'),
        price:+dataRef.get('price'),
        stock:+dataRef.get('stock'),
        discount:+dataRef.get('discount'),
        description:dataRef.get('description'),
        photo:{
          mask:dataRef.get('photoPerfil'),
          bg:dataRef.get('photoBg')
        }
      }
      
      createProduct(data).then(()=>{
        const messageBox=document.querySelector('.addProd__message');
        messageBox.innerHTML="Producto registrado exitosamente."
        setTimeout(()=>{
          messageBox.innerHTML=""
        }, 3000)
      })
    });
  }
};
