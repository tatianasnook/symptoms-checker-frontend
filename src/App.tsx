// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import './App.css'
import HealthcareLocator from './components/HealthcareLocator'
import SymptomsChecker from './components/SymptomsChecker'

function App() {

  return (
    <>
     <h1>SymptoScan</h1>
     <SymptomsChecker />
     <HealthcareLocator />
    </>
  )
}

export default App
