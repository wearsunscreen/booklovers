import { setDoc, collection, doc } from "firebase/firestore";
import { db } from "./firebase-client";
import { afterLogin } from '$lib/helpers/route.helper';

export async function setUser(userId) {
    const users = collection(db, "users");
    await setDoc(doc(users, userId.uid), {
        user_id: userId
    })
}