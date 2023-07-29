import { db } from './firebaseInit';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from 'firebase/firestore'

//referencia a la coleccion
const productData = collection(db, 'aluraGeekData');

export async function getProducts(){
  const listProducts= await getDocs(productData);
  let listProductData=[];
  listProducts.forEach(product=>{
    listProductData.push({data:product.data(), id:product.id})
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

export async function getOnlyProduct(id){
  const productRef = doc(db, "aluraGeekData", id)
  const docSnap=await getDoc(productRef);

  if(docSnap.exists()){
    return docSnap.data();
  }
  else{
    console.log("Failed to find product");
  }
}

export async function updateProduct(id, data){
  const productRef = doc(db, "aluraGeekData", id)
  const docSnap=await updateDoc(productRef, data);
}