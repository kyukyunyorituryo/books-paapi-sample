const fetch = require('node-fetch');
//const AbortController = require('abort-controller');
 const jsdom = require("jsdom");
const { JSDOM } = jsdom;
fs = require('fs');
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

//\n]\n\d\n\d\d\n\[

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
var options = {
    timeout: 1500
};
(async () => {

day=20210705
today=20210705
   for (day; day <= today; day++) {
    flag = 1

        asinarray = []
    filename = day + 'k.json'

        loop1: for (let i = 1; i <= 400; i++) {
          if (flag == 0) { break loop1; }
            var url = 'https://www.amazon.co.jp/s?i=digital-text&rh=n%3A2250738051%2Cn%3A2250739051%2Cn%3A2275256051%2Cp_n_date%3A' + day + '&s=date-desc-rank&page=' + i + '&qid=1588652675&ref=sr_pg_2'

 await sleep(5) 
  console.log(i)
            loop2: for (let step = 0; step < 5; step++) {
 try {
    const res = await fetch(url ,options
//, {signal: controller.signal}
    );
   if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    console.log(text);
asin=asinGet(text)
console.log(asin)
asinarray=asinarray.concat(asin)
     console.log("取得できました");
     break loop2;
  } catch (error) {
     console.log(error);
  }
            }
        }
 
 
  if(asinarray.length==0){
  
  }else{
  console.log('ファイルを書き込みます')
fs.writeFileSync(__dirname + '/json/kindle/kindle_asin/'+filename, JSON.stringify(asinarray, null, 1),'utf-8')

       }
       await sleep(5) 
   }
   process.exit(0); 
})();