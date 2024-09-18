import { PUBLIC_STORAGE_BUCKET } from '$env/static/public';
import { storage } from '$lib/firebase/firebase.server.js';
import { tmpdir } from 'os';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/** 
 * @param {File} file 
 * @param {string} destination
 */
export async function saveFileToBucket (file, destination ) {
    const tmpFilePath = await saveFileToDisk(file);
    const uploadResult = await storage.bucket(file.name).upload(tmpFilePath, {destination, public: true});

    return uploadResult[0].publicUrl();
}

/** @param {File} file */
async function saveFileToDisk (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tmpFilePath = path.join(tmpdir(), uuidv4());

    fs.writeFileSync(tmpFilePath, buffer, 'base64');

    return tmpFilePath;
}