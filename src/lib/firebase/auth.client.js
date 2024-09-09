import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

export async function loginWithGoogle() {
    const auth = getAuth();
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    return userCredential.user;
}

export async function logout() {
    const auth = getAuth();
    await auth.signOut();
}

export async function registerWithEmailAndPassword(email, password) {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}