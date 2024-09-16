import './App.css'
import CodeBlock from './Components/codeBlock'
import Hero from './Components/hero'
import Navbar from './Components/navabr'

function App() {

  return (
    <>
    <div className='bg-[rgb(25,25,25)] p-5 h-screen overflow-y-scroll items-center flex flex-col'>
      <Navbar/>
      <Hero/>
      <div className='w-full grid grid-cols-2'>
        <CodeBlock/>
      </div>
    </div>
    </>
  )
}

export default App
