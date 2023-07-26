/*-------------------------------- slider animation */
let currentSlide = 0;
let timerBox;
function slide(direction) {
  clearInterval(timerBox);
  const slide = document.querySelector(".title__slider__slide");
  if(slide){
    currentSlide = direction ? (currentSlide + 1) % 4 : (currentSlide - 1 + 4) % 4;
    slide.style.transform = `translateX(-${currentSlide*25}%)`;
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
function menuSlide(){
  const navBar=document.querySelector('.menu__nav__list')
  if(window.innerWidth<800){
    navBar.classList.toggle('menuIn')
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
    msj: "El campo nombre es requerido, debe solo tener letras y ser menor a 50 carácteres."
  },
  email: {
    reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    msj: "El campo email es requerido, debe tener un @ y un punto, no se permiten espacios."
  },
  password:{
    reg:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&+!\-_]).{8,}$/,
    msj:"La contraseña debe tener al menos 1 mayúscula, 1 caracter especial, 1 número y mínimo 8 carácteres."
  }
};

function labelIn(id,form) {
  const label = document.querySelector(`[data-${form}-label-${id}]`);
  label.classList.add("labelIn");
}
function labelOut(id, form) {
  const label = document.querySelector(`[data-${form}-label-${id}]`);
  const input = document.querySelector(`[data-${form}-input-${id}]`);

  if (input.value == "" || input.value == null) {
    label.classList.toggle("labelIn");
  }
  validator(id, input,form);
  btnStatus(form);
}

function validator(id, input,form) {
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
  const Form= document.querySelector(`[data-form-${form}]`);
  const btn= document.querySelector(`[data-${form}-btn]`)
  const inputs= Form.querySelectorAll('input');
  let status=false;
  inputs.forEach(input=>{
    let inputReg=input.id.toLowerCase().replace(form,'');
    if(!regex[inputReg].reg.test(input.value)){
      return status = true;
    }   
  })
  btn.disabled=status;
}
