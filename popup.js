fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

const currencyKey = config.apikey;
var myHeaders = new Headers();
myHeaders.append("apikey", currencyKey);

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

window.addEventListener("load", ()=> {
    getExchangeRate();
});

getButton.addEventListener("click", e=> {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop_list .icon");
exchangeIcon.addEventListener("click", ()=> {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    getExchangeRate();
})

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    exchangeRateText = document.querySelector(".exchange_rate");
    let amountVal = amount.value;
    if (amountVal=="" || amountVal=="0") {
        amount.value = "1";
        amountVal = 1;
    }
    
    exchangeRateText.innerText = "getting_the_result...";
    let url = `https://api.apilayer.com/fixer/latest?symbols=${toCurrency.value}&base=${fromCurrency.value}`
    fetch(url, requestOptions)
        .then(response=> response.json())
        .then(result=> {
            let exchangeRate = result.rates[toCurrency.value];
            let totalExchangeRate = (amountVal*exchangeRate).toFixed(2);
            exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        }).catch(()=> {
            exchangeRateText.innerText = "something_went_wrong...";
        })
}