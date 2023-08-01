import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, deleteUser } from "firebase/auth";
import { auth } from "./firebaseInit";

export function registUser({ email, password }) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function signIn({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function setProfile(profile){
  return updateProfile(auth.currentUser, profile)
}

export function logOut(){
  return signOut(auth)
}

export function deleteUserService(){
  const user=auth.currentUser;
  return deleteUser(user);
}

export function getUser(){
  const user=auth.currentUser;
  return user; 
}