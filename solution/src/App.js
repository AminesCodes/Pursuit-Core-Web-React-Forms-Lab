import React from 'react';
import './App.css';


// FUNCTIONS
// ##################################################################################
const renderArray = (array) => {
  return array.reduce((acc, element) => {
    if (!isNaN(parseFloat(element)) && (parseFloat(element) + '').length === element.length) {
      acc.push(parseFloat(element))
    }
    return acc
  }, [])
}

const sum = (array) => {
  return array.reduce((acc, element) => acc + element);
}

const average = (array) => {
  return sum(array) / array.length;
}

const mode = (array) => {
  const tracker = {}
  let max = 1;
  let mostFrequent = array[0];

  array.forEach(element => {
    if (tracker[element]) {
      tracker[element] += 1
    } else {
      tracker[element] = 1
    }

    if (tracker[element] > max) {
      max = tracker[element];
      mostFrequent = element;
    }
  })
  return mostFrequent;
}
// ##################################################################################



class App extends React.Component {
  initialState = {
    userInput: '',
    operation: '',
    result: null,
    formReady: false
  }

  state = { ...this.initialState }


  handleInputChange = (event) => {
    this.setState({ userInput: event.target.value })
  }

  handleSelectChange = (event) => {
    this.setState({ operation: event.target.value })
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    if (this.state.userInput && this.state.operation) {
      const inputArray = this.state.userInput.split(',');
      const arrangedArray = renderArray(inputArray);

      if (arrangedArray.length) {
        this.setState({ formReady: true })

        if (this.state.operation === 'sum') {
          this.setState({ result: sum(arrangedArray) })
        }

        if (this.state.operation === 'avg') {
          this.setState({ result: average(arrangedArray) })
        }

        if (this.state.operation === 'mode') {
          this.setState({ result: mode(arrangedArray) })
        }
      } else {
        this.setState({ formReady: false })
      }
    } else {
      this.setState({ formReady: false })
    }
  }

  handleReset = () => {
    this.setState(this.initialState)
  }

  render() {
    let {
      userInput,
      operation,
      result,
      formReady
    } = this.state;

    let resultToDisplay = <p>Input field is required and <strong>should</strong> contain only numbers, separated by coma</p>;

    if (formReady) {
      resultToDisplay = <p>Result: {result}</p>;

    }

    return (
      <div className="App">
        <h2>Calculator</h2>

        <form onSubmit={this.handleSubmitForm}>
          <input type='text' placeholder='Enter numbers' value={userInput} onChange={this.handleInputChange} />

          <select value={operation} onChange={this.handleSelectChange}>
            <option value=''>--Select Operation--</option>
            <option value='sum'>Sum</option>
            <option value='avg'>Average</option>
            <option value='mode'>Mode</option>
          </select>
          <br></br>

          <button>Submit</button>

        </form>
        <br></br>
        
        <button onClick={this.handleReset}>Reset</button>

        <hr></hr>
        {resultToDisplay}

        <h5>* Non numeric values will be ignored (filtered)</h5>
      </div>
    )
  }
}

export default App;