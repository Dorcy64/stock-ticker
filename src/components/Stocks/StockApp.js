import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles'
import StockTable from './StockTable.js'
import StockFrom from './StockForm.js'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { addNewStock } from '../../redux/api_store'


const useStyles = makeStyles((theme) =>({
    container: {
        maxWidth: "700px",
        width: "100%"
    },
    section: {
        width: "100%",
        padding: "50px",
        alignItems: "center",
        justifyContent: "center",

    },
}))


function StockApp(){
  const stored_stocks = useSelector(state => state.stocks.value)
  console.log(stored_stocks)
  // get stocks from stock data value
  const dispatch = useDispatch()

  const [stocks, setTableData] = useState(null)
  const classes = useStyles()
  // auto create styles from the styles above
  
  async function getStockData(){
      if (new URLSearchParams(window.location.search).get('search')){
        let stock_ticker = (new URLSearchParams(window.location.search).get('search')).toUpperCase()
        if (stock_ticker in stored_stocks) {
          // check ig stored data is in redux
          setTableData([stored_stocks[stock_ticker]])
        } else {
          let api_url = "https://bnbghfeg5mbl7naoluen7gqofi0tgsks.lambda-url.us-east-1.on.aws/?stock_ticker=" + stock_ticker
          // lambda url to retrieve stock data
          let success = true
          // chech if stock exists or if api is not limited
          let res = await axios.get(api_url, {
              headers: { Accept: "application/json"}
          }).catch(function (error) {
            // render the table with the new data which will be an error
            const output = {id: stock_ticker, exists: false}
            setTableData([output])
            if (error.status === 404) {          
                dispatch(addNewStock(output))
                // add the requested data to redux
            }
            success = false
          })

          if (success){
            const output = {
              id: res.data.ticker,
              exists: true,
              price_mean: res.data.price.average, 
              price_max: res.data.price.maximum, 
              price_min: res.data.price.minimum, 
              volume_mean: res.data.volume.average, 
              volume_max: res.data.volume.maximum, 
              volume_min: res.data.volume.minimum, 
          }
            // extract needed components from the requested data
            setTableData([output])
            // save the formated requested data for feaurure use
            dispatch(addNewStock(output))
          }
        }
      }
  } 

  useEffect(() => {
      getStockData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(stocks && stocks[0].exists) {
    return(
        <section className={classes.section}>
            <div className="row d-flex justify-content-center">
                <div className={classes.container}>
                    <StockFrom></StockFrom>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className={classes.container}>
                    {stocks.map((stock) => {
                        // render table in the future render multiple tables saved in redux
                        return (
                            <StockTable 
                                key={stock.id}
                                price_mean={stock.price_mean}
                                price_max={stock.price_max}
                                price_min={stock.price_min}
                                volume_mean={stock.volume_mean}
                                volume_max={stock.volume_max}
                                volume_min={stock.volume_min}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
  } else if (stocks){
    return(
      <section className={classes.section}>
        <div className="row d-flex justify-content-center">
          <div  className={classes.container}>
            <StockFrom></StockFrom>
          </div>
        </div>
        <div className="d-flex justify-content-center">
            <div className={classes.container}>
                <div className="alert w-100 text-center alert-danger fade show" role="alert">
                    <strong>Holy guacamole!</strong> The stock ticker you entered wasn't found or server error.
                </div>
            </div>
        </div>
      </section>
    )
  } else {
    return(
      <section className={classes.section}>
        <div className="row d-flex justify-content-center">
          <div  className={classes.container}>
            <StockFrom></StockFrom>
          </div>
        </div>
      </section>
    )
  }

}

export default StockApp
