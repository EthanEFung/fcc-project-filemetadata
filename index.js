const express = require('express');
const cors = require('cors');
const multer = require('multer');

require('dotenv').config()
const upload = multer()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const viewHandler = (req, res) => 
  res.sendFile(process.cwd() + '/views/index.html');

const uploadHandler = (req, res) => {
  console.log(req.file);

  if (!req.file) {
    res.send({ error: 'upload a file to analyze' })
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
}

app.get('/', viewHandler);

app.post('/api/fileanalyse', upload.single('upfile'), uploadHandler); 


const port = process.env.PORT || 3000;

const listen = (err) => err
  ? console.log("Failure to start", err)
  : console.log('Your app is listening on port ' + port)

app.listen(port, listen);
