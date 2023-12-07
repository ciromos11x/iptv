import React from 'react';
import IPTVPlaylistFetcher from './IPTVPlaylistFetcher';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {


  return (
    <Router>
      <IPTVPlaylistFetcher />
    </Router>
  );
}

export default App;