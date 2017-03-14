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
      <Flexbox flexGrow={1} width='100px' className={['box', this.props.classes, ((this.state.clicked) ? 'clicked' : '')].join(' ') } onClick={this.handleClick}>
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
      // if it is the center box, make it a star
      if (row === 2 && column === 2) {
        boxes.push(<Box content={<img src={star} alt='star' />} key={row + '!' + column} classes='free' />);
      } else {
        // randomize the categories
        var idx = Math.floor(Math.random() * (categories.length - 0)) + 0;
        boxes.push(< Box content={(categories.splice(idx, 1)[0] || 'nope')} key={row + '!' + column} classes='' />);
      } 
    }
    rows.push(
      <Flexbox flexDirection='row' height='120px' key={row} className='row'>
        {boxes}
      </Flexbox>
    );
  }
  return rows;
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2> <span className='yellow'>____</span> on a <img src={scooter} id='scooter' alt='scooter' /> <span className='small-caps'>bingo</span></h2>
        </div>
        <div id='board'>
          { build() }
        </div>
        <div id='explanations'>
          <div id='rules'>

            <h2 className='yellow'>rules</h2>
            <ul className='list'>
              <li><p><span className='bold'>Standard Bingo rules</span> — continue playing until one player has covered a vertical, horizontal, or diagonal pattern of five grid spaces on their card. First player to get Bingo wins the game.</p></li>
              <li><p><span className='bold'>Combos are cool</span> — you see a family of four with their pet dog, mark both categories, you see a dude on a moto with a tree without headlights? You get both.</p></li>
              <li><p><span className='bold'>Winner of the game buys the beers that night</span> — why not the loser? Because the winner was the lucky duck who saw all this magic.</p></li>

              <li><p><span className='bold'>This game never really ends</span></p></li>
            </ul>
          </div>

          <div>
          <h2 className='yellow'>what is this?</h2>
            <ul className='list'>
              <li><p>In Vietnam, motorbikes are the main form of transportation, and out of necessity and in lieu of pick up trucks, people pack all sorts of stuff on their motos.</p></li>
              <li><p><a href='http://there.today'>Ryan and Camille</a> spent 4 weeks motorbiking from Saigon to Hanoi, and would play a version of this game at every coffee break ('DID YOU SEE THAT??'), so <a href='http://github.com/camilleanne/'>Camille</a> codified it into a game.</p></li>
              <li><p><span className='bold'>Why does the game board shuffle on every refresh?</span> — chances are you are playing this with someone who is riding through Vietnam with you, and is probably seeing the same road nonsense you are, and it would be a boring game if you both had the same board, so the randomized board gives someone an actual chance of winning, instead of eternal ties. Enjoy the chaos, it's why you are driving through South East Asia on a 2 wheeled death machine anyways, right?</p></li>
              <li><p>Pass on suggestions for more bingo boxes on <a href='https://github.com/camilleanne/motobingo/issues/1'>github</a></p></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;



