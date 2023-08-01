/* ----------------form animation and validation*/
const regex = {
  displayName: {
    reg: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,20}$/,
    msj: "El campo nombre es requerido, debe solo tener letras y ser menor a 20 carácteres.",
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

export function validator(id, form) {
  const msjbox = document.querySelector(`[data-${form}-msj]`);
  const input = document.querySelector(`[data-${form}-input-${id}]`);
  if (!regex[id].reg.test(input.value)) {
    msjbox.innerHTML = regex[id].msj;
    regex[id].status = true;
    input.style.backgroundColor="rgba(134, 43, 13, 0.7)";
  } else {
    msjbox.innerHTML = "";
    regex[id].status = false;
    input.style.backgroundColor="white";
  }
  btnStatus(form)
}
export function btnStatus(form) {
  const Form = document.querySelector(`[data-form-${form}]`);
  const btn = Form.querySelector(`[data-${form}-btn]`);
  const inputs = Form.querySelectorAll("input");
  let status = false;

  inputs.forEach((input) => {
    let field = input.id.replace(form, "");
    if (!regex[field].reg.test(input.value)) {
      status = true;
    }
  });
  btn.disabled = status;
}
export function labelIn(id, form) {
  const label = document.querySelector(`[data-${form}-label-${id}]`);
  // const input = document.querySelector(`[data-${form}-input-${id}]`);
  label.classList.add("labelIn");
}
export function labelOut(id, form) {
  const label = document.querySelector(`[data-${form}-label-${id}]`);
  const input = document.querySelector(`[data-${form}-input-${id}]`);

  if (input.value == "" || input.value == null) {
    label.classList.remove("labelIn");
  }
  validator(id, form);
  btnStatus(form);
}