/*-------------------------------- slider animation */
let currentSlide = 0;
let timerBox;
function slide(direction) {
  clearInterval(timerBox);
  const slide = document.querySelector(".title__slider__slide");
  if (slide) {
    currentSlide = direction
      ? (currentSlide + 1) % 4
      : (currentSlide - 1 + 4) % 4;
    slide.style.transform = `translateX(-${currentSlide * 25}%)`;
    startTime();
  }
}
function startTime() {
  timerBox = setInterval(() => {
    slide(true);
  }, 4000);
}
startTime();
/* -------------------------------------menuNavbar */
function menuSlide() {
  const navBar = document.querySelector(".menu__nav__list");
  if (window.innerWidth < 800) {
    navBar.classList.toggle("menuIn");
  }
}
/* -----------------------------------menu sticky animation */
window.addEventListener("scroll", () => {
  var scrollPosition = window.scrollY;
  const menu = document.querySelector(".menu");
  if (scrollPosition > 50) {
    menu.classList.add("stickyStyle");
  } else {
    menu.classList.remove("stickyStyle");
  }
});
/* ----------------form animation and validation*/
const regex = {
  nombre: {
    reg: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/,
    msj: "El campo nombre es requerido, debe solo tener letras y ser menor a 50 carácteres.",
  },
  email: {
    reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    msj: "El campo email es requerido, debe tener un @ y un punto, no se permiten espacios.",
  },
  password: {
    reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&+!\-_]).{8,}$/,
    msj: "La contraseña debe tener al menos 1 mayúscula, 1 caracter especial, 1 número y mínimo 8 carácteres.",
  },
};

function labelIn(id, form) {
  const label = document.querySelector(`[data-${form}-label-${id}]`);
  label.classList.add("labelIn");
}
function labelOut(id, form) {
  const label = document.querySelector(`[data-${form}-label-${id}]`);
  const input = document.querySelector(`[data-${form}-input-${id}]`);

  if (input.value == "" || input.value == null) {
    label.classList.toggle("labelIn");
  }
  validator(id, input, form);
  btnStatus(form);
}

function validator(id, input, form) {
  const msjbox = document.querySelector(`[data-${form}-msj]`);
  if (!regex[id].reg.test(input.value)) {
    msjbox.innerHTML = regex[id].msj;
    regex[id].status = true;
  } else {
    msjbox.innerHTML = "";
    regex[id].status = false;
  }
}
function btnStatus(form) {
  const Form = document.querySelector(`[data-form-${form}]`);
  const btn = document.querySelector(`[data-${form}-btn]`);
  const inputs = Form.querySelectorAll("input");
  let status = false;
  inputs.forEach((input) => {
    let inputReg = input.id.toLowerCase().replace(form, "");
    if (!regex[inputReg].reg.test(input.value)) {
      return (status = true);
    }
  });
  btn.disabled = status;
}
/* ------------------------------form addProduct validation */
const inputs = document.querySelectorAll(
  ".addProd__form__field>*:nth-child(2)"
);
const regexA = {
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
    reg: /^[\s\S]{1,500}$/,
    msj: "El campo descripción es requerido.",
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
inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    const field = event.target;
    const btn=document.querySelector('.addProd__form__btn>button')
    const message=document.querySelector('.addProd__message')
    let isValid = true;
    isValid = regexA[field.name].reg.test(field.value);
    if (!isValid) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
    const allFieldsValid = Array.from(inputs).every(inputA=>regexA[inputA.name].reg.test(inputA.value));
    btn.disabled = !allFieldsValid;
    message.innerHTML=isValid?'':regexA[field.name].msj;
  });
});
