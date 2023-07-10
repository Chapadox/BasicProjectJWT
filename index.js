import express from 'express';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({message: "puclic route"});
});

app.post('/login', (req, res) => {
  const {name, pass} = req.body;

  if(name == 'edu' && pass == '123') {
      const token = jwt.sign(name, process.env.SECRET);
      res.status(200).json({
      user: name,
      token: token
    });
  } else {
    res.status(403).json({
      msg: "autenticação falhou."
    })
  }
});

app.get('/private', verifyToken, (_req,res) => {
  res.status(200).json({msg: "private route"});
});

function verifyToken(req, res, next) {
  const token = req.headers['token']
  
  jwt.verify(token, process.env.SECRET, (err) => {
    if(err) return res.json({"err": err});
    next();
  });
}

app.listen(3000)
