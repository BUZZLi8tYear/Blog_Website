// 
// Import db from another file
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore ,doc , setDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; // Import Firestore module
// import { doc, setDoc } from "firebase/firestore"; 

// Add a new document in collection "cities"

// Add a new document with a generated id.

const firebaseConfig = {
    apiKey: "AIzaSyBP3K9rWQsjkXbCOfIp4P2KMgdpvYCcS4s",
    authDomain: "blogproj-5a25e.firebaseapp.com",
    projectId: "blogproj-5a25e",
    storageBucket: "blogproj-5a25e.appspot.com",
    messagingSenderId: "579813091793",
    appId: "1:579813091793:web:fe65246629fe53c0f798f0"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', async () => {
    if(articleFeild.value.length && blogTitleField.value.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // for published at info

        //access firstore with db variable;
        
        // console.log(db);
        // const docRef = await addDoc(collection(db, "blogs"), {
        //     title: blogTitleField.value,
        //     article: articleFeild.value,
        //     bannerImage: bannerPath,
        //     publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        //   });
        // getFirestore.collection("blogs").add({
        //     title: blogTitleField.value,
        //     article: articleFeild.value,
        //     bannerImage: bannerPath,
        //     publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        // })
        await setDoc(doc(db, "blogs",docName), {
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        // const docRef = await addDoc(collection(db, "cities"), {
        //     title: blogTitleField.value,
        //     article: articleFeild.value,
        //     bannerImage: bannerPath,
        //     publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        // })
        .then(() => {
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        })
    }
})