import Swal from 'sweetalert2';
import { deleteUserService, getUser, logOut, setProfile } from '../service/serviceUser';

const regex = {
  displayName: {
    reg: /^$|^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-_]{1,20}$/,
    msj: "El campo nombre es menor a 20 carácteres o nulo, y no permite caracteres especiales.",
  },
  photoURL: {
    reg: /^$|^[^\n]{1,500}$/,
    msj: "El campo foto perfil solo permite máximo 500 carácteres.",
  },
  email: {
    reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    msj: "El campo email es requerido, debe tener un @ y un punto, no se permiten espacios.",
  },
  password: {
    reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&+!\-_]).{8,}$/,
    msj: "La contraseña debe tener al menos 1 mayúscula, 1 caracter especial, 1 número y mínimo 8 carácteres.",
  }
};

export const sesionActions=()=>{
  if(window.location.pathname=='/account.html'){
    const btnLogout=document.querySelector('[data-logout]');
    const btnDeleteuser=document.querySelector('[data-delete]');
    
    btnLogout.addEventListener('click', ()=>{
      Swal.fire({
        icon:'question',
        title:'Estas seguro que quieres cerrar sesión?',
        showConfirmButton:true,
        showCancelButton:true
      }).then(res=>{
        if(res.isConfirmed){
          logOut().then(()=>{
            console.log("Sesión cerrada con éxito")
            window.location.href='/login.html';
          })
        }
      })
    })
    
    btnDeleteuser.addEventListener('click',()=>{
      Swal.fire({
        icon:'question',
        title:'Esta seguro de eliminar su cuenta?',
        text:'Esta acción es irreversible y sus datos se perderan.',
        showConfirmButton:true,
        showCancelButton:true
      }).then(res=>{
        if(res.isConfirmed){
          deleteUserService().then(()=>{
            window.location.href='/login.html';
          });
        }
      })
    })
  }
}

export const setProfileDataAccount=()=>{
  if(window.location.pathname=='/account.html'){
    // const formProfile=document.querySelector('.acounr')
    const inputsProfile=document.querySelectorAll('.account__box input');
    const photoProfile=document.querySelector('[data-photoProfile]')
    inputsProfile.forEach(input=>{
      input.value=getUser()[input.id];
    })
    photoProfile.src=getUser().photoURL || 'https://i.ibb.co/wy4NCMr/foto-Perfil.jpg';
  }
}

export const updateDataAccount=()=>{
  if(window.location.pathname=='/account.html'){
    const inputs=document.querySelectorAll('.account__box__FormProfile input')
    const btn=document.querySelector('[data-btnProfile]')
    const message = document.querySelector(".account__box__FormProfile__message p");
    inputs.forEach(input=>{
      input.addEventListener('input', ()=>{
        let isValid=true;
        isValid=regex[input.name].reg.test(input.value);

        if(!isValid) input.classList.add('invalid')
        else input.classList.remove("invalid");

        const allInputsValid=Array.from(inputs).every(inputA=>regex[inputA.name].reg.test(inputA.value))
        
        btn.disabled=!allInputsValid;
        message.innerHTML = isValid ? "" : regex[input.name].msj;
      })
    })

    btn.addEventListener('click',(event)=>{
      event.preventDefault();
      const data={}
      inputs.forEach(input=>{
        data[input.name]=input.value;
      })
      Swal.fire({
        icon:'question',
        title:'Estas seguro de guardar los cambios?',
        showConfirmButton:true,
        showCancelButton:true
      }).then(res=>{
        if(res.isConfirmed){
          setProfile(data).then(()=>{
            location.reload();
          })
        }        
      })
    })
  }
}