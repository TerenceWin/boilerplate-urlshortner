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
let urlArray = {}; 

app.post('/api/shorturl', (req, res) => {
  const originURL = req.body.url; // assuming form input name="url"
  const shortURL = urlCounter++; 

  if (!/^https?:\/\/[a-z]+/.test(originURL)) {
    return res.status(400).json({ error: "Invalid URL" });
  }else{
      res.json({
        original_url: originURL,
        short_url: shortURL
      });
  }

  
});
