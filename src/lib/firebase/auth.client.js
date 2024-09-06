import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function loginWithGoogle() {
    const auth = getAuth();
    const userCredential = away signInWithPopup(auth, new GoogleAuthProvider());
    return userCredential.user;
}