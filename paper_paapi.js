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

function isbn13to10(isbn13) {
  isbn13 += "";
  var digits = [];
  digits = isbn13.substr(3,9).split("") ;
  var sum = 0; var chk_tmp, chk_digit;
  for(let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  chk_tmp= 11 - (sum % 11);
  if (chk_tmp == 10) {
    chk_digit = 'X';
  } else if (chk_tmp == 11) {
    chk_digit = 0;
  } else {
    chk_digit = chk_tmp;
  }
  digits.push(chk_digit);
  return digits.join("");
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

/** Enter the Item IDs for which item information is desired */


/**
 * Choose resources you want from GetItemsResource enum
 * For more details, refer: https://webservices.amazon.com/paapi5/documentation/get-items.html#resources-parameter
 */
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
  


/**
 * Function to parse GetItemsResponse into an object with key as ASIN
 */
function parseResponse(itemsResponseList) {
  var mappedResponse = {};
  for (var i in itemsResponseList) {
    mappedResponse[itemsResponseList[i]['ASIN']] = itemsResponseList[i];
  }
  return mappedResponse;
}

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
 fs.writeFileSync(__dirname + '/json/paper/paapi/'+filename, JSON.stringify(jsondata, null, 1),'utf-8')
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

date=20210701
todate=20210731
//date=20201227
//todate=20201231
for (date; date <= todate; date++) {
try {
var json = fs.readFileSync(__dirname + '/json/paper/isbn/'+date+'isbn.json', 'utf-8');
}catch(err) {
console.log('/json/isbn/'+date+'isbn.json'+'ファイルが存在しません。')
continue;
}
isbn = JSON.parse(json);

//c=a.ItemsResult.Items.concat(b.ItemsResult.Items);
jsondata=[];
filename=date +'.json'
for (let i = 0; i < isbn.length; i++) {
isbn[i]=isbn13to10(isbn[i].replace(/\-/g, ''));
}
//isbn13から１０に変換

for (let i = 0; i < isbn.length;  i += 10) {
 await sleep(4) 
asin =isbn.slice(i, i+10)
getItemsRequest['ItemIds'] = asin


try {
api.getItems(getItemsRequest, callback);
} catch (ex) {
  console.log("Exception: " + ex);
}
}}
})();