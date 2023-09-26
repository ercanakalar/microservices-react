import React from 'react';
import './App.css';

import AppRouting from './AppRouting';
import Header from './features/header/header';

function App() {
  return (
    <div>
      <Header>
        <AppRouting />
      </Header>
    </div>
  );
}

export default App;
