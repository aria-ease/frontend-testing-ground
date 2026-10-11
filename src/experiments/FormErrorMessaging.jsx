import { useState } from "react";

const FormErrorMessaging = () => {
    const[error, setError] = useState('');

    const[email, setEmail] = useState('');
    const[emailAddressIsInvalid, setEmailAddressIsInvalid] = useState(false);
    const[emailError, setEmailError] = useState('');
    const[emailHasSubmissionError, setEmailHasSubmissionError] = useState(false);

    const[password, setPassword] = useState('');
    const[passwordError, setPasswordError] = useState('');
    const[passwordHasSubmissionError, setPasswordHasSubmissionError] = useState(false);
    const[isPasswordVisible, setIsPasswordVisible] = useState(false);

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validateAndLogin = (event) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');
        setError('');
        if(email === '') {
            setEmailHasSubmissionError(true);
            setEmailError('Email field is empty.');
        } 
        if(password === '') {
            setPasswordHasSubmissionError(true);
            setPasswordError('Password field is empty.');
        }
        if(email !== '') {
            if(!validateEmail(email)) {
                setEmailAddressIsInvalid(true);
                setEmailError('Email is not a valid email format.');
            }
        }
        if(email !== '' && validateEmail(email) && password !== '') {
            if(email !== 'tldr01@gmail.com' || password !== 'jamesbond007') {
                setError('Incorrect email or password.');
            } else if(email === 'tldr01@gmail.com' && password === 'jamesbond007') {
                setError('');
                alert('Logging in');
            }
        }
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

  return (
    <div id='page-div'>
        <div className='form-div w-full h-full overflow-auto'>
                <p className='text-center roboto font-bold text-2xl pb-10'>Welcome back</p>
                <div aria-live="polite" role="status" className="text-center text-red-600 max-w-xs mx-auto mb-5">{error}</div>
                <form onSubmit={validateAndLogin} className='form-inner-div mr-auto ml-auto'>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <div className={`input-div ${(emailHasSubmissionError || emailAddressIsInvalid) ? 'error' : undefined} flex justify-between gap-2 pt-2 pr-2 pl-2 pb-2 mt-1`}>
                            <input placeholder='Enter email' name='email' autoComplete='email' className='block-interactive w-full p-1' type='text' value={email} onChange={(event) => { setEmail(event.target.value); if(emailHasSubmissionError){setEmailHasSubmissionError(false);} if(emailAddressIsInvalid && validateEmail(event.target.value)){setEmailAddressIsInvalid(false);} if(emailAddressIsInvalid && !validateEmail(event.target.value)){setEmailAddressIsInvalid(true);}} } aria-label='Enter email' aria-describedby="emailError" aria-invalid={`${emailAddressIsInvalid || emailHasSubmissionError ? 'true' : 'false'}`}></input>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="vuesax/linear/sms">
                                <g id="sms">
                                <path id="Vector" d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#132A59" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Vector_2" d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="#132A59" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                </g>
                            </svg>
                        </div>
                        <span id="emailError" aria-live="polite" role="status" className="text-center text-red-600">{(emailHasSubmissionError || emailAddressIsInvalid) && (`${emailError}`)}</span>
                    </div>
                    <div className='mt-6'>
                        <label>Password</label>
                        <div className={`input-div ${passwordHasSubmissionError ? 'error' : undefined} flex justify-between gap-2 pt-2 pr-2 pl-2 pb-2 mt-1`}>
                            <input placeholder='Enter password' className='block-interactive w-full p-1' type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={(event) => { setPassword(event.target.value); if(passwordHasSubmissionError){setPasswordHasSubmissionError(false)} }} aria-label='Enter password' aria-describedby="passwordError" aria-invalid={`${passwordHasSubmissionError ? 'true' : 'false'}`}></input>
                            {isPasswordVisible ?
                                <button onClick={togglePasswordVisibility} className="block-interactive password-visibility-button backgroundless-button" aria-label="Show Password">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M17.8201 5.77047C16.0701 4.45047 14.0701 3.73047 12.0001 3.73047C8.47009 3.73047 5.18009 5.81047 2.89009 9.41047C1.99009 10.8205 1.99009 13.1905 2.89009 14.6005C3.68009 15.8405 4.60009 16.9105 5.60009 17.7705" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.41992 19.5297C9.55992 20.0097 10.7699 20.2697 11.9999 20.2697C15.5299 20.2697 18.8199 18.1897 21.1099 14.5897C22.0099 13.1797 22.0099 10.8097 21.1099 9.39969C20.7799 8.87969 20.4199 8.38969 20.0499 7.92969" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9.47 14.5303L2 22.0003" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 2L14.53 9.47" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button> :
                                <button onClick={togglePasswordVisibility} className="block-interactive password-visibility-button backgroundless-button" aria-label="Hide Password">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none">
                                        <path d="M12.9833 9.99993C12.9833 11.6499 11.6499 12.9833 9.99993 12.9833C8.34993 12.9833 7.0166 11.6499 7.0166 9.99993C7.0166 8.34993 8.34993 7.0166 9.99993 7.0166C11.6499 7.0166 12.9833 8.34993 12.9833 9.99993Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9.99987 16.8913C12.9415 16.8913 15.6832 15.1579 17.5915 12.1579C18.3415 10.9829 18.3415 9.00794 17.5915 7.83294C15.6832 4.83294 12.9415 3.09961 9.99987 3.09961C7.0582 3.09961 4.31654 4.83294 2.4082 7.83294C1.6582 9.00794 1.6582 10.9829 2.4082 12.1579C4.31654 15.1579 7.0582 16.8913 9.99987 16.8913Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            }
                        </div>
                        <span id="passwordError" aria-live="polite" role="status" className="text-center text-red-600">{passwordHasSubmissionError && (`${passwordError}`)}</span>
                    </div>
                    <p className='mt-2 mb-0 text-right'><button className='primary-blue-text block-interactive backgroundless-button' aria-label='Navigate to forgot password page'>Forgot password?</button></p>
                    <button className='rounded-lg bg-blue-500 text-white block-interactive mt-6 w-full pt-2 pb-2 font-medium' type="submit">Login</button>
                </form>
            </div>
    </div>
  )
}

export default FormErrorMessaging