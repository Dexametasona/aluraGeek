import {app} from './firebaseInit';
import { collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore'

const db=getFirestore(app);
const productData = collection(db, 'aluraGeekData');
const listProducts= await getDocs(productData)

export async function getProducts(){
  const listProducts= await getDocs(productData);
  let listProductData=[];
  listProducts.forEach(product=>{
    listProductData.push(product.data())
  })
  return listProductData;
}

export async function deleteProduct(id){
  const productRef= doc(db, "aluraGeekData", id)
  await deleteDoc(productRef);
}


