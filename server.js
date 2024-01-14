// const express = require('express');
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import {dirname} from "path";
import fileupload from 'express-fileupload';

// const path  = require('path');
// const fileupload = require('express-fileupload');

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

let initial_path = path.join( __dirname , "public");
// console.log("initialPath:"+initial_path);
// console.log(__dirname);

app.use(express.static(initial_path));
app.use(fileupload());

app.get("/",(req ,res)=>{
    res.sendFile(path.join(initial_path ,"home.html"))
});

app.get("/editor", (req, res)=>{
    res.sendFile(path.join(initial_path , "editor.html"));
})

app.post('/upload' , (req ,res)=>{
    let file = req.files.image ;
    let date = new Date();

    let imagename = date.getDate() + date.getTime() + file.name ;

    let path = 'public/uploads/' + imagename ;

    file.mv(path , (err ,result)=>{
        if(err){
            throw err ;
        }
        else{
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000" , ()=>{
    console.log("listening...");
});