//task2D
import express from 'express';
import _ from 'lodash';
import cors from 'cors';
import isColors from 'is-color';
import transformColor from './transformColor.js'

const app = express();
app.use(cors());

app.get('/task2D/', async (req, res) => {
   if (req.query.color == undefined) { 
    res.send('Invalid color');
  }
  const url = req.query.color;
    console.log('url: ' + url);
  res.send(transformColor(url.toString()));
    
});

/*
app.get(/.+/, async (req, res) => {
  const response = req.path;
  let answer = GetPcComponent(pc, response);
  if (answer !== false) return await res.json(answer); //если НЕ ошибка - отслыаем ответ
  res.send("Not Found" , 404); //если вернулась ошибка, возвращаем Not Found и статус 404
});*/

app.listen(3000, () => {
  console.log('Your app task2D! V34');
});