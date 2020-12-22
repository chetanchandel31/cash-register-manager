import React from "react";
import "./styles.css";

export default function App() {
  const [billAmount, setBillAmount] = React.useState();
  const [cash, setCash] = React.useState();
  const [change, setChange] = React.useState(0);

  const currenciesAvailable = [1, 5, 10, 20, 100, 500, 2000];

  const cashChangeHandler = ({ target }) => {
    setCash(target.value);
    let diff = target.value - billAmount;
    setChange(diff);
  }; //need one more for change in bill

  const billChangeHandler = ({ target }) => {
    setBillAmount(target.value);
    let diff = cash - target.value;
    setChange(diff);
  };

  const convertToNotes = () => {
    //don't entertain potential error click
    if (change < 0) return alert(`Rs. ${billAmount-cash} more needed to pay the bill`);
    //an empty array which will later contain minimum notes required to return change
    let minNotes = [];
    //make a copy of change we have to return
    let newChange = change;
    
    while (newChange !== 0) {
     //find highest usable note available for returning change
    let highestUsableNote = 0;
    let highestAvailableNote = currenciesAvailable[currenciesAvailable.length - 1];
    if (newChange >= highestAvailableNote) highestUsableNote = highestAvailableNote;

    for (var i = 0; i < currenciesAvailable.length && !highestUsableNote; i++) {
      if (currenciesAvailable[i] > newChange)
        highestUsableNote = currenciesAvailable[i - 1];
    }
    minNotes.push(highestUsableNote);
    //use the discovered 'highest usable note' to reduce the change we have to return
    newChange = newChange - highestUsableNote;
    // console.log(newChange); keeps repeating till new change is zero
    }

    return minNotes;
  };

  const convertHandler = () => {
   const noteCombo= convertToNotes().join(', ');
   alert('Return the change in this combo of notes: '+noteCombo);
  }

  return (
    <div className="App">
      Available Currencies: {currenciesAvailable.join(", ")}.
      <p>Change: {change >= 0 ? change : "cash not enough to pay the bill"} </p>
     
      <p>
        Bill to be paid: <input
        onChange={billChangeHandler}
        placeholder="bill amount"
        type="number"
        />{" "}
      </p>

      <p>
        Cash received to pay bill: <input
        onChange={cashChangeHandler}
        placeholder="cash received"
        type="number"
        disabled={!billAmount}
        />
      </p>
      <div>
        Convert 'Change' to notes of available currency: <button onClick={convertHandler}>Convert</button>
      </div>
    </div>
  );
}
