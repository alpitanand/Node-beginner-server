//cd  D:\web-development\Node.js\node-web-server
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/Public'));

app.use((req, res, next) =>{
   var now = new Date().toString();
    console.log(`${now}`);
    console.log(req.method);
    console.log(res.method);
    console.log(req.url);
    fs.appendFile('server.log', now +'\n', (err)=>{
        console.log('Cant be appended');
    })
    next();
});


hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamit', (text)=>{
    return text.toUpperCase();
});

app.use((req, res, next)=>{
    res.render('maintain.hbs')
})

app.get('/', (req, res)=>{
  //res.send('<h1>Hello Express</h1>');
    res.render('page.hbs',{
        name: 'Alpit',
        likes : [
            'Biking',
            'Cities',
        ]
    })
})

app.get('/about',(req, res)=>{
    res.render('about.hbs',{
        pageTitle : 'About page',
       
    });
})

app.get('/bad',(req, res)=>{
    res.send('<h1>Unable to full fill the request<h1>');
})

app.listen(3000);