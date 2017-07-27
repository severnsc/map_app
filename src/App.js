import React, { Component } from 'react';
import './App.css';

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
    return "https://maps.googleapis.com/maps/api/staticmap?center=" + safeAddress + "&zoom=15&size=" + this.state.size + "&maptype=roadmap&markers=color:red|" + safeAddress + "&key=AIzaSyBfk5WgVcy7AmNR6VbQ6KWFoI5TNvsZDjI"
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
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input
            type="radio"
            name="aspectRatio"
            value="640x360"
            onClick={this.setSize}
          />Wide
          <input
            type="radio"
            name="aspectRatio"
            value="640x640"
            onClick={this.setSize}
          />Square
           <input 
            type="submit"
            value="Submit"
          />
        </form>
        <img 
          src={this.state.url}
          alt={this.state.value}
        />
        {downloadButton}
      </div>
    );
  }
}

export default App;
