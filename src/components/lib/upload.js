import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase.js";

<<<<<<< HEAD
const Upload = async (file, userId) => {
  // Generate a unique filename using userId and timestamp
  const timestamp = Date.now();
  const uniqueFilename = `${userId}_${timestamp}_${file.name}`;
  
  // Create a reference to 'avatars/userId/uniqueFilename'
  const storageRef = ref(storage, `avatars/${userId}/${uniqueFilename}`);
=======

const Upload = async (file) => {
  const date=new Date();
  const storageRef = ref(storage, 'images/${date + file.name} ');
>>>>>>> b212b942f4343a9297cd8cb3bf88d514b844212d

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        reject("Something went wrong! " + error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default Upload;