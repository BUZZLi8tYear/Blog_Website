import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore ,doc,collection , getDocs} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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


const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}
const blogSection = document.querySelector('.blogs-section');


const querySnapshot = await getDocs(collection(db, "blogs"));
querySnapshot.docs.forEach((blog) => {
    if(blog.id != decodeURI(location.pathname.split("/").pop())){
        createBlog(blog);
    }
    
});

// db.collection("blogs").get().then((blogs) => {
//     blogs.forEach(blog => {
//         if(blog.id != decodeURI(location.pathname.split("/").pop())){
//             createBlog(blog);
//         }
//     })
// })