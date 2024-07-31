import { useState,useCallback, useEffect} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [num, setNum]=useState(false)
  const [char, setChar]=useState(false)
  const [pass, setPass]=useState()

  const passgen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(num){
      str=str+"0123456789"
    }
    if(char){
      str=str+"!@#$%^&*()_"
    }

    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass=pass+str.charAt(char)
    }
    setPass(pass)

  },[length,num,char,setPass])

  const copyPassToClip=useCallback(()=>{
    window.navigator.clipboard.writeText(pass)
    alert("Password Copied ✅")
  },[pass])

  useEffect(()=>{
    passgen()
  },[length,num,char,passgen])

  return (
    <>
    <div id='body'>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg m-20 text-orange-500 bg-teal-950 p-4">

        <div className="header">
          <h1 className='justify-center flex shadow rounded-lg overflow-hidden p-2 bg-teal-900'>Password Generator</h1>
        </div>

        <div className="flex body ">
          <input type="text" value={pass} className='p-area outline-none w-full py-1 px-3' placeholder='Password' readOnly />
          <button className='c-btn outline-none bg-blue-800 text-white' onClick={copyPassToClip}>Copy</button>
        </div>

        <div className="lower-body flex flex-wrap text-sm gap-x-2">

          <div className='flex flex-wrap items-center gap-x-1'>
            <input type="range" min={6} max={50} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
              <label>Length : {length} </label>
          </div>
          <div className='flex flex-wrap items-center gap-x-1'>
            <input type="checkbox" defaultChecked={num} id='numberInput' className='cursor-pointer' onChange={(e)=>{setNum((prev)=>!prev)}} />
              <label>Numbers</label>
          </div>
          <div className='flex flex-wrap items-center gap-x-1'>
            <input type="checkbox" defaultChecked={char} id='numberInput' className='cursor-pointer' onChange={(e)=>{setChar((prev)=>!prev)}}  />
              <label>Characters</label>
          </div>

        </div>  
      </div>
    </div>
    </>
  )
}

export default App
