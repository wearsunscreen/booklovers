import { getBook } from "$lib/firebase/database.server";
import validateBook from "$lib/validators/book.validator.js";
import { error } from "@sveltejs/kit";
import { get } from "svelte/store";

export async function load({ params, locals }) {
    const book = await getBook(params.id);

    if (!book) {
        throw error(404, "Book not found");
    }

    console.log("book.user_id", book.user_id);
    console.log("locals.user_id", locals.user.id);
    if (!book.user_id || locals.user.id !== book.user_id ) {
        throw error(403, "Access denied");  
    }

    return { book };
}

export const actions = {
    default: async ({ request, locals, params }) => {
        const book = get(params.id);

        if (!book || locals.user.id !== book.user_id ) {
            throw error(403, "Access denied");  
        }

        const formData = await request.formData();
        const data = await validateBook(formData, true);

}