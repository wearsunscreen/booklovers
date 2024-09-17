import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies }) {
    try {
        cookies.delete('jwt', { path: '/' }); // Specify the path
    } catch (error) {
        console.error('Error while deleting cookie', error.message);
        return json({ message: error.message }, { status: 500 });
    }
    return json({ message: 'success' }, { status: 200 });
}