import styles from './App.styles.js'
import React from 'react'
import StockApp from "./components/Stocks/StockApp.js"


function App(){
  return(
    <div style={styles.app}>
      <StockApp></StockApp>
    </div>
  )
}

export default App
