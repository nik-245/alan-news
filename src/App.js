import React , {useEffect} from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';

const alankey = '7cdbe3bd8bd21fc4d5f532b79da390c52e956eca572e1d8b807a3e2338fdd0dc/stage';
function App() {
  useEffect(() => {
     alanBtn({
       key : alankey,
       onCommand : ({command})=>{
          if(command === 'testCommand'){
            alert('this command are done');
          }
       }
     })
  }, [])
  return (
    <>
      <h1>Alan AI news application</h1>
    </>
  );
}

export default App;
