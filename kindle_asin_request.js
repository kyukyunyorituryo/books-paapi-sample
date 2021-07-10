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

console.log( JSON.stringify(asin, null, 1))
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
//\n]\n\d\n\d\d\n\[
day=20210712
today=20210731

dayloop:for (day; day <= today; day++) {
flag=1
asinarray=[]
filename=day+'k.json'
loop1:for (let i =1; i <=400;  i ++) {
var url = 'https://www.amazon.co.jp/s?i=digital-text&rh=n%3A2250738051%2Cn%3A2250739051%2Cn%3A2275256051%2Cp_n_date%3A'+day+'&s=date-desc-rank&page='+i+'&qid=1588652675&ref=sr_pg_2'
console.log(i)
var options = {
  url: url,
//headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363'},
  timeout: 1500
};
if(flag==0){break loop1;}
 await sleep(5) 
 
loop2: for (let step = 0; step < 5; step++) {
 try {
await requestPromise(options);
     break loop2;
  } catch (error) {
     console.log(error);
     if (step==4){
     //return
     break dayloop;
     }
  }
  }
  
  }
  
  console.log(asinarray)

  if(asinarray.length==0){
  
  }else{
  console.log('ファイルを書き込みます')
fs.writeFileSync(__dirname + '/json/kindle/kindle_asin/'+filename, JSON.stringify(asinarray, null, 1),'utf-8')

}
}
})();
console.log("リクエスト開始");