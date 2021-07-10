//sync-requestを本番環境では使うなという注意書きがある
var request = require('sync-request');
 const jsdom = require("jsdom");
const { JSDOM } = jsdom;
fs = require('fs');
filename='Webデザイン書フェア'+'k.json'
flag=1
asinarray=[]
//&field-price=100%2D10000

//https://www.amazon.co.jp/s?rh=n%3A2250738051%2Cn%3A%212275265051%2Cn%3A%212275277051%2Cn%3A%218172192051%2Cn%3A%218187544051%2Cn%3A%218187545051%2Cn%3A%218187561051%2Cn%3A8187562051&page=2&qid=1594419906&ref=lp_8187562051_pg_2
//'+i+'
for (let i =1; i <=500; i++) {
var url='https://www.amazon.co.jp/s?i=digital-text&bbn=8425205051&rh=n%3A2250738051%2Cn%3A2275265051%2Cn%3A2275277051%2Cn%3A8172192051%2Cn%3A8419007051%2Cn%3A8425203051%2Cn%3A8425204051%2Cn%3A8425205051%2Cn%3A2275256051&dc&page='+i+'&fst=as%3Aoff&qid=1601046151&rnid=2250739051&ref=sr_pg_2'
//console.log(url)
if(flag==0){break;}
html = httpGet(url);
asin=asinGet(html)
asinarray=asinarray.concat(asin)
}

console.log(asinarray)
  if(asinarray.length==0){
  
  }else{
  console.log('ファイルを書き込みます')
fs.writeFileSync(__dirname + '/json/kindle_sale/asin/'+filename, JSON.stringify(asinarray, null, 1),'utf-8')

}

//var getUrl = 'https://www.amazon.co.jp/s?i=digital-text&bbn=2275256051&rh=n%3A2250738051%2Cn%3A2275256051%2Cp_n_date%3A20200522&dc&qid=1588732789&ref=sr_ex_n_1';
//var getUrl = 'https://www.amazon.co.jp/s?i=digital-text&bbn=2275256051&rh=n%3A2250738051%2Cn%3A2275256051%2Cp_n_date%3A20200623&dc&qid=1588732789&ref=sr_ex_n_1';

//html = httpGet(getUrl);
//asin=asinGet(html)

function httpGet(url){
  var res = request(    'GET',    url    );
response=  res.getBody('utf-8')
//console.log(response);
    return response;
}
function asinGet(html){
    const dom = new JSDOM(html);
table=dom.window.document.querySelectorAll("h2.a-size-mini > a")
asin=[]//配列宣言
for (let i = 0; i < table.length; i++) {
asin[i]=table[i].href
asin[i]=asin[i].replace( /^.+dp\/(\w+)\/.+$/g , '$1' )
}
/*
ul class="a-pagination" li class="a-disabled a-last"
*/
if(dom.window.document.querySelectorAll("ul.a-pagination > li").length !== 0){

li=dom.window.document.querySelectorAll("ul.a-pagination > li")
flag=li[li.length-1].getElementsByTagName('a').length
}
else{flag=0}
console.log(asin)
console.log(flag)
return asin
}