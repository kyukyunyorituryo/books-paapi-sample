fs = require('fs');

date=20210701
todate=20210731
//date=20201227
//todate=20201231

daytoday()
//folderall()
//day()
function day(){
var json = fs.readFileSync(__dirname + '/json/paper/paapi/'+date+'.json', 'utf-8');
item = JSON.parse(json);
parse (item,date)
}
function daytoday(){
for (date; date <= todate; date++) {
try {
var json = fs.readFileSync(__dirname + '/json/paper/paapi/'+date+'.json', 'utf-8');
}catch(err) {
console.log('/json/paapi/'+date+'.json'+'ファイルが存在しません。')
continue;
}
item = JSON.parse(json);
parse (item,date)
}}
/*
var json = fs.readFileSync(__dirname + '/json/paapi/'+date+'.json', 'utf-8');
obj = JSON.parse(json);
newpub=[]
item=obj
*/
function folderall(){
var file_names = fs.readdirSync(__dirname + '/json/paper/paapi/');
file_names=file_names.filter(function(value) { return value.match(/\.json/gi); });
//console.log(file_names)

for (var i in file_names) {
f_data=fs.readFileSync(__dirname +'/json/paapi/'+ file_names[i], 'utf-8')
item = JSON.parse(f_data);
//console.log(items)
date=file_names[i].split('.')[0]
//console.log(date)
parse (item,date)
}
}
function parse (item,date){
newpub=[]
for (let i = 0; i < item.length; i++) {
asin=item[i].ASIN
url=item[i].DetailPageURL
if(item[i].Images != null){
imageurl=item[i].Images.Primary.Large.URL
}else {
   imageurl='なし';
  }

    if (item[i].ItemInfo.ByLineInfo == null) {
        publisher = 'なし';
        Contributor = '';
    }
    else {
        if (item[i].ItemInfo.ByLineInfo.Manufacturer != null) {
            publisher = item[i].ItemInfo.ByLineInfo.Manufacturer.DisplayValue
        } else {
            publisher = 'なし';
        }

        if (item[i].ItemInfo.ByLineInfo.Contributors != null) {
            Contributor = item[i].ItemInfo.ByLineInfo.Contributors[0].Name + "(" + item[i].ItemInfo.ByLineInfo.Contributors[0].Role + ")"

        } else {
            Contributor = '';
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
  if (item[i].BrowseNodeInfo == null){

    break;

}
itemlength=item[i].BrowseNodeInfo.BrowseNodes.length

for (let j = 0; j <itemlength; j++) {
categoryarr[j]=item[i].BrowseNodeInfo.BrowseNodes[j].DisplayName
}
category = categoryarr.join(',');
newpub.push({ "Asin" :asin , "URL" :url, "ImageURL" : imageurl , "Publisher" : publisher,"Contributor":Contributor,"Booktype":Booktype ,"Title":title, "Price":price,"Category":category,"Points":points})
}

console.log(newpub)
filename=date+'j.json'
fs.writeFileSync(__dirname + '/json/paper/ajax/'+filename, JSON.stringify(newpub, null, 1),'utf-8')
path='C:/Users/user/Documents/git/homepage/new_pub/json/'
fs.writeFileSync(path + filename, JSON.stringify(newpub, null, 1),'utf-8')

//C:/Users/user/Downloads/comic/testdata/
//C:\Users\user\Documents\git\homepage\new_pub\json
}