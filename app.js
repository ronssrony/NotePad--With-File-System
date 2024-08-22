const express = require("express") ; 
const app = express() ; 
const path = require('path') ; 
const fs = require('fs') ; 

app.use(express.json()); 
app.use(express.urlencoded({extended: true})) ; 
app.use(express.static(path.join(__dirname , 'public')))  
app.set('view engine' , 'ejs') ; 

app.get('/', function(req,res){
    fs.readdir('./files', function(err,files){
        res.render('index', {Files: files})
    })
})
app.post('/create',function(req, res){
       fs.writeFile(`./files/${(req.body.title).split(' ').join('')}.txt`,req.body.detail,function(err){
               if(err){console.error(err)} ;
               res.redirect("/") ;
       })
})
app.get('/files/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`, function(err,data){
        res.render('display', {detail: data , title: req.params.filename}); 
    })
})
app.get('/delete/:filename',function(req,res){
    fs.unlink(`./files/${req.params.filename}` , function(err){
        res.redirect('/') 
    })
})
app.get('/edit/:filename',function(req,res){
    res.render('edit',{filename: req.params.filename})
})
app.post('/edit',function(req,res){
    console.log(req.body)
fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}` , function(err){
     res.redirect('/') ;
}  )
})
app.listen(3000 , function(){
    console.log('server is running on port 3000')
}) ;