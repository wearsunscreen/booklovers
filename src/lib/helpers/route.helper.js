import { goto } from "$app/navigation";
import { setUser } from "$lib/firebase/database.client";
import { sendJWTToken } from "$lib/firebase/auth.client";   
import { send } from "vite";


export async function afterLogin(url, userId) {
    const route = url.searchParams.get("redirect") || "/";
    await setUser(userId);
    // await sendJWTToken();
    // await goto(route);
}