import React, { Component } from 'react';
import './App.css';
import Hotkeys from 'react-hot-keys';

const space = '\u00a0';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      body: '',
      description: '',
      name: '',
      prefix: '',
    };

    this.onChange = this.onChange.bind(this);
    this.compute = this.compute.bind(this);
  }

  compute() {
    const snippetContent = {}
    snippetContent.body = this.state.body.split('\n');
    snippetContent.prefix = this.state.prefix;
    snippetContent.description = this.state.description;

    const snippetObject = { [this.state.name]: snippetContent };

    const result = JSON.stringify(snippetObject, null, 2);
    const resultWithFakeSpaces = result.replace(/ /g, space);
    this.setState({...this.state, result: resultWithFakeSpaces});
  }

  onChange(field) {
    return (e) => {
      const value = e.target.value;
      this.setState({...this.state, [field]: value});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">VSSnippeteer</h1>
        </header>
        <div className="App-body">
          <div className="text-area-container">
            <div>
              <label className="label">Name</label>
              <input className="input-text margin-bottom" onChange={this.onChange('name')} type="text" />
            </div>
            <div>
              <label className="label">Prefix</label>
              <input className="input-text margin-bottom" onChange={this.onChange('prefix')} type="text" />
            </div>
            <div>
              <label className="label">Code</label>
              <textarea className="code-area input-text" onChange={this.onChange('body')}/>
            </div>
            <div>
              <label className="label">Description</label>
              <input className="input-text margin-bottom" onChange={this.onChange('description')} type="text" />
            </div>
          </div>
          <Hotkeys keyName="ctrl+enter" onKeyDown={this.compute}>
          <div className="buttonContainer">
            <div className="button" onClick={this.compute}>Generate</div>
            <div className="shortcut-hint">CTRL+Enter</div>
          </div>
          </Hotkeys>
          <div className="text-result" style={{ whiteSpace: 'pre-line' }}>{this.state.result}</div>
        </div>
      </div>
    );
  }
}

export default App;
