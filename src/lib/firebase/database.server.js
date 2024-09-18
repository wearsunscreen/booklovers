import { db } from '$lib/firebase/firebase.server';
// Bugbug: get error loading firestore, commented out the code below
// import { firestore } from 'firebase-admin';
import { saveFileToBucket } from './firestorage.server';
export async function addBook(book, userId) {
    // save to the firestore database without picture information
    const bookCollection = db.collection('books');
    const bookRef = await bookCollection.add({
        title: book.title,
        short_description: book.short_description,
        description: book.description,
        author: book.author,
        user_id: userId,
        created_at: 0, // Bugbug: getting error loading firestore -- firestore.FieldValue.serverTimestamp(), 
        likes: 0
    });

    // Bugbug:
    // getting errors when uploading the pictures
    // so I commented out the code below

    // const smallPictureUrl = await saveFileToBucket(book.small_picture,
    //     `${userId}/${bookRef.id}/small_picture`);
    // const mainPictureUrl = await saveFileToBucket(book.main_picture,
    //     `${userId}/${bookRef.id}/main_picture`);

    // await bookRef.update({
    //     main_picture: mainPictureUrl,
    //     small_picture: smallPictureUrl
    // })
    return bookRef.id;
}

export async function getBook(id) {
    const bookCollection = db.collection('books');
    const bookRef = await bookCollection.doc(id).get();
    if (bookRef.exists) {
        return { id: bookRef.id, ...bookRef.data() };
    }
    return null;
}
