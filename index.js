// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// app.use()

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res, next)=>{
    console.log(req.method+" "+req.path+" "+req.ip);
    next();
  },(req, res)=>{

  let date;
  
  if (req.params.date) {
    if (!isNaN(req.params.date)) {
      date = new Date(parseInt(req.params.date));
    } else {
      date = new Date(req.params.date);
    }
    
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: "Invalid Date" });
    }
  } else {
    date = new Date();
  }
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  })
});


// Listen on port set in environment variable or default to 3000
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
