import { db } from './firebaseInit';
import { addDoc, collection, deleteDoc, doc, getDocs} from 'firebase/firestore'

//referencia a la coleccion
const productData = collection(db, 'aluraGeekData');

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

export async function createProduct(newProd) {
    const newDoc=await addDoc(productData, newProd)
    return newDoc;
}