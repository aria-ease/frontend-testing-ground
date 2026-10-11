import '../styles/onboard.css';
import { useState } from 'react';
import { checkedSvg, unCheckedSvg } from './text';


const Onboard = () => {
    const[adminSelected, setAdminSelected] = useState(false);
    const[userSelected, setUserSelected] = useState(false);

    const handleAdminSelect = () => {
        setAdminSelected(true);
        setUserSelected(false);
    }

    const handleUserSelect = () => {
        setAdminSelected(false);
        setUserSelected(true);
    }
  return (
    <div className='page h-[100vh]'>
        <div className='h-[100vh] flex flex-col item-center justify-center px-[50px] relative'>
            <a href="#" className='absolute top-10 left-10'>Logo</a>
            <div className="flex flex-col gap-4">
                <label className={`card ${adminSelected && "card-checked"}`} onClick={() => handleAdminSelect()}>
                    <input name="plan" type="radio" checked="true" className="radio"/>
                    <div className="radio-unchecked"></div>
                    {adminSelected ? 
                        <img src={checkedSvg} alt="radio unchecked" className="radio-icon"/> :
                        <img src={unCheckedSvg} alt="radio unchecked" className="radio-icon"></img>
                    }
                    <div className="card-details">
                        <h3>Start a business</h3>
                        <p className='mt-3 mb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </label>

                <label className={`card ${userSelected && "card-checked"}`} onClick={() => handleUserSelect()}>
                    {userSelected ? 
                        <img src={checkedSvg} alt="radio unchecked" className="radio-icon"/> :
                        <img src={unCheckedSvg} alt="radio unchecked" className="radio-icon"></img>
                    }
                    <input name="plan" type="radio" className="radio"/>
                    <div className="card-details">
                        <h3>Find a merchant</h3>
                        <p className='mt-3 mb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </label>

                <button className='create-button bg-[teal] rounded-md py-2 flex item-center justify-center text-white text-sm font-semibold mt-5' disabled={(userSelected || adminSelected) ? false : true}>Create your account</button>
            </div>
            <p className='text-xs text-gray-500 mt-4'>By clicking the button above, you agree to our <a href="#" className='underline'>Terms and Conditions</a></p>
        </div>

        <div className='image-div'></div>
    </div>
  )
}

export default Onboard