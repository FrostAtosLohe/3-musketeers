# Currency 

# Mandatory setup
Install Nodejs 
	=> 	https://nodejs.org/en/
Go inside the "currency" file then install required extenstion
First, you need the required extension for currency
	=>	npm install ora
	=>	npm install ./
	=>	npm install axios
	=>	npm install money
Then currency itself
	=>	npm install currency

# How to use the script
Call the script cli.js using node
	=> node cli.js x y z
x : amount of money you want to convert (integer)
y : currency of the money you want to convert (*)
z : currency in which you want the conversion to be done (*)

* : To know which currency are usable, use one of the following option
Command
	=>	
Website (!All currencies indicated here might not work!)
	=>	https://www.easymarkets.com/eu/learn-centre/discover-trading/currency-acronyms-and-abbreviations/
API (display all usable currency and their conversion rate, doesn't tell where the currency is from, not user friendly)
	=>	https://api.exchangeratesapi.io/latest
	=>	https://blockchain.info/ticker (exchange rate for bitcoin)

# Example
To get an example, use the following command
	=>	node cli.js --help