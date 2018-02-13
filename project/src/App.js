import React, { Component } from 'react';
import './App.css';

const space = '\u00a0';

function addQuotesAndComma(stringArray) {
  const [addQuotesNoComma, ...addQuotesComma] = stringArray.reverse();
  const withQuotesComma = addQuotesComma.map((s) => `"${s}",`);
  const withQuotesNoComma = `"${addQuotesNoComma}"`;
  return [withQuotesNoComma, ...withQuotesComma].reverse();
}

function addTwoIndents(stringArray) {
  return stringArray.map((s) => `${space}${space}${s}`);
}

function addBodyProperty(stringArray) {
  const indented = addTwoIndents(stringArray);
  return ['body: [', ...indented, '],']
}

function generateBody(input) {
  const split = input.split('\n');
  const resultArray = addQuotesAndComma(split);
  const resultWithBody = addBodyProperty(resultArray)
  const stringResult = resultWithBody.join('\n');
  const stringResultWithSpaces = stringResult.replace(/ /g, space);

  return stringResultWithSpaces;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  compute() {
    const stringResultWithSpaces = generateBody(this.state.value);
    this.setState({...this.state, result: stringResultWithSpaces});
  }

  onChange(e) {
    const value = e.target.value;
    this.setState({...this.state, value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">VSSnippeteer</h1>
        </header>
        <div className="App-body">
          <textarea className="code-area" value={this.state.value} onChange={this.onChange.bind(this)}/>
          <div className="button" onClick={this.compute.bind(this)}>OK</div>
          <hr/>
          <div>VSCode snippet:</div>
          <div className="text-result" style={{ whiteSpace: 'pre-line' }}>{this.state.result}</div>
        </div>
      </div>
    );
  }
}

export default App;
