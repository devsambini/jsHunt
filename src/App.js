import React from 'react';



//CSS default
import './styles.css'

// Components
import Header from './components/Header';
import Main from './pages/main';

const App = () => (
  <div className="App">
    <Header />
    <Main />
  </div>
)

export default App