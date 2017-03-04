import React, { Component } from 'react';
import './App.css';
import scooter from './scooter-15.svg';
import star from './star-15.svg';


import Flexbox from 'flexbox-react';

var categories = require('./categories.json.js');

class Box extends React.Component {
  constructor(props) {

    super(props);
    this.state = {clicked: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }));
  }

  render() {
    return (
      <Flexbox flexGrow={1} width='20px' className={['box', this.props.classes, ((this.state.clicked) ? 'clicked' : '')].join(' ') } onClick={this.handleClick}>
       {this.props.content}
      </Flexbox>
    );
  }
}

function build() {
  var no = 5;
  var rows = [];
  for (var row = 0; row < no; row++) {
    var boxes = [];

    for (var column = 0; column < no; column++) {
      if (row === 2 && column === 2) {
        boxes.push(<Box content={<img src={star} />} key={row + '!' + column} classes='free' />);
      } else {
        var idx = Math.floor(Math.random() * (categories.length - 0)) + 0;
        boxes.push(< Box content={(categories.splice(idx, 1)[0] || 'nope')} key={row + '!' + column} classes='' />);
      } 
    }
    rows.push(
      <Flexbox flexDirection="row" minHeight="20vh" key={row} className='row'>
        {boxes}
      </Flexbox>
    );
  }
  return rows;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2> ____ on a <img src={scooter} /> bingo</h2>
        </div>
        <div id='board'>
          { build() }
        </div>
      </div>
    );
  }
}

export default App;



