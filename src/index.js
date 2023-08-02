import { renderProducts } from "./pages/product";
import { renderStockProducts } from "./pages/home";
import { newProd } from "./pages/addProd";
import { renderOnlyProduct } from "./pages/productDetail";
import { accessAuth, eyeBtnAction, setUpFormValidationsAndAnimations } from "./pages/access";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./service/firebaseInit";
import { sesionActions, setProfileDataAccount, updateDataAccount} from "./pages/account";
console.log(location.pathname);
if(location.pathname=='/aluraGeek'){
  location.href='/aluraGeek/index.html';
}
renderProducts();
renderStockProducts();
renderOnlyProduct();
newProd();
setUpFormValidationsAndAnimations();
accessAuth();
sesionActions();
updateDataAccount();
eyeBtnAction();

onAuthStateChanged(auth, (user) => {
  const btnLogin = document.querySelector(".menu__login__btn");
  const btnAccount = document.querySelector(".menu__login__account");
  
  btnAccount.style.display = user? "flex":"none";
  btnLogin.style.display =user? "none":"flex";
  btnAccount.innerHTML = user? user.displayName:"";

  if(user){
    setProfileDataAccount();
  }
});
