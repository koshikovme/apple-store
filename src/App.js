import React, {useState} from 'react';
import Header from "./components/layouts/Header";
import Jumbotron from "./components/layouts/Jumbotron";
import Catalog from "./components/layouts/Catalog";
import Footer from "./components/layouts/Footer";
import AppRouter from "./components/AppRouter";

function App() {
  return (
      <div className="App">
          <AppRouter/>
        <Jumbotron/>
        <Catalog/>
        <Footer/>
      </div>
  );
}

export default App;