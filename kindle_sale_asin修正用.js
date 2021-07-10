fs = require('fs');
day ='【夏☆電書2021】講談社文庫50周年 SF・ファンタジー傑作選　最大50％OFF　７月１５日 まで'

    var json = fs.readFileSync(__dirname + '/json/kindle_sale/paapi/' + day+'.json', 'utf-8');
item = JSON.parse(json);
a=[]
item.forEach(element => a.push(element.ASIN))
console.log(a)
filename=day+'k.json'
fs.writeFileSync(__dirname + '/json/kindle_sale/asin/'+filename, JSON.stringify(a, null, 1),'utf-8')