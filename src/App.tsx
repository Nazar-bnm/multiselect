import React from 'react';
import logo from './logo.svg';
import './App.css';

import MultiselectSearchExample from './Examples/MultiselectSearchExample'
import MultiselectSelectAllExample from './Examples/MultiselectSelectAllExample'
import My from './Examples/My'

function App() {
  return (
    <div className="App">
      <MultiselectSearchExample />

      <br />

      <MultiselectSelectAllExample />

      <br />

      <My />
    </div>
  );
}

export default App;
