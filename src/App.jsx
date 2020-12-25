import React from "react";
import "./styles.css";

export default function App (props) {
  return(
    <div className="App">
      <header className='header'>
        <h1>Cash Register Manager</h1>
      </header>

      <div>
        Available Currencies(in Rs.):
        <ul className='listCurrency'>
          {props.renderAvailableCurrencies()}
          <input type='number'
          onChange={({target}) => props.setNewCurrency(target.value)}
          placeholder='add new currency'
          value={props.newCurrency}/>
          <button className='btn btnPlus' onClick={props.addNewCurrency}>+</button>
        </ul>
      </div>
      <p>Change: {props.change >= 0 ? props.change : "cash not enough to pay the bill"} </p>
     
     <div className='whiteContainer'>
        <p>
          Bill to be paid: <br/>
          <input
          onChange={props.billChangeHandler}
          placeholder="bill amount"
          type="number"
          />{" "}
        </p>
        <hr/>
        <p>
          Cash received to pay bill: <br/>
          <input
          onChange={props.cashChangeHandler}
          placeholder="cash received"
          type="number"
          disabled={!props.billAmount}
          />
        </p>

      </div>

      <div>
        <button className='btn btnConvert' onClick={props.convertHandler}>Convert</button>
      </div>

      <div className='whiteContainer'>
        {!props.output? 'output will be displayed here..' :props.output}
      </div>

      <footer className='footer'>
        <h1>about</h1>
        <p> Clicking on 'Convert' converts the 'change' to the most efficient combo of notes</p>
      </footer>
    </div>
  )
}