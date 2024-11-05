// src/App.js
import React from 'react';
import Header from './components/Header';  // Make sure the path is correct
// Remove this line if you're not using FontAwesomeIcon in App.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add Font Awesome icons to the library
library.add(fas);

function App() {
  return (
    <div className="App">
      <Header />
      {/* Other components */}
    </div>
  );
}

export default App;