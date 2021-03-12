
// get a list of user defined company names (from their portfolio selection)
// get the company name from stock ticker

// clear console on every run
// console.clear()

// get the current page JSON object
// $(document).ready(function(){
//   // let stonk = getStockData(companies[0]);
//   // console.log(stonk['TSLA']);

//   // addTickerPrice(companyNames[0], "668.0600");

//   console.log(getStonkData())

// });


// adds the ticker price to the DOM element 
// function addTickerPrice(company, tickerPriceStr) {

//   //const targetElements = document.querySelectorAll("span, p, h1, h2, h3, a");
//   // check for doc
//   const targetElements = document.querySelectorAll("span");
  

//   // iterate through each target element to look for matching company names
//    targetElements.forEach( (e) => {
//     // parse through the text content to see if a matching company name exists
//     // if a match is found, insert the new ticker price text
//     if (e.textContent.includes(company)) e.textContent = `${company} - ${tickerPriceStr}`;        
//   });
// };


 // Given: let companies = ['TSLA', 'PLTR', 'AMZN', 'FB', 'GOOG'];
 // Output: stonkPrices = {'TSLA': '625', 'PLTR': '23', 'AMZN': '5135', 'FB': '234', 'GOOG': '2003'}

// Given: 'TSLA'
// Output: '668.000'

// function getStockData(ticker) {
//   // Initialize a resultant stonks object
//   let stock = {};

//   $.ajax({
//     type: 'GET',
//     url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=APIKEY',
//     success: function(resp) {
  
//     // let date = new Date();
//     // let todaysDate = (date.getFullYear()+'-' + '0' + (date.getMonth()+1) + '-'+(date.getDate())).toString();
//     //stonks[companiesArray[i]] = resp["Time Series (Daily)"][todaysDate]["4. close"];
//     stock[ticker] = resp["Time Series (Daily)"]["2021-03-10"]["4. close"];
//     // console.log('successful API call');
//     // console.log(price);
//     },
//     error: function() {
      
//     }
//   });
  
//   return stock;
// }
 
// console.log(getStockData());

// let respObj = {}
// $.ajax({
//   type: 'GET',
//   url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=APIKEY',
//   success: function(resp) {

//   // let date = new Date();
//   // let todaysDate = (date.getFullYear()+'-' + '0' + (date.getMonth()+1) + '-'+(date.getDate())).toString();
//   //stonks[companiesArray[i]] = resp["Time Series (Daily)"][todaysDate]["4. close"];
//   respObj = resp;
//   // console.log('successful API call');
//   // console.log(price);
//   },
//   error: function() {
    
//   }
// });

let companyNames = ['Tesla', 'Palantir', 'Amazon', 'Facebook', 'Google'];
let companies = ['TSLA', 'PLTR', 'AMZN', 'FB', 'GOOG'];



// -------------------- Async functions to GET stock prices from ticker --------------------
// Given: 'TSLA'
// Output: '668.000'
async function getStonkData(ticker) {
  let resp = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ticker+'&apikey=APIKEY')
  let price = await resp.json();
  return price["Time Series (Daily)"]["2021-03-10"]["4. close"];
}

async function main() {
  const tslaPrice = await getStonkData(companies[0]);
  addTickerPrice('Tesla', tslaPrice);
}
// ----------------------------------------------------------------------------------------



// ------------------------ Adds the ticker price to the DOM element --------------------
function addTickerPrice(company, tickerPriceStr) {

  const targetElements = document.querySelectorAll("span, p, h1, h2, h3, a");
  //const targetElements = document.querySelectorAll("span");
  
  // iterate through each target element to look for matching company names
   targetElements.forEach( (e) => {
    // parse through the text content to see if a matching company name exists
    // if a match is found, insert the new ticker price text
    if (e.textContent.includes(company)) e.textContent = `${company} - $${Number(tickerPriceStr)}`;        
  });
};
// ---------------------------------------------------------------------------------------


let tickerPricesObj = {'GME': '260.00','TSLA': '699.60', 'PLTR': '26.73', 'AMZN': '3113.59', 'FB': '273.88', 'GOOG': '2114.77', 'AAPL': '121.96', 'MSFT': '237.13'};

// ----------------- Function to create the Ticker Container HTML/CSS -----------------
// Given: {'TSLA': '699.50', 'PLTR': '27.00':, 'AMZN': '3240.31', 'FB': '224.01', 'GOOG': '2093.59'};
// Output: HTML STRING '<header><div class="tcontainer"><><><><><>'

function tickerContainer(tickerObject) {

  let tickerMove = document.createElement('div');
  tickerMove.classList.add('ticker-move');


  // Iterate through the input array to append the tickerItem (text) to tickerMove
  for (const key in tickerObject) {
    let tickerItem = document.createElement('div');
    tickerItem.classList.add('ticker-item');
    let tickerText = document.createTextNode(key + ' - $' + tickerObject[key]);
    tickerItem.appendChild(tickerText);

    tickerMove.appendChild(tickerItem);
  }
  // --------------------------------------------------------------------------------

  let tickerWrap = document.createElement('div');
  tickerWrap.classList.add('ticker-wrap');
  tickerWrap.appendChild(tickerMove);

  let tContainer = document.createElement('div');
  tContainer.classList.add('tcontainer');
  tContainer.appendChild(tickerWrap);

  let headerTop = document.createElement('header');
  headerTop.classList.add('tContainer-header')
  headerTop.appendChild(tContainer);

  return headerTop;
}
// ---------------------------------------------------------------------------------



// ---------------------------------------------------------------------------------
// On document ready
$(document).ready(function() {

  // ------------ Prepend the body document with a div for ticker mover ------------
  $("body").prepend(tickerContainer(tickerPricesObj));


  main();

}); // End of document.ready