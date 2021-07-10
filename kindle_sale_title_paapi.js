fs = require('fs');
var json = fs.readFileSync(__dirname + '/key.json', 'utf-8');
key = JSON.parse(json);

function sleep(second) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, second * 1000)
    })
}

var ProductAdvertisingAPIv1 = require('./src/index');
var defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;
defaultClient.accessKey =key.accessKey//
defaultClient.secretKey = key.secretKey//
defaultClient.host = 'webservices.amazon.co.jp';
defaultClient.region = 'us-west-2';
var api = new ProductAdvertisingAPIv1.DefaultApi();
// Request Initialization

var searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();

/** Enter your partner tag (store/tracking id) and partner type */
searchItemsRequest['PartnerTag'] =key.PartnerTag//
searchItemsRequest['PartnerType'] = 'Associates';



/** Specify item count to be returned in search result */
searchItemsRequest['ItemCount'] =1;

/**
 * Choose resources you want from SearchItemsResource enum
 * For more details, refer: https://webservices.amazon.com/paapi5/documentation/search-items.html#resources-parameter
 */
searchItemsRequest['Resources'] =[
  "BrowseNodeInfo.BrowseNodes",
  "BrowseNodeInfo.BrowseNodes.Ancestor",
  "BrowseNodeInfo.BrowseNodes.SalesRank",
  "BrowseNodeInfo.WebsiteSalesRank",
  "Images.Primary.Small",
  "Images.Primary.Medium",
  "Images.Primary.Large",
  "ItemInfo.ByLineInfo",
  "ItemInfo.ContentRating",
  "ItemInfo.Classifications",
  "ItemInfo.ExternalIds",
  "ItemInfo.ManufactureInfo",
  "ItemInfo.ProductInfo",
  "ItemInfo.Title",
  "Offers.Listings.Price",
   "Offers.Listings.LoyaltyPoints.Points"];
  
var callback = function (error, data, response) {
  if (error) {
    console.log('Error calling PA-API 5.0!');
    console.log('Printing Full Error Object:\n' + JSON.stringify(error, null, 1));
    console.log('Status Code: ' + error['status']);
    if (error['response'] !== undefined && error['response']['text'] !== undefined) {
      console.log('Error Object: ' + JSON.stringify(error['response']['text'], null, 1));
    }
  } else {
//    console.log('API called successfully.');
    var searchItemsResponse = ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);
    console.log( JSON.stringify(searchItemsResponse, null, 1));
try {
    jsondata=jsondata.concat(searchItemsResponse.SearchResult.Items);
    fs.writeFileSync(__dirname + '/json/kindle_sale/paapi/'+filename, JSON.stringify(jsondata, null, 1),'utf-8')
}catch(err) {
console.log('エラーが起きた')
}
//console.log("test"+jsondata)
    if (searchItemsResponse['Errors'] !== undefined) {
      console.log('Errors:');
      console.log('Complete Error Response: ' + JSON.stringify(searchItemsResponse['Errors'], null, 1));
      console.log('Printing 1st Error:');
      var error_0 = searchItemsResponse['Errors'][0];
      console.log('Error Code: ' + error_0['Code']);
      console.log('Error Message: ' + error_0['Message']);
    }
  }
};

(async function(){
    sale ='【夏☆電書2021】講談社文庫50周年 SF・ファンタジー傑作選　最大50％OFF　７月１５日 まで'
//kindleカテゴリー
searchItemsRequest['BrowseNodeId'] = '2275256051';

//"文学・評論","2292699051"
//小説文芸
//searchItemsRequest['BrowseNodeId'] = '2292754051';
//"マンガ","Id": "2293143051"
//searchItemsRequest['BrowseNodeId'] = '2293143051';
//"ライトノベル","Id": "2410280051"
//searchItemsRequest['BrowseNodeId'] = '2410280051';
//"コンピュータ・IT","Id": "2291657051"
//searchItemsRequest['BrowseNodeId'] = '2291657051';

//出版社名
searchItemsRequest['Brand'] ='講談社'
//著者名
//searchItemsRequest['Author'] ="夢枕獏"
try {
    var json = fs.readFileSync(__dirname + '/json/kindle_sale/title/' + sale+'t.json', 'utf-8');
}catch(err) {
console.log('/json/kindle_asin/'+sale+'k.json'+'ファイルが存在しません。')
}

asinarry = JSON.parse(json);
titlearr=asinarry
//c=a.ItemsResult.Items.concat(b.ItemsResult.Items);
jsondata=[];
filename=sale +'.json'

for (let i = 0; i < asinarry.length; i ++) {
 await sleep(3) 
title =asinarry[i].title
//title =asinarry[i]
author=asinarry[i].author
searchItemsRequest['Title'] =title
searchItemsRequest['Author'] =author
    try {
        api.searchItems(searchItemsRequest, callback);
    } catch (ex) {
        console.log('Exception: ' + ex);
    }
}}
)();

/*
bookwalker
a=[]
bookitem=document.getElementsByClassName('bookItemHover')

for (let step = 0; step < bookitem.length; step++) {
a.push(bookitem[step].getAttribute('title'))
}


*/