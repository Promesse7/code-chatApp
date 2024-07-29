import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Make sure these imports are correct
import { storage } from "../lib/firebase.js";


const Upload = async (file) => {
  const date = new Date();
  const storageRef = ref(storage, 'images/${date + file.name} ');

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {  

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        
      }, 
      (error) => {
        reject("something is wrong! " + error.code);
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
