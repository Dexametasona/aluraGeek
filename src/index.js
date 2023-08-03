import { renderProducts } from "./pages/product";
import { renderSearch, renderStockProducts } from "./pages/home";
import { newProd } from "./pages/addProd";
import { renderOnlyProduct } from "./pages/productDetail";
import { accessAuth, eyeBtnAction, setUpFormValidationsAndAnimations } from "./pages/access";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./service/firebaseInit";
import { sesionActions, setProfileDataAccount, updateDataAccount} from "./pages/account";
import { logOut } from "./service/serviceUser";

if(location.pathname=='/aluraGeek/'){
  console.log(location.pathname);
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
renderSearch();

onAuthStateChanged(auth, (user) => {
  const btnLogin = document.querySelector(".menu__login__btn");
  const btnAccount = document.querySelector(".menu__login__account");

  const userVerified=user? user.emailVerified:false
  
  btnAccount.style.display = userVerified? "flex":"none";
  btnLogin.style.display =userVerified? "none":"flex";
  btnAccount.innerHTML = userVerified? user.displayName:"";
  if(!userVerified && user){
    logOut();
  }
  if(userVerified) setProfileDataAccount();
});
