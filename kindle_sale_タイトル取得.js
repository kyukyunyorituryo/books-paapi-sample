fs = require('fs');
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
titlearray=[];
a=[];
for (let i = 0; i < items.length; i++) {
list={"title":items[i].Title,"author":items[i].Contributor}
a.push(list)
titlearray.push(items[i].Title)
    }
    console.log(items[0].ImageURL)
    console.log(a)
books=nav.join('\n')
//    html = ejs.render(skelton, { books: books, date: date, image: items[0].ImageURL});
// fs.writeFileSync(__dirname + '/json/kindle_sale/paapi/'+filename, JSON.stringify(jsondata, null, 1),'utf-8')
fs.writeFileSync(__dirname + '/title.json',JSON.stringify(a, null, 1),'utf-8')
path='C:/Users/user/Documents/git/homepage/kindle_sale/html/'
//fs.writeFileSync(path+date+'.html',html,'utf-8')
}
