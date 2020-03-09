#!/usr/bin/env node

const currency = require('./');
const ora = require('ora');

const argv = process.argv.slice(2);		//Get information typed after calling cli.js
//2 : discard the path to node and path to script then return everything else that was typed on the command line

module.exports = function sum(a, b) {
  return a + b;
};

//help using "node cli.js --help"
function help () {
  console.log(
    [
      '',
      '  Example',
      '    ❯ currency 1650 dkk eur',
      '    1650 DKK = 220.79486154 EUR',
      '',
      '  See README.md for detailed usage.'
    ].join('\n')
  );
}

const spinner = ora('Fetching exchange data..');		//Loading message, start while searching then stop

//Conversion function
async function start (opts) {
  try {
    const {amount, from, to} = opts;		//Retrieves conversion information
    const result = await currency(opts);

    spinner.stop();	
    console.log(`${amount} ${from} = ${result} ${to}`); 	//Display result
  } catch (error) { 		//Display "error" in case there is a problem
    spinner.stop();
    console.log(error);		
    process.exit(1);
  }
}

//Return help function if asked to
if (argv.indexOf('--help') !== - 1) {
  help();
  process.exit(0);
}

//Program
spinner.start();

const opts = {
  'amount': argv[0] || 1,						//Amount of money you want to convert or default value
  'from': (argv[1] || 'USD').toUpperCase(),		//Currency you want to convert or default value
  'to': (argv[2] || 'BTC').toUpperCase()		//Currency after conversion or default value
};

start(opts);