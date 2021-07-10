//sync-requestを本番環境では使うなという注意書きがある
var request = require('sync-request');
 const jsdom = require("jsdom");
const { JSDOM } = jsdom;
fs = require('fs');
isbnarray=[]
day='2021-07'
filename=202107
//day='2020-12'
//filename=202012
flag=1
//url='https://www.hanmoto.com/bd/search/sdate/2020-07/edate/2020-07/order/asc/hdt/%E6%96%B0%E3%81%97%E3%81%84%E6%9C%AC/vw/text_view/limit/500/offset/0'

loop1:for (let i =0; i <=10000;  i =i+500) {
url='https://www.hanmoto.com/bd/search/sdate/'+day+'/edate/'+day+'/order/asc/hdt/%E6%96%B0%E3%81%97%E3%81%84%E6%9C%AC/vw/text_view/limit/500/offset/'+i
if(flag==0){break;}
html = httpGet(url);
book=isbnGet(html)
//console.log(book)
isbnarray=isbnarray.concat(book)
}
console.log(isbnarray)
console.log('ファイルを書き込みます')
fs.writeFileSync(__dirname + '/json/paper/isbn/'+filename+'isbn.json', JSON.stringify(isbnarray, null, 1),'utf-8')

function httpGet(url){
  var res = request(    'GET',    url    );
response=  res.getBody('utf-8')
//console.log(response);
    return response;
}
function getYMD(date){
    var now   = new Date(date);
    var y = now.getFullYear();
    var m = ("00" + (now.getMonth()+1)).slice(-2);
    var d = ("00" + now.getDate()).slice(-2);
    var result = y + m + d;
    return result;
  }
function isbnGet(html){
    const dom = new JSDOM(html);
    table=dom.window.document.getElementsByTagName('table')[0].children[0].children
book=[];//配列宣言
for (let i = 0; i < table.length; i++) {
isbn=table[i].children[2].children[0].textContent
date=table[i].children[6].children[2].textContent
isbn=isbn.replace( /\s|&nbsp;/g , '' )
date=date.replace(/年/g, "/").replace(/月/g, "/").replace(/日/g, "/")
date=getYMD(date)
book.push({isbn:isbn,date:date})

//div class="pagination-box"
//ul class="pagination"
//li last
if(dom.window.document.querySelectorAll("ul.pagination > li").length !== 0){

li=dom.window.document.querySelectorAll("ul.pagination > li")
flag=li[li.length-1].getElementsByTagName('a').length
}
else{flag=0}
}
console.log(flag)
return book
}