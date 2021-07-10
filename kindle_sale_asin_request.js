const request = require("request");
 const jsdom = require("jsdom");
const { JSDOM } = jsdom;
fs = require('fs');

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

function sleep(second) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, second * 1000)
    })
}

function requestPromise(param){
    return new Promise((resolve, reject)=>{
        request(param, function (error, response, body) {
            if(error){
                reject("ページを取得できませんでした");
            }else{
//                console.log(body);
                asin=asinGet(body)
                asinarray=asinarray.concat(asin)
                resolve("取得できました");
            }
        })
    })
}

(async function(){

day='月替りセール'
flag=1
asinarray=[]
filename=day+'k.json'
//https://www.amazon.co.jp/s?rh=n%3A2250738051%2Cn%3A%212275265051%2Cn%3A%212275277051%2Cn%3A%218172192051%2Cn%3A%218187544051%2Cn%3A%218187545051%2Cn%3A%218187561051%2Cn%3A8187562051&page=2&qid=1594419906&ref=lp_8187562051_pg_2

//\n\s\"\/gp.+$
//\n]\n\d\n\d\d\n\[
//
//&price=100-10000
//'+i+'
//164
loop1:for (let i =1; i <300;  i++) {
console.log(i)
var url='https://www.amazon.co.jp/s?i=digital-text&rh=n%3A3550442051&fs=true&page='+i+'&qid=1625226615&ref=sr_pg_2'

var options = {
  url: url,
//headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363'},
  timeout: 1500
};

if(flag==0){break loop1;}
 await sleep(3) 
  try{
await requestPromise(options);
    }catch(error){
        await requestPromise (options);
    }
  }
  
  console.log(JSON.stringify(asinarray, null, 1))
  if(asinarray.length==0){
  
  }else{
  console.log('ファイルを書き込みます')
fs.writeFileSync(__dirname + '/json/kindle_sale/asin/'+filename, JSON.stringify(asinarray, null, 1),'utf-8')

}
}
)();
console.log("リクエスト開始");