    // Import the functions you need from the SDKs you need
    import { initializeApp } from 'firebase/app';
    import { getFirestore} from 'firebase/firestore'
    import { getAuth } from 'firebase/auth'

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBPlRygWcOgkC5JfgR9cpn25k5o3_J5Ho0",
      authDomain: "alura-bd.firebaseapp.com",
      projectId: "alura-bd",
      storageBucket: "alura-bd.appspot.com",
      messagingSenderId: "973598815846",
      appId: "1:973598815846:web:d11aad187816b7f457dfa7"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    //referencia  a la base de datos
    export const db=getFirestore(app);
    export const auth=getAuth(app);