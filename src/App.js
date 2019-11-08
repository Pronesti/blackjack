import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import TopBar from './components/TopBar';
import PopUp from './components/PopUp';
import BlackJack from './views/BlackJack';

function App() {
  return (
    <div>
      <TopBar />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={BlackJack} />
        </Switch>
      </BrowserRouter>
      <PopUp />
    </div>
  );
}

export default App;
