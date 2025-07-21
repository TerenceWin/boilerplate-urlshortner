require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: false }));


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

let urlCounter = 1; 
let urlDataBase = []; 

app.post('/api/shorturl', (req, res) => {
  const originURL = req.body.url; // assuming form input name="url"
  const shortURL = urlCounter++; 

  if (!/^https?:\/\/[a-z]+/.test(originURL)) {
    return res.status(400).json({error: "invalid url"});
  }else{
    let currentURL = {
      "original_url": originURL,
      "short_url": shortURL
    }
    urlDataBase.push(currentURL); 

      res.json({
        original_url: originURL,
        short_url: shortURL
      });
  }
});

app.get('/api/shorturl/:shortcut', (req, res) => {
  let shorturlParams = parseInt(req.params.shortcut); 

  if(!/^[0-9]+$/.test(shorturlParams)){
    return res.json({
      "error": "Wrong format"
    })
  }else{
    const found = urlDataBase.find(entry => entry.short_url === shorturlParams); 
    if(found){
      res.redirect(found.original_url); 
    }else{
      res.json({
        error: "No short URL found for the given input"
      });
    }
  }
}); 