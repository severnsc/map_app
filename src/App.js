import React, { Component } from 'react';
import './App.css';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import logo from './agency_logo.png'
const env = runtimeEnv();

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: '',
      url: '',
      size: '640x640'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setSize = this.setSize.bind(this)
  }

  createURL(address){
    const safeAddress = encodeURIComponent(address)
    return "https://maps.googleapis.com/maps/api/staticmap?center=" + safeAddress + "&zoom=15&size=" + this.state.size + "&maptype=roadmap&markers=color:red|" + safeAddress + "&key=" + env.REACT_APP_API_KEY
  }

  handleSubmit(event){
    const url = this.createURL(this.state.value)
    this.setState({url})
    event.preventDefault()
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  setSize(event){
    this.setState({size: event.target.value})
  }

  render() {
    let downloadButton = null
    if(this.state.url !== ''){
      downloadButton = <a href={this.state.url} download><button>Download</button></a>
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} alt="Agency Luxe logo" />
        </div>
        <div className="App-body">
          <h2>Map Generator</h2>
          <p>Enter an address and city into the box below. Then select whether you want a wide (16:9) image or a square one. The map generator will create a map image with a pin droped at the specified address.</p>
          <form onSubmit={this.handleSubmit} className="Form">
            <ul>
              <li>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </li>
              <li>
                <p>Aspect Ratio:</p>
                <input type="radio" name="aspectRatio" value="640x360" onClick={this.setSize} /><label>Wide</label>
                <input type="radio" name="aspectRatio" value="640x640" onClick={this.setSize} /><label>Square</label>
              </li>
              <li>
                <input type="submit" value="Submit" />
              </li>
            </ul>
          </form>
          <img src={this.state.url} alt={this.state.value} />
          {downloadButton}
        </div>
      </div>
    );
  }
}

export default App;
