import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebse";

const upload = async (file, retries = 3) => {
    const date = new Date();
    const storageRef = ref(storage, `images/${date + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
        const attemptUpload = (retryCount) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    if (retryCount > 0) {
                        console.log(`Retrying upload... (${retries - retryCount + 1}/${retries})`);
                        setTimeout(() => attemptUpload(retryCount - 1), 1000); // Retry after 1 second
                    } else {
                        reject("Upload failed after multiple attempts: " + error);
                    }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        };
        attemptUpload(retries);
    });
}

export const uploadAudio = async (file, retries = 3) => {
    const date = new Date();
    const storageRef = ref(storage, `audio/${date + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
        const attemptUpload = (retryCount) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    if (retryCount > 0) {
                        console.log(`Retrying upload... (${retries - retryCount + 1}/${retries})`);
                        setTimeout(() => attemptUpload(retryCount - 1), 1000); // Retry after 1 second
                    } else {
                        reject("Upload failed after multiple attempts: " + error);
                    }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        };
        attemptUpload(retries);
    });
}
export default upload;
