/* ------------------------------form addProduct validation */
const inputs = document.querySelectorAll(
  ".addProd__form__field>*:nth-child(2)"
);
const regex = {
  name: {
    reg: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-_]{1,50}$/,
    msj: "El campo nombre es requerido, menor a 50 carácteres, y no permite caracteres especiales.",
  },
  category: {
    reg: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-_]{1,20}$/,
    msj: "El campo categoría es requerido, no permite caracteres especiales y  menor a 20 carácteres.",
  },
  price: {
    reg: /^(?=.*[1-9])\d{0,6}(?:[0-9]\.\d{1,2})?$/,
    msj: "El campo precio solo recibe hasta 2 decimales, y el valor máximo es 999999.",
  },
  discount: {
    reg: /^(0(\.\d{1,2})?)$/,
    msj: "El valor máximo del descuento es menor a 1 y máximo 2 decimales.",
  },
  stock: {
    reg: /^(?:\d){1,5}$/,
    msj: "El máximo numero de stock es 99999, y mínimo 0",
  },
  description: {
    reg: /^[\s\S]{1,800}$/,
    msj: "El campo descripción es requerido y máximo 500 caracteres.",
  },
  photoPerfil: {
    reg: /^[^\n]{1,500}$/,
    msj: "El campo foto perfil es requerido.",
  },
  photoBg: {
    reg: /^[^\n]{1,500}$/,
    msj: "El campo foto completa es requerido.",
  },
};
export const formAnimationANdValidation=()=>{
  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      const field = event.target;
      const btn = document.querySelector(".addProd__form__btn>button");
      const message = document.querySelector(".addProd__message");
      let isValid = true;
      isValid = regex[field.name].reg.test(field.value);
      if (!isValid) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
      const allFieldsValid = Array.from(inputs).every((inputA) =>
        regex[inputA.name].reg.test(inputA.value)
      );
      btn.disabled = !allFieldsValid;
      message.innerHTML = isValid ? "" : regex[field.name].msj;
    });
  });
}
