

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
//     url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=YZZMTHCW6NPA55RJ',
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
//   url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=YZZMTHCW6NPA55RJ',
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


// Given: 'TSLA'
// Output: '668.000'
async function getStonkData(ticker) {
  let resp = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ticker+'&apikey=YZZMTHCW6NPA55RJ')
  let price = await resp.json();
  return price["Time Series (Daily)"]["2021-03-10"]["4. close"];
}

async function main() {
  const tslaPrice = await getStonkData(companies[0]);
  addTickerPrice('Tesla', tslaPrice)
}

// adds the ticker price to the DOM element 
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



// On document ready
$(document).ready(function() {

  // ------------ Prepend the body document with a div for ticker mover ------------



  main();

}); // End of document.ready