import { useEffect } from 'react';
import * as Toggle from 'aria-ease/toggle';

const Toggles = () => {
    useEffect(() => {
    const toggleInstance = Toggle.makeToggleAccessible({
        toggleId: 'toggle-div',
        togglesClass: 'group-toggle-button',
        isSingleToggle: false,  // Set to true for single toggle button
        callback: {
          onPressedChange: (index, pressed) => {
            console.log(`Toggle at index ${index} has pressed of ${pressed}`);
          }
        }
    });

    // Clean up on unmount
    return () => toggleInstance.cleanup();
    }, []);

  return (
    <div id='toggle-div'>
        <button className='group-toggle-button block-interactive-items'>Mute notification</button>
        <button className='group-toggle-button block-interactive-items'>Dark mode</button>
        <button className='group-toggle-button block-interactive-items'>Enable 2FA</button>
    </div>
  )
}

export default Toggles