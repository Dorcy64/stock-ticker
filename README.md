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
	        "statusCode": 400,
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

## I used getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
