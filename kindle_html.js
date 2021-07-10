fs = require('fs');
let ejs = require('ejs')

var templete = fs.readFileSync(__dirname + '/template/li.ejs', 'utf-8');
var skelton = fs.readFileSync(__dirname + '/template/kindle.html', 'utf-8');

day=20210712
today=20210731

//day=20200101
//today=20200131

daytoday()

//folderall()

function folderall(){
var file_names = fs.readdirSync(__dirname + '/json/kindle/kindle_ajax/');
file_names=file_names.filter(function(value) { return value.match(/\.json/gi); });
//console.log(file_names.length)

for (var i in file_names) {
f_data=fs.readFileSync(__dirname + '/json/kindle/kindle_ajax/'+ file_names[i], 'utf-8')
items = JSON.parse(f_data);
//console.log(items)
items=adult_removefn(items)
items=fascicle_removefn(items)
items=zero_removefn(items)

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

//アダルトを除外
function adult_removefn() {
		nav = []
		adults = items.filter(word => (!word.Category.includes('アダルト')) && ( !word.Category.includes('写真集')));
		return adults
}

//分冊を除外
function fascicle_removefn() {
		fascicles = items.filter(word => (!word.Title.includes('分冊')) && ( !word.Title.includes('プチキス'))&& ( !word.Title.includes('単話')));
		return fascicles
}
//期間限定無料を除外
function zero_removefn() {
		zero = items.filter(word =>( !word.Title.includes('期間限定'))&& ( !word.Title.includes('無料お試し'))&& ( !word.Title.includes('試し読み')));
		return zero
}

function daytoday(){
for (day; day <= today; day++) {
filename=day+'j.json'
try {

var json = fs.readFileSync(__dirname + '/json/kindle/kindle_ajax/'+filename, 'utf-8');
}catch(err) {
console.log('/json/kindle/kindle_paapi/'+day+'.json'+'ファイルが存在しません。')
continue;
}
items = JSON.parse(json);
items=adult_removefn(items)
items=fascicle_removefn(items)
items=zero_removefn(items)
htmlrender(items,day)
}}

function htmlrender(items,date){
nav=[];
function insertStr(str, index, insert) {
    return str.slice(0, index) + insert + str.slice(index, str.length);
}
w3cdate=insertStr(String(date), 4, '/')
w3cdate=insertStr(w3cdate, 7, '/')
 var start = new Date(w3cdate)
 
 function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + m+ d);
}

date=parseInt(formatDate(start), 10)
//全角変換
function zenkaku2Hankaku(str) {
    return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
}

booksday=zenkaku2Hankaku(String(start.getMonth()+1))+"月"+zenkaku2Hankaku(String(start.getDate()))+"日発売のkindle本"
 
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
books=nav.join('\n')
 html = ejs.render(skelton, {books: books, date:booksday});

fs.writeFileSync(__dirname + '/json/kindle/kindle_html/'+date+'.html',html,'utf-8')
path='C:/Users/user/Documents/git/homepage/new_epub/html/'
fs.writeFileSync(path+date+'.html',html,'utf-8')
}
