import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore ,doc,collection , getDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
let blogId = decodeURI(location.pathname.split("/").pop());

// let docRef = db.collection("blogs").doc(blogId);
// let docRef = await getDocs(collection(db , "blogs" ));
// if(docRef.doc(blogId).exists){
//     setupBlog(doc.data());
// } else{
//     location.replace("/");
// }

const checkAndSetupBlog = async (blogId) => {
    try {
        const blogDocRef = doc(collection(db, "blogs"), blogId);
        const blogDocSnapshot = await getDoc(blogDocRef);

        if (blogDocSnapshot.exists()) {
            const blogData = blogDocSnapshot.data();
            setupBlog(blogData);
        } else {
            // Document with the specified ID does not exist, redirect to home page
            location.replace("/");
        }
    } catch (error) {
        console.error("Error retrieving document:", error);
    }
};

checkAndSetupBlog(blogId);

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    
    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}