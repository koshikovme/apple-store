import React, {useState} from 'react';
import Header from "./components/layouts/Header";
import Jumbotron from "./components/layouts/Jumbotron";
import Catalog from "./components/layouts/Catalog";
import Footer from "./components/layouts/Footer";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./components/context";


function App() {
  return (

      <div className="App">
       <AuthContext.Provider value={{
       }}>
           <AppRouter/>
           <Jumbotron/>
           <Catalog/>
           <Footer/>
       </AuthContext.Provider>
      </div>
  );
}

export default App;