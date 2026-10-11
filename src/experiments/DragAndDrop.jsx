import { useState } from 'react';


const DragAndDrop = () => {
    const[grabbed, setGrabbed] = useState(null);
    const[announce, setAnnounce] = useState('');

    const grabItem = (event, item) => {        
        if(event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if(!grabbed) {
                setGrabbed(event.target);
                event.target.classList.add('active');
                setAnnounce(`Picked up ${item}. Use command + arrow keys to move.`);
            } else {
                event.target.classList.remove('active');
                setAnnounce(`${item} dropped.`);
                setGrabbed(null);
            }
        }
    
        if(grabbed && (event.metaKey || event.ctrlKey) && (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowRight')) {
            event.preventDefault();
            const sibling = (event.key === 'ArrowUp' || event.key === 'ArrowLeft') ? event.target.previousElementSibling : event.target.nextElementSibling;
            if(sibling) {
                document.querySelector('#fruits-list-div').insertBefore(event.target, (event.key === 'ArrowUp' || event.key === 'ArrowLeft') ? sibling : sibling.nextElementSibling);
                const prev = event.target.previousElementSibling;
                const next = event.target.nextElementSibling;
                const prevText = prev ? prev.querySelector('span')?.textContent : 'none';
                const nextText = next ? next.querySelector('span')?.textContent : 'none';
                setAnnounce(`${item} moved ${(event.key === 'ArrowUp' || event.key === 'ArrowLeft') ? 'up' : 'down'}. ${(prev && next) ? `Currently between ${prevText} and ${nextText}.` : ''} ${(prev && !next) ? `Currently below ${prevText}.` : ''} ${(!prev && next) ? `Currently above ${nextText}.` : ''}`);
                event.target.focus();
            }
        }
    }

  return (
    <div className="max-w-[700px] m-auto">
        <ul role='listbox' aria-label='Reorder fruits' id="fruits-list-div">
            <li className='drag-and-drop-item mt-3 py-1 px-3 flex items-center gap-2' role="option" tabIndex={0} onKeyDown={(event) => grabItem(event, 'Mango')}>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" id="reorder">
                    <path fill="#111" fillRule="evenodd" d="M19.75 10C19.75 10.4142 19.4142 10.75 19 10.75H11C10.5858 10.75 10.25 10.4142 10.25 10 10.25 9.58579 10.5858 9.25 11 9.25H19C19.4142 9.25 19.75 9.58579 19.75 10zM7.75 10C7.75 10.4142 7.41421 10.75 7 10.75H5C4.58579 10.75 4.25 10.4142 4.25 10 4.25 9.58579 4.58579 9.25 5 9.25H7C7.41421 9.25 7.75 9.58579 7.75 10zM4.25 18C4.25 18.4142 4.58579 18.75 5 18.75H13C13.4142 18.75 13.75 18.4142 13.75 18 13.75 17.5858 13.4142 17.25 13 17.25H5C4.58579 17.25 4.25 17.5858 4.25 18zM16.25 18C16.25 18.4142 16.5858 18.75 17 18.75H19C19.4142 18.75 19.75 18.4142 19.75 18 19.75 17.5858 19.4142 17.25 19 17.25H17C16.5858 17.25 16.25 17.5858 16.25 18zM19.75 14C19.75 14.4142 19.4142 14.75 19 14.75H5C4.58579 14.75 4.25 14.4142 4.25 14 4.25 13.5858 4.58579 13.25 5 13.25H19C19.4142 13.25 19.75 13.5858 19.75 14zM19.75 6C19.75 6.41421 19.4142 6.75 19 6.75H5C4.58579 6.75 4.25 6.41421 4.25 6 4.25 5.58579 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 5.58579 19.75 6z" clipRule="evenodd"></path>
                </svg>
                <span className='text-sm font-semibold'>Mango</span>
            </li>
            <li className='drag-and-drop-item mt-3 py-1 px-3 flex items-center gap-2' role="option" tabIndex={0} onKeyDown={(event) => grabItem(event, 'Orange')}>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" id="reorder">
                    <path fill="#111" fillRule="evenodd" d="M19.75 10C19.75 10.4142 19.4142 10.75 19 10.75H11C10.5858 10.75 10.25 10.4142 10.25 10 10.25 9.58579 10.5858 9.25 11 9.25H19C19.4142 9.25 19.75 9.58579 19.75 10zM7.75 10C7.75 10.4142 7.41421 10.75 7 10.75H5C4.58579 10.75 4.25 10.4142 4.25 10 4.25 9.58579 4.58579 9.25 5 9.25H7C7.41421 9.25 7.75 9.58579 7.75 10zM4.25 18C4.25 18.4142 4.58579 18.75 5 18.75H13C13.4142 18.75 13.75 18.4142 13.75 18 13.75 17.5858 13.4142 17.25 13 17.25H5C4.58579 17.25 4.25 17.5858 4.25 18zM16.25 18C16.25 18.4142 16.5858 18.75 17 18.75H19C19.4142 18.75 19.75 18.4142 19.75 18 19.75 17.5858 19.4142 17.25 19 17.25H17C16.5858 17.25 16.25 17.5858 16.25 18zM19.75 14C19.75 14.4142 19.4142 14.75 19 14.75H5C4.58579 14.75 4.25 14.4142 4.25 14 4.25 13.5858 4.58579 13.25 5 13.25H19C19.4142 13.25 19.75 13.5858 19.75 14zM19.75 6C19.75 6.41421 19.4142 6.75 19 6.75H5C4.58579 6.75 4.25 6.41421 4.25 6 4.25 5.58579 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 5.58579 19.75 6z" clipRule="evenodd"></path>
                </svg>
                <span className='text-sm font-semibold'>Orange</span>
            </li>
            <li className='drag-and-drop-item mt-3 py-1 px-3 flex items-center gap-2' role="option" tabIndex={0} onKeyDown={(event) => grabItem(event, 'Apple')}>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" id="reorder">
                    <path fill="#111" fillRule="evenodd" d="M19.75 10C19.75 10.4142 19.4142 10.75 19 10.75H11C10.5858 10.75 10.25 10.4142 10.25 10 10.25 9.58579 10.5858 9.25 11 9.25H19C19.4142 9.25 19.75 9.58579 19.75 10zM7.75 10C7.75 10.4142 7.41421 10.75 7 10.75H5C4.58579 10.75 4.25 10.4142 4.25 10 4.25 9.58579 4.58579 9.25 5 9.25H7C7.41421 9.25 7.75 9.58579 7.75 10zM4.25 18C4.25 18.4142 4.58579 18.75 5 18.75H13C13.4142 18.75 13.75 18.4142 13.75 18 13.75 17.5858 13.4142 17.25 13 17.25H5C4.58579 17.25 4.25 17.5858 4.25 18zM16.25 18C16.25 18.4142 16.5858 18.75 17 18.75H19C19.4142 18.75 19.75 18.4142 19.75 18 19.75 17.5858 19.4142 17.25 19 17.25H17C16.5858 17.25 16.25 17.5858 16.25 18zM19.75 14C19.75 14.4142 19.4142 14.75 19 14.75H5C4.58579 14.75 4.25 14.4142 4.25 14 4.25 13.5858 4.58579 13.25 5 13.25H19C19.4142 13.25 19.75 13.5858 19.75 14zM19.75 6C19.75 6.41421 19.4142 6.75 19 6.75H5C4.58579 6.75 4.25 6.41421 4.25 6 4.25 5.58579 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 5.58579 19.75 6z" clipRule="evenodd"></path>
                </svg>
                <span className='text-sm font-semibold'>Apple</span>
            </li>
        </ul>

        <span className='sr-only' role="status" aria-live='assertive'>{announce}</span>
    </div>
  )
}

export default DragAndDrop