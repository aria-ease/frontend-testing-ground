import { useState, useEffect } from 'react';
import { checkedSvg, unCheckedSvg } from './text'; 
import * as Radio from "aria-ease/radio";
import "../../styles/onboard.css";

const RadioComponent = () => {
    const [checkedStates, setCheckedStates] = useState(Array.from({ length: 2 }, () => (false)));

    useEffect(() => {
        const radioInstance = Radio.makeRadioAccessible({
            radioGroupId: 'radio-div',
            radiosClass: 'card',
            callback: {
                onValueChange: (index) => {
                    console.log('Changing', index);
                    setCheckedStates([index === 0, index === 1]);
                }
            }
        });

        return () => radioInstance.cleanup();
    }, []);

  return (
    <div className='page h-[100vh]'>
        <div className='h-[100vh] flex flex-col item-center justify-center px-[50px] relative'>
            <a href="#" className='absolute top-10 left-10'>Logo</a>
            <div className="flex flex-col gap-4" id="radio-div">
                <input id="adminRadio" name="adminRadio" type="radio" className="radio"/>
                <label className={`card ${checkedStates[0] && "card-checked"}`} htmlFor="adminRadio" aria-label="Start a business">
                    {checkedStates[0] ? 
                        <img src={checkedSvg} alt="" className="radio-icon" aria-hidden="true"/> :
                        <img src={unCheckedSvg} alt="" className="radio-icon" aria-hidden="true"></img>
                    }
                    
                    <div className="card-details">
                        <h3>Start a business</h3>
                        <p className='mt-3 mb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </label>

                <input name="userRadio" id="userRadio" type="radio" className="radio"/>
                <label className={`card ${checkedStates[1] && "card-checked"}`} htmlFor="userRadio" aria-label="Find a merchant">    
                    {checkedStates[1] ? 
                        <img src={checkedSvg} alt="" className="radio-icon" aria-hidden="true"/> :
                        <img src={unCheckedSvg} alt="" className="radio-icon" aria-hidden="true"></img>
                    }
                    
                    <div className="card-details">
                        <h3>Find a merchant</h3>
                        <p className='mt-3 mb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </label>

                <button onClick={() => alert('Button clicked')} className='create-button bg-[teal] rounded-md py-2 flex item-center justify-center text-white text-sm font-semibold mt-5' aria-disabled={(checkedStates[0] || checkedStates[1]) ? false : true}>Create your account</button>
            </div>
        </div>

        <div className='image-div'></div>
    </div>
  )
}

export default RadioComponent