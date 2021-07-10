fs = require('fs');
var month = '202107'
//202003isbn.json
var json = fs.readFileSync(__dirname + '/json/paper/isbn/'+month+'isbn.json', 'utf-8');
obj = JSON.parse(json);
//console.log(obj)
array =obj
date=20210701
for (date; date <= 20210731; date++) {
var newLine = array.filter(function(item, index){
  if (item.date == date) return true;
});
console.log(newLine)

isbn=[]
for (let i = 0; i < newLine .length; i++) {
isbn.push(newLine [i].isbn)
}
//copy(isbn)
console.log(isbn)
filename=date+'isbn.json'
if(isbn.length!==0){
 fs.writeFileSync(__dirname + '/json/paper/isbn/'+filename, JSON.stringify(isbn, null, 1),'utf-8')
 }
}
/*
*/