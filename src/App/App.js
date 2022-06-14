import React from 'react'
import './App.css'
import {Navbar, Header, About, Works, Contact, Projects} from '../components'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Works />
      <Projects />
      <Contact />
    </div>
  )
}

export default App