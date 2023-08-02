import { labelOut, labelIn, validator, showPass } from "../animations/loginAnimation";
import { signIn, registUser, setProfile} from "../service/serviceUser";

export const setUpFormValidationsAndAnimations = () => {
  if (window.location.pathname.includes("/login.html")) {
    const Inputs = document.querySelectorAll(
      "[data-form-Login] input, [data-form-Regist] input"
    );

    Inputs.forEach((input) => {
      const formName = input.closest("form").getAttribute("name");
      const id = input.id.replace(formName, "");

      input.addEventListener("input", () => validator(id, formName));
      input.addEventListener("focus", () => labelIn(id, formName));
      input.addEventListener("blur", () => labelOut(id, formName));
    });
  }
};

export const accessAuth = () => {
  if (location.pathname.includes("/login.html")) {
    const btnLogin = document.querySelector("[data-Login-btn]");
    const btnRegist = document.querySelector("[data-Regist-btn]");

    btnLogin.addEventListener("click", (event) => {
      const messageBox = document.querySelector("[data-Login-msj]");
      event.preventDefault();
      const data = dataInput("Login");

      signIn(data)
        .then((userCredential) => {
          const user = userCredential.user;
          window.location.href='./account.html'
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/wrong-password":
              messageBox.innerHTML = "Contraseña incorrecta.";
              break;

            case "auth/user-not-found":
              messageBox.innerHTML = "Correo no encontrado.";
              break;

            default:
              messageBox.innerHTML =
                "Error atípico, envíanos un correo con la caputra por favor.";
              break;
          }
          cleanMessage(messageBox);
        });
    });

    btnRegist.addEventListener("click", (event) => {
      const messageBox = document.querySelector("[data-Regist-msj]");

      event.preventDefault();
      const data = dataInput("Regist");

      registUser(data)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          cleanFieldInputs("Regist");
          messageBox.innerHTML="Nuevo usuario registrado con éxito."
          messageBox.style.color='green';
          const {displayName}=data
          const profile={displayName};
          setProfile(profile).then(()=>{
            window.location.href='./account.html'
          })
          
          
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              messageBox.innerHTML="Registro Fallido, correo en uso.";
              break;

            default:
              messageBox.innerHTML="Error atípico, envíanos un correo con la caputra por favor";
              break;
          }
          cleanMessage(messageBox);
        });
    });
  }
};

function dataInput(formName) {
  const form = document.querySelector(`[data-form-${formName}]`);
  const inputs = form.querySelectorAll("input");
  let data = {};
  inputs.forEach((input) => {
    const fieldName=input.id.replace(formName,"");
    data[fieldName] = input.value;
  });
  return data;
}
function cleanFieldInputs(formName) {
  const form = document.querySelector(`[data-form-${formName}]`);
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    input.value = "";
  });
}
function cleanMessage(messageBox){
  setTimeout(()=>{
    messageBox.innerHTML="";
    messageBox.style.color="#862B0D";
  }, 3000);
}

export const eyeBtnAction=()=>{
  const btns=document.querySelectorAll('.access__Regist__form__input__eye');

  btns.forEach(btn=>{
    btn.addEventListener('click', (event)=>{
      event.preventDefault();
      const container=btn.parentNode;
      const input=container.querySelector('input');
      showPass(btn,input);
    })
  })
}