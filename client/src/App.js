import React from 'react';

import { Header } from './components/Header';
import { Auction } from './components/Auction';
import { Footer } from './components/Footer';

function App(onMount) {
  return (
    <div className="wrapper">
      <Header />
      <main className="page">

        <div className="auction">
          <Auction />
        </div>

      </main>
      <Footer />
    </div>

  );
}

export default App;
