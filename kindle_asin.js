//sync-requestを本番環境では使うなという注意書きがある
var request = require('sync-request');
 const jsdom = require("jsdom");
const { JSDOM } = jsdom;
fs = require('fs');


//\n]\n\d\n\d\d\n\[

day=20210701
filename=day+'k.json'
flag=1
asinarray=[]

loop1:for (let i =1; i <=500;  i ++) {
var url = 'https://www.amazon.co.jp/s?i=digital-text&rh=n%3A2250738051%2Cn%3A2250739051%2Cn%3A2275256051%2Cp_n_date%3A'+day+'&s=date-desc-rank&page='+i+'&qid=1588652675&ref=sr_pg_2'
console.log(i)
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
fs.writeFileSync(__dirname + '/json/kindle/kindle_asin/'+filename, JSON.stringify(asinarray, null, 1),'utf-8')

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