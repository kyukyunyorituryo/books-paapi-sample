fs = require('fs');
let ejs = require('ejs')

var templete = fs.readFileSync(__dirname + '/template/li.ejs', 'utf-8');
var skelton = fs.readFileSync(__dirname + '/template/kindle_sale.html', 'utf-8');

day='【夏☆電書2021】講談社文庫50周年 SF・ファンタジー傑作選　最大50％OFF　７月１５日 まで'

//daytoday()
//folderall()
days()
function days(){
filename=day+'j.json'
try {

var json = fs.readFileSync(__dirname + '/json/kindle_sale/ajax/'+filename, 'utf-8');
}catch(err) {
console.log('/json/kindle_sale/paapi/'+day+'.json'+'ファイルが存在しません。')
}
items = JSON.parse(json);
console.log(items)
htmlrender(items,day)
}
function folderall(){
var file_names = fs.readdirSync(__dirname + '/json/kindle_sale/ajax/');
file_names=file_names.filter(function(value) { return value.match(/\.json/gi); });
console.log(file_names.length)

for (var i in file_names) {
f_data=fs.readFileSync(__dirname + '/json/kindle_sale/ajax/'+ file_names[i], 'utf-8')
items = JSON.parse(f_data);
console.log(items)
date=file_names[i].split('.')[0].slice( 0, -1 )
console.log(date)
htmlrender(items,date)
}
}


function daytoday(){
for (day; day <= today; day++) {
filename=day+'j.json'
try {

var json = fs.readFileSync(__dirname + '/json/kindle_sale/ajax/'+filename, 'utf-8');
}catch(err) {
console.log('/json/kindle_sale/paapi/'+day+'.json'+'ファイルが存在しません。')
continue;
}
items = JSON.parse(json);
htmlrender(items,day)
}}

function htmlrender(items,date){
nav=[];
for (let i = 0; i < items.length; i++) {
    nav[i] = ejs.render(templete, {
        title: items[i].Title,
        image_url: items[i].ImageURL,
        price:items[i].Price,
        point:items[i].Points,
        url: items[i].URL,
        contributor:items[i].Contributor,
        publisher:items[i].Publisher,
        category:items[i].Category,
        asin:items[i].Asin
    })
    }
    console.log(items[0].ImageURL)
    books = nav.join('\n')
    date_url=encodeURI(date)
    html = ejs.render(skelton, { books: books, date: date, date_url: date_url, image: items[0].ImageURL});

fs.writeFileSync(__dirname + '/json/kindle_sale/html/'+date+'.html',html,'utf-8')
path='C:/Users/user/Documents/git/homepage/kindle_sale/html/'
fs.writeFileSync(path+date+'.html',html,'utf-8')
}
