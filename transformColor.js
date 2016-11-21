import express from 'express';
import _ from 'lodash';
import cors from 'cors';
import isColors from 'is-color';
import isRgb from 'is-color';
import isRgba from 'is-color';
import isHsl from 'is-color';
import isHex from 'is-color';
import isHsla from 'is-color';
import isKeyword from 'is-color';
import isInherit from 'is-color';
import isCurrentColor from 'is-color';
import isTransparent from 'is-color';
import convert from 'color-convert';

export default function transformColor(url){
    let path = url;
    path = path.toLowerCase();//приводим все к нижнему регистру
//     console.log('пробелы23: ' + path + path.length);
//    path = path.replace(/\s*\#?/,''); //убираем пробелы, нужно доработать
    path = path.replace(/\s*/g,''); //убираем пробелы, нужно доработать
    path = path.replace(/\%20/g,'');
    console.log('пробелы23: ' + path + path.length);
    if (isColors('#'+ path) || isColors(path)) { // если проходит проверку на цвет то
      console.log('Это цвет');
      return getColor(path);  // вызываем функцию перевода цвета
    } else {
      return path = 'Invalid color';
    }
  }

function getColor(path){
  let newpath = path;
  switch (true) {
      case (isHsl(newpath) && (colorType(newpath) == 'hsl')): return hslToHex(newpath);
      case (isHex('#' + newpath) && (colorType(newpath) == 'hex')): return hexToHex(newpath);
      case (isRgb(newpath) && (colorType(newpath) == 'rgb')): return rgbToHex(newpath);
      }
}


function hexToHex(newpath){
    console.log('Это Hex');
    let color = newpath;
    color = color.replace(/\#?/,'');
     if (6 < color.length ) {
        return color = 'Invalid color';
     } else if (color.length == 3) {
        color = _.split(color, '', 3); // разбиваем на элементы
        console.log(color);
        color = _.zip(color,color); // создаем новый массив вида ааbbcc
        color = color.join(''); // обьединяем в строку
        color = color.replace(/\,/g,'');
        console.log('newcolor: ' + color);
      }
    color = '#' + color;
    return color;
}

function rgbToHex(newpath){ 
  console.log('Это Rgb');
  let color = newpath;
  
    console.log('rgb Color: ' + color);
  color = color.match(/(?:\()(.+)(?:\))/); //вытаскиваем значение РГБ из скобок
  color = color[1]; // перезапись результата, после корявого мачта.
    console.log('Это Rgb match:' + color);
  color = color.split(/,/); // разбиваем строку на массив
    if (255 < color[0] || 255 < color[1] || 255 < color[2]) { // проверка на корректность данных 
       return color = 'Invalid color'; 
    }
  color = convert.rgb.hex(color); //конвертация
      console.log('convert.rgb.hex:' + color);
  color = color.toLowerCase(); // запись в нижний регистр
  color = '#' + color;
    console.log('Rgb: ' + color);
    return color;
}

function hslToHex(newpath){
  console.log('Это Hsl');
  let color = newpath;
  color = color.match(/(?:\()(.+)(?:\))/);//вытаскиваем значение hsl из скобок
  color = color[1]; // перезапись результата, после корявого мачта.
  color = color.replace(/\%/g,'');
  color = color.split(/,/); // разбиваем строку на массив
    console.log('Hsl do konverta: ' + color);
    if (359 < color[0] || 100 < color[1] || 100 < color[2]) { // проверка на корректность данных 
       return color = 'Invalid color'; 
    }
  color = convert.hsl.hex(color); // убиваем лишние знаки процентов
    console.log('Hsl posle konverta: ' + color);
  color = color.toLowerCase(); // запись в нижний регистр
  color = '#' + color;
    return color;
}

function colorType(newpath){
  let path = newpath;
  console.log('проверка цвет: ' + path);
  path = newpath.replace(/\(.+/,'');
  console.log('проверка цвет2: ' + path);
  path = path.toLowerCase();// на всякий случай
  if (isHex('#' + newpath)) {
    console.log('проверка цветif: ' + path);
    path = 'hex';
    console.log('проверка цветif: ' + path);
    return path;

  } else {
    console.log('проверка цветelse: ' + path);
    return path;
  }
}

//    let testcolor = isColors('#'+color);
//    console.log('testcolor: ' + testcolor);
//    console.log('пробелы: ' + color + color.length);
//    let newcolor = color.replace(/([a-f0-9]{3}){1,2}/gi,'');
//    console.log('newcolor: ' + newcolor);

//    let newcolor2 = color.match( /[a-f0-9]{6}\b/gi );
//    console.log('newcolor: ' + newcolor);
    
    
    /*
      if ((color.length == 6) && (color.match(/([a-f0-9]{6})\b/) == null)) {
        return color = 'Invalid color';
      }
      if (( 6 !== color.length) && (3 !== color.length)) {
        console.log('length' + color.length);
        return color = 'Invalid color';
      } 
     
      else if (color.length == 3) {
        color = _.split(color, '', 3); // разбиваем на элементы
        console.log(color);
        color = _.zip(color,color); // создаем новый массив вида ааbbcc
        color = color.join(''); // обьединяем в строку
        color = color.replace(/\,/g,'');
        console.log('newcolor: ' + color);
      }
    color = '#' + color;
    return color;*/