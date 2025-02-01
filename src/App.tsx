
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import iconPulse from './assets/icons8-pulse.png';
import './App.css'
import HealthcareLocator from './components/HealthcareLocator'
import SymptomsChecker from './components/SymptomsChecker'

function App() {

  return (
    <div>
      <header>
        <img src={iconPulse} alt="Pulse Icon"/>
        <h1>SymptoScan</h1>
      </header>
      
      <SymptomsChecker />
      <HealthcareLocator />
    </div>
  )
}

export default App
