export default function CodeBlock() {
  return (
    <>
    <div className="border-[1px] border-[rgb(41,41,41)] w-full rounded-md">
        <div className="bg-[rgb(21,21,21)] rounded-t-md">
            <p className="text-white px-2 font-mono text-[.8rem]">/src/app.tsx</p>
        </div>
        <div className="p-3 bg-black rounded-b-md">
            <p className="text-green-300 break-words">
              <p>import memoryState from 'memoryState'</p>
              <br/>
              <p>// Setting state</p>
              <p>memoryState.setState('userName', 'John Doe');</p>
              <br/>
              <p>// Getting state</p>
              <p>const userName = memoryState.getState('userName');</p>
              <p></p>
            </p>
        </div>
    </div>
    </>
  )
}
