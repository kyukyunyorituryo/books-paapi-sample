fs = require('fs');

day=20210712
today=20210731
//day=20201231
//today=20201231

daytoday()
//folderall()
//day()
function day(){
var json = fs.readFileSync(__dirname + '/json/kindle/kindle_paapi/'+day+'.json', 'utf-8');
item = JSON.parse(json);
kindleparse (item,day)
}
function daytoday(){
for (day; day <= today; day++) {
try {
var json = fs.readFileSync(__dirname + '/json/kindle/kindle_paapi/'+day+'.json', 'utf-8');
}catch(err) {
console.log('/json/kindle_paapi/'+day+'.json'+'ファイルが存在しません。')
continue;
}
item = JSON.parse(json);
kindleparse (item,day)
}}

function folderall(){
var file_names = fs.readdirSync(__dirname + '/json/kindle/kindle_paapi/');
file_names=file_names.filter(function(value) { return value.match(/\.json/gi); });
//console.log(file_names)

for (var i in file_names) {
f_data=fs.readFileSync(__dirname +'/json/kindle/kindle_paapi/'+ file_names[i], 'utf-8')
item = JSON.parse(f_data);
//console.log(items)
day=file_names[i].split('.')[0].slice( 0, -1 )
//console.log(day)
kindleparse (item,day)
}
}

//kindleparse (items,day)

function kindleparse (item,day){
newpub=[]
for (let i = 0; i < item.length; i++) {
//console.log(i)
asin=item[i].ASIN
url=item[i].DetailPageURL
if(item[i].Images != null){
imageurl=item[i].Images.Primary.Large.URL
}else {
   imageurl='';
  }
if(item[i].ItemInfo.ByLineInfo== null){
  publisher='なし';
   Contributor='';
}
else{
  if(item[i].ItemInfo.ByLineInfo.Manufacturer != null){
publisher=item[i].ItemInfo.ByLineInfo.Manufacturer.DisplayValue
}else {
  publisher='なし';
  }

if(item[i].ItemInfo.ByLineInfo.Contributors != null){
Contributor= item[i].ItemInfo.ByLineInfo.Contributors[0].Name +"("+item[i].ItemInfo.ByLineInfo.Contributors[0].Role+")"

}else {
  Contributor='';
  }
  }
Booktype= item[i].ItemInfo.Classifications.Binding.DisplayValue
//isbn=item.ItemInfo.ExternalIds.ISBNs
//time=item.ItemInfo.ProductInfo.ReleaseDate.DisplayValue
//var today = new Date(time);
//ReleaseDate=today
title=item[i].ItemInfo.Title.DisplayValue
if(item[i].Offers != null){
price=item[i].Offers.Listings[0].Price.Amount
//Offers.Listings.LoyaltyPoints.Points
points=0
if(item[i].Offers.Listings[0].LoyaltyPoints != null){
points=item[i].Offers.Listings[0].LoyaltyPoints.Points
}
}else {
   price='なし';
  }
  
  categoryarr=[]
    if (item[i].BrowseNodeInfo != null) {
        itemlength = item[i].BrowseNodeInfo.BrowseNodes.length
        for (let j = 0; j < itemlength; j++) {
            categoryarr[j] = item[i].BrowseNodeInfo.BrowseNodes[j].DisplayName
        }
    }
    else {
        categoryarr=['なし']
    }
    category = categoryarr.join(',');

newpub.push({ "Asin" :asin , "URL" :url, "ImageURL" : imageurl , "Publisher" : publisher,"Contributor":Contributor,"Booktype":Booktype ,"Title":title, "Price":price,"Category":category,"Points":points})
}

console.log(newpub)
filename=day+'j.json'
fs.writeFileSync(__dirname + '/json/kindle/kindle_ajax/'+filename, JSON.stringify(newpub, null, 1),'utf-8')

path='C:/Users/user/Documents/git/homepage/new_epub/json/'
fs.writeFileSync(path + filename, JSON.stringify(newpub, null, 1),'utf-8')
}



//testコード
/*
for (let i = 24; i <25; i++) {
asin=item[i].ASIN
url=item[i].DetailPageURL

imageurl=item[i].Images.Primary.Large.URL
publisher=item[i].ItemInfo.ByLineInfo.Manufacturer.DisplayValue
Contributor= item[i].ItemInfo.ByLineInfo.Contributors[0].Name +"("+item[i].ItemInfo.ByLineInfo.Contributors[0].Role+")"
Booktype= item[i].ItemInfo.Classifications.Binding.DisplayValue
title=item[i].ItemInfo.Title.DisplayValue
price=item[i].Offers.Listings[0].Price.Amount
newpub.push({ "Asin" :asin , "URL" :url, "ImageURL" : imageurl , "Publisher" : publisher,"Contributor":Contributor,"Booktype":Booktype ,"Title":title, "Price":price})
}
*/