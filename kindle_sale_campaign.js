//sync-requestを本番環境では使うなという注意書きがある
var request = require('sync-request');
 const jsdom = require("jsdom");
const { JSDOM } = jsdom;
fs = require('fs');

sale='【夏☆電書2021】講談社文庫50周年 SF・ファンタジー傑作選　最大50％OFF　７月１５日 まで'
filename=sale+'t.json'
flag=1
asinarray=[]
selenum=16617
page=5
//114
for (let i =1; i <=page; i++) {
//https://ebookstore.sony.jp/search/?featureId=15650&submitSearch=1&priceMin=&priceMax=&floor=novel&cs=bnr15650_features&page=2
//var url ='https://ebookstore.sony.jp/search/?featureId='+selenum+'&submitSearch=1&priceMin=&priceMax=&floor=novel&cs=bnr15650_features&page=' + i
var url = 'https://ebookstore.sony.jp/search/?featureId='+selenum+'&page=' + i
//console.log(url)
html = httpGet(url);
asin=asinGet(html)
//console.log(a)
asinarray=asinarray.concat(asin)
}
console.log(asinarray)
  if(asinarray.length==0){
  
  }else{
  console.log('ファイルを書き込みます')
//fs.writeFileSync(__dirname + '/json/kindle_sale/title/'+filename, JSON.stringify(asinarray.sort(), null, 1),'utf-8')
fs.writeFileSync(__dirname + '/json/kindle_sale/title/'+filename, JSON.stringify(asinarray, null, 1),'utf-8')
}



function httpGet(url){
  var res = request(    'GET',    url    );
response=  res.getBody('utf-8')
//console.log(response);
    return response;
}
function asinGet(html){
    const dom = new JSDOM(html);
    const document = dom.window.document;
a=[]
//if (document.getElementsByClassName('searchResultDetailList__textListTitle').length)
//booknum=document.getElementsByClassName('searchResultDetailList__textListTitle')
booknum=document.getElementsByClassName('searchResultDetailList__leftAreaWrapper')
//タイトル
//booknum=document.getElementsByClassName('searchResultDetailList__leftAreaWrapper')[0].childNodes[1].children[0].textContent
//著者
//booknum=document.getElementsByClassName('searchResultDetailList__leftAreaWrapper')[0].childNodes[3].children[0].textContent
for (let step = 0; step < booknum.length; step++) {
title=booknum[step].childNodes[1].children[0].textContent
author=booknum[step].childNodes[3].children[0].textContent
list={"title":title,"author":author}
a.push(list)
//  a=a.concat(title)
}
a = a.filter(word =>( !word.title.includes('期間限定'))&& ( !word.title.includes('無料お試し'))&& ( !word.title.includes('試し読み')));
a = a.filter(word => (!word.title.includes('分冊')) && ( !word.title.includes('プチキス'))&& ( !word.title.includes('単話')));
return a
}