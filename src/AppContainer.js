import React from "react";
import App from "./App";
import "./styles.css";

export default function AppContainer() {
  const [billAmount, setBillAmount] = React.useState();
  const [cash, setCash] = React.useState();
  const [change, setChange] = React.useState(0);
  const [output, setOutput] = React.useState();

  const currenciesAvailable = [1, 5, 10, 20, 100, 500, 2000];

  const cashChangeHandler = ({ target }) => {
    setCash(target.value);
    let diff = target.value - billAmount;
    setChange(diff);
  }; 

  const billChangeHandler = ({ target }) => {
    setBillAmount(target.value);
    let diff = cash - target.value;
    setChange(diff);
  };

  const convertChangeToNotes = () => {
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
     //don't entertain potential error click
    if (change < 0) return alert(`Rs. ${billAmount-cash} more needed to pay the bill`);
    if (!billAmount) return alert('fill the required inputs');

    const noteCombo= convertChangeToNotes();
    const compressedNoteCombo = compressArray(noteCombo).join(', ');
    setOutput('Return the change in this combo of notes: '+compressedNoteCombo+'.');
  }

  const compressArray = (arr) => {
   let originalArr = (arr);
   //same array but with all unique values
   let uniqueArr = [...new Set (originalArr)];

   //array which counts duplicates
   let countArr = uniqueArr.map(unqItem => {
     //count how many times this unique item repeats itself in originalArr
    let count = originalArr.filter(orgItem => orgItem === unqItem).length;
    //template as per need
    return `Rs.${unqItem} x ${count}`
   })

   return countArr;
  }

  return (
      <App
      currenciesAvailable={currenciesAvailable}
      billAmount={billAmount}
      change={change}
      billChangeHandler={billChangeHandler}
      cashChangeHandler={cashChangeHandler}
      convertHandler={convertHandler}
      output={output}
      />
     );
}