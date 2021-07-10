fs = require('fs');
let ejs = require('ejs')

var templete = fs.readFileSync(__dirname + '/template/li.ejs', 'utf-8');
var skelton = fs.readFileSync(__dirname + '/template/html2.html', 'utf-8');

date=20210701
todate=20210731
//date=20201227
//todate=20201231


daytoday()
//folderall()

function folderall(){
var file_names = fs.readdirSync(__dirname + '/json/paper/ajax/');
file_names=file_names.filter(function(value) { return value.match(/\.json/gi); });
//console.log(file_names.length)
for (var i in file_names) {
f_data=fs.readFileSync(__dirname + '/json/paper/ajax/'+ file_names[i], 'utf-8')
items = JSON.parse(f_data);
//console.log(items)
date=file_names[i].split('.')[0].slice( 0, -1 )
//console.log(date)
htmlrender(items,date)
}
}
//
//date=20200101
//filename=date+'j.json'

//var json = fs.readFileSync(__dirname + '/json/ajax/'+filename, 'utf-8');
//items = JSON.parse(json);

//htmlrender(items,date)
function daytoday(){
for (date; date <= todate; date++) {
filename=date+'j.json'
try {

var json = fs.readFileSync(__dirname + '/json/paper/ajax/'+filename, 'utf-8');
}catch(err) {
console.log('/paper/kindle/paapi/'+date+'.json'+'ファイルが存在しません。')
continue;
}
items = JSON.parse(json);
htmlrender(items,date)
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
console.log(items[0])
//console.log(date)
books=nav.join('\n')
 html = ejs.render(skelton, {books: books,date:date});
//console.log(html)
fs.writeFileSync(__dirname + '/json/paper/html/'+date+'.html',html,'utf-8')

path='C:/Users/user/Documents/git/homepage/new_pub/html/'
fs.writeFileSync(path+date+'.html',html,'utf-8')
}
