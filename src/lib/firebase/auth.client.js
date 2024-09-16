import { getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail} from "firebase/auth";

export async function loginWithGoogle() {
    const userCredential = await signInWithPopup(getAuth(), new GoogleAuthProvider());
    return userCredential.user;
}

export async function logout() {
    const auth = getAuth();
    await auth.signOut();
}

export async function registerWithEmailAndPassword(email, password) {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    return userCredential.user;
}

export async function loginWithEmailAndPassword(email, password) {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    return userCredential.user;
}

export async function mailResetPasswordEmail(email) {
    await sendPasswordResetEmail(getAuth(), email);
}

export async function sendJWTToken() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        return;
    }

    const token = await user.getIdToken(true);
    const response = await fetch('/token', {
        method: 'POST',
        body: JSON.stringify({ token, email: user.email }),
    });
}