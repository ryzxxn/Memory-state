import './App.css'
import CodeBlock from './Components/codeBlock'
import Documentation from './Components/documentation'
import Hero from './Components/hero'
import Navbar from './Components/navabr'

function App() {

  return (
    <>
    <div className='bg-[rgb(25,25,25)] p-5 h-screen overflow-y-scroll items-center flex flex-col'>
      <Navbar/>
      <Hero/>
      {/* <p className='text-left text-white text-[1.4rem]'>Documentation</p>
      <Documentation/> */}
      <div className='w-full'>
        <CodeBlock/>
      </div>
    </div>
    </>
  )
}

export default App
