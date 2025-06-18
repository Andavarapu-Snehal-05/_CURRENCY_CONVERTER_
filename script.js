const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convert-btn");
const resultDiv = document.getElementById("result");

// Populate currency dropdowns
const loadCurrencies = async () => {
  const res = await fetch("https://api.exchangerate.host/symbols");
  const data = await res.json();
  const symbols = data.symbols;

  for (let code in symbols) {
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");

    option1.value = option2.value = code;
    option1.text = option2.text = `${code} - ${symbols[code].description}`;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  }

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
};

const convertCurrency = async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = parseFloat(amount.value);

  if (isNaN(amt) || amt <= 0) {
    resultDiv.textContent = "Please enter a valid amount";
    return;
  }

  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amt}`;
  const res = await fetch(url);
  const data = await res.json();

  resultDiv.textContent = `${amt} ${from} = ${data.result.toFixed(2)} ${to}`;
};

convertBtn.addEventListener("click", convertCurrency);
window.addEventListener("load", loadCurrencies);
