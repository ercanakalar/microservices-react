import React from 'react';
import './App.css';

import AppRouting from './AppRouting';
import Header from './features/header/header';

function App() {
  return (
    <>
      <Header>
        <AppRouting />
      </Header>
    </>
  );
}

export default App;
