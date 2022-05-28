## Guide
First of all, make sure you have installed Node and npm / yarn

```sh
# For Yarn (Highly Recommended)
yarn

# For npm
npm install --force --legacy-peer-deps
```

```sh
# For Yarn
yarn start

# For npm
npm run start
```

![How your terminal should look if everything goes well](https://imagedelivery.net/hnHx9kxJyligwC1X9CPssg/f28c210f-0f81-43fe-dadb-2ed9e609c700/public)

### Note
Your network URL might not have the same URL as the screenshot and that is completely fine. It depends on your network.


### Warning
If you have another process running at port 3000 then you might have some other URL (PORT) that screenshot.


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Lambda Function Code

```py
import json
import botocore.vendored.requests as requests

def lambda_handler(event, context):

	if "stock_ticker" not in event['queryStringParameters']:
	    return {
		        "Access-Control-Allow-Origin": "*",
		        "statusCode": 400,
		        "body": "send a valid stock_ticker"
		    }
	stock_ticker = event["queryStringParameters"]["stock_ticker"]
	
	response = requests.get(f"https://api.polygon.io/v2/aggs/ticker/{stock_ticker}/range/1/day/2020-01-01/2020-12-31?apiKey=taIMgMrmnZ8SUZmdpq9_7ANRDxw3IPIx").json()

	if response["resultsCount"] == 0:
		output = {
			"ticker": stock_ticker,
			"valid": False,
		}
		return {
	        "Access-Control-Allow-Origin": "*",
	        "statusCode": 404,
	        "body": json.dumps(output)
	    }

	
	all_prices = set()
	trading_volume = set()
	for item in response["results"]:
		all_prices.add(item["h"])
		all_prices.add(item["l"])
		trading_volume.add(item["v"])

	output = {
		"ticker": stock_ticker,
		"valid": True,
		"price": {
			"average": round(sum(all_prices)/len(all_prices)),
			"maximum": round(max(all_prices)),
			"minimum": round(min(all_prices))
		},
		"volume": {
			"average": round(sum(trading_volume)/len(trading_volume)),
			"maximum": round(max(trading_volume)),
			"minimum": round(min(trading_volume))
		}
	}
	return {
        "Access-Control-Allow-Origin": "*",
        "statusCode": 200,
        "body": json.dumps(output)
    }
```

## API

```http
POST https://bnbghfeg5mbl7naoluen7gqofi0tgsks.lambda-url.us-east-1.on.aws/
```

| Parameter         | Type      | Description                                                                    |
|:------------------|:----------|:-------------------------------------------------------------------------------|
| `stock_ticker`          | `string` | **Required**. Recieves an uppercased stock ticker                                            |

### Status Codes

This API returns the following status codes:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
