const axios = require('axios');
const money = require('money');

const RATES_URL = 'https://api.exchangeratesapi.io/latest';			//Where all the rates are
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker';			//Bitcoin exchange rate
const CURRENCY_BITCOIN = 'BTC';

const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN);	//Check if there is bitcoin involved

module.exports = async opts => {
  const {amount = 1, from = 'USD', to = CURRENCY_BITCOIN} = opts;		//Set opts attributes to 1, usd and btc
  const promises = [];
  let base = from;

  const anyBTC = isAnyBTC(from, to);

  if (anyBTC) {			//Check if there is bitcoin involved to change the url accordingly
    base = from === CURRENCY_BITCOIN ? to : from;
    promises.push(axios(BLOCKCHAIN_URL));
  }

  promises.unshift(axios(`${RATES_URL}?base=${base}`));			//Default result (without bitcoin)

  try {
    const responses = await Promise.all(promises);
    const [rates] = responses;

    money.base = rates.data.base;		//Set the currency that you want
    money.rates = rates.data.rates;		//List of all the rates

    const conversionOpts = {
      from,
      to
    };

    //If bitcoin is involved
    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
      );

      Object.assign(money.rates, {
        'BTC': blockchain.data[base].last
      });
    }

    if (anyBTC) {		//Switch from and to
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }

    return money.convert(amount, conversionOpts);	//Return result
  } catch (error) {		//Return error message
    throw new Error (
      '💵 Please specify a valid `from` and/or `to` currency value!'
    );
  }
};