'use strict';

import React, { Component } from 'react';
import Confetti from 'react-dom-confetti';

import './App.css';
import scooter from './assets/scooter-15.svg';
import star from './assets/star-15.svg';

import Flexbox from 'flexbox-react';

var categories = shuffle(require('./categories.json.js'));

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Board />);
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { win: false };
    this.clicked = {};
    this.calculateWin = this.calculateWin.bind(this);
    this.resetClicked = this.resetClicked.bind(this);
  }

  calculateWin(id, clicked) {
    this.clicked[id] = clicked;
    const boxes = document.getElementsByClassName('clicked');
    const arr = [];
    for (var i = 0; i < boxes.length; i ++) {
      arr.push(boxes[i].id);
    }
    this.setState(prevState => ({
      win: winq(arr, 5)
    }));
  }

  resetClicked() {
    for (var c in this.clicked) {
      this.clicked[c] = false;
    }
    this.setState(prevState => ({
      win: false
    }));
  }

  render() {
    const config = {
      angle: 79,
      spread: 155,
      startVelocity: 20,
      elementCount: 89,
      decay: 0.95
    };
    const no = 5;
    const rows = [];
    var i = 0;
    for (var row = 0; row < no; row++) {
      const boxes = [];
      for (var column = 0; column < no; column++) {
        var id = row + '!' + column;

        // if it is the center box, make it a star
        if (row === 2 && column === 2) {
          if (!this.clicked[id]) this.clicked[id] = true;
          boxes.push(<Box
            update='false'
            content={<img src={star} alt='star' />}
            id={id}
            key={id}
            clicked={this.clicked[id]}
            classes='free' />);
        } else {
          if (!this.clicked[id]) this.clicked[id] = false;
          boxes.push(<Box
            calculateWin={ this.calculateWin.bind(this) }
            content={(categories[i] || 'nope')}
            id={id}
            key={id}
            clicked={this.clicked[id]}
            classes='' />);
          i ++;
        }
      }
      rows.push(
        <Flexbox
          flexDirection='row'
          key={row}
          className='row'>
          {boxes}
        </Flexbox>
      );
    }

    return (
      <div className='App'>
        <div className='App-header'>
          <h2><span className='yellow blank'>____</span> on a moto</h2>
          <h2><span className='small-caps yellow'>bingo</span></h2>
        </div>
        <div id='board'>
          <Confetti
            className='confetti'
            active={ this.state.win }
            config={ config }/>
          { rows }
        </div>
        <div id='options'>
          <a id='reset' onClick={ this.resetClicked.bind(this) }>reset board</a>
        </div>

        <div id='explanations'>
          <div id='rules'>
            <h2 className='yellow'>rules</h2>
            <ul className='list'>
              <li><p><span className='bold'>Standard Bingo rules</span> — continue playing until one player has covered a vertical, horizontal, or diagonal pattern of five grid spaces on their card. First player to get Bingo wins the game.</p></li>
              <li><p><span className='bold'>Plurals count</span> — if you see <span className='italic'>pigs</span> on a moto instead of <span className='italic'>a pig</span> on a moto, you get the space, and bonus, you saw a lot of pigs.</p></li>
              <li><p><span className='bold'>Combos are cool</span> — you see a family of four with their pet dog, mark both categories, you see a dude on a moto with a tree without headlights? You get both.</p></li>
              <li><p><span className='bold'>Winner buys the beers/ice cream that night</span> — why not the loser? Because the winner was the lucky duck who saw all this magic.</p></li>
              <li><p><span className='bold'>This game never really ends.</span></p></li>
            </ul>
          </div>
          <div>
          <h2 className='yellow'>what is this?</h2>
            <ul className='list'>
              <li><p>In much of the developing world, motorbikes are the main form of transportation. Out of necessity and in lieu of pick up trucks, people pack all sorts of stuff on their motos.</p></li>
              <li><p><a href='http://there.today'>We</a> have been driving motorcycles and now a camper van across the world through Asia and Latin America and would play a version of this game at every coffee break, and a game board makes it so much easier!</p></li>
              <li><p><span className='bold'>Why does the game board shuffle on every refresh?</span> — chances are you are playing this with someone who is traveling with you, and it would be a boring game if you both had the same board, so the randomized board gives someone an actual chance of winning, instead of eternal ties. Enjoy the chaos, it's why you are traveling around with these 2 wheeled death machine anyways, right?</p></li>
              <li><p>Pass on suggestions for more bingo boxes on <a href='https://github.com/camilleanne/motobingo/issues/1'>github</a></p></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: this.props.clicked };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.update === 'false') return;
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }), () => { this.props.calculateWin(this.props.id, this.state.clicked) });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.update === 'false') return;
    this.setState(prevState => ({
      clicked: nextProps.clicked
    }));
  }

  render() {
    return (

      <Flexbox
        flexGrow={1}
        width='100px'
        id={this.props.id}
        className={[
            'box',
            this.props.classes,
            ((this.state.clicked) ? 'clicked' : '')
          ].join(' ') }
        onClick={this.handleClick}>
       {this.props.content}
      </Flexbox>
    );
  }
}

function winq(arr, dimensions) {
  var win = false;
  const r = [];
  const c = [];
  for (var i = 0; i < dimensions; i ++) {
    r.push(0);
    c.push(0);
  }

  var diagonalR = 0;
  var diagonalL = 0;

  arr.forEach(i => {
    const split = i.split('!').map(a => {return +a});
    if (split[0] === split[1]) diagonalL += 1;
    if (split[0] + split[1] === (dimensions -1)) diagonalR += 1;

    r[split[0]] += 1;
    c[split[1]] += 1;
  });

  if (diagonalL === dimensions || diagonalR === dimensions) return true;

  for (i = 0; i < dimensions; i ++) {
    if (r[i] === dimensions || c[i] === dimensions) return true;
  }
  return win;
}

function shuffle (array) {
  var i = 0,
    j = 0,
    temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

export default App;
