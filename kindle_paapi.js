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
var getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest();
getItemsRequest['PartnerTag'] =key.PartnerTag//
getItemsRequest['PartnerType'] = 'Associates';


getItemsRequest['Resources'] =[
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
        var getItemsResponse = ProductAdvertisingAPIv1.GetItemsResponse.constructFromObject(data);
        console.log(JSON.stringify(getItemsResponse, null, 1));
jsondata=jsondata.concat(getItemsResponse.ItemsResult.Items);
        fs.writeFileSync(__dirname + '/json/kindle/kindle_paapi/'+filename, JSON.stringify(jsondata, null, 1),'utf-8')
//console.log("test"+jsondata)
        if (getItemsResponse['Errors'] !== undefined) {
            console.log('\nErrors:');
            console.log('Complete Error Response: ' + JSON.stringify(getItemsResponse['Errors'], null, 1));
            console.log('Printing 1st Error:');
            var error_0 = getItemsResponse['Errors'][0];
            console.log('Error Code: ' + error_0['Code']);
            console.log('Error Message: ' + error_0['Message']);
        }
    }
};

(async function(){

day=20210712
today=20210731
//day=20201231
//today=20201231

for (day; day <= today; day++) {
try {
var json = fs.readFileSync(__dirname + '/json/kindle/kindle_asin/'+day+'k.json', 'utf-8');
}catch(err) {
console.log('/json/kindle_asin/'+day+'k.json'+'ファイルが存在しません。')
continue;
}

asinarry = JSON.parse(json);

//c=a.ItemsResult.Items.concat(b.ItemsResult.Items);
jsondata=[];
filename=day +'.json'

for (let i = 0; i < asinarry.length; i += 10) {
 await sleep(3) 
asin =asinarry.slice(i, i+10)
getItemsRequest['ItemIds'] = asin


try {
api.getItems(getItemsRequest, callback);
} catch (ex) {
  console.log("Exception: " + ex);
}
}}
})();