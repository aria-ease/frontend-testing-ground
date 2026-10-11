import { useState, useEffect, useRef } from 'react';
import * as AriaEase from 'aria-ease';

const DynamicUIAnnouncing = () => {
    const[dialog, setDialog] = useState(false);
    const[toast, setToast] = useState(false);
    const[deleteToast, setDeleteToast] = useState(false);
    const[announce, setAnnounce] = useState('');

    useEffect(() => {
        if (toast || deleteToast) {
            if (toast) {
                setAnnounce('Your setting has been updated');
            }
            if (deleteToast) {
                setAnnounce('Your profile has been deleted');
            }

            setTimeout(() => {
                if (toast) {
                    setToast(false);
                }
                if (deleteToast) {
                    setDeleteToast(false);
                }
                setAnnounce('');
            }, 3000);
        }
    }, [toast, deleteToast]);

    const menuRef = useRef();

    useEffect(() => {
        menuRef.current = AriaEase.makeMenuAccessible({
        menuId: "merchant-dropdown-menu",
        menuElementsClass: "profile-menu-item",
        triggerId: "header-merchant-profile-button"
        });
    }, [])

    const displayMenu = () => {
        const menuDiv = document.querySelector("#merchant-dropdown-menu");
        if (getComputedStyle(menuDiv).display === "none") {
        menuRef.current.openMenu();
        } else {
        menuRef.current.closeMenu();
        }
    };

    useEffect(() => {
        function initBlock() {
            AriaEase.makeBlockAccessible({ blockId: 'body-div', blockItemsClass: 'block-interactive' });
        }

        initBlock();
    }, [])

    const mainBlockCleanupRef = useRef(null);

    useEffect(() => {
        mainBlockCleanupRef.current = AriaEase.makeBlockAccessible({ blockId: 'body-div', blockItemsClass: 'block-interactive' });
        return () => {
            if (mainBlockCleanupRef.current) {
                mainBlockCleanupRef.current();
                mainBlockCleanupRef.current = null;
            }
        };
    }, []);

    const focusDialogTrigger = () => {
        document.querySelector('.delete-profile').focus();
    }

    useEffect(() => {
        if (dialog) {
            if (mainBlockCleanupRef.current) {
                mainBlockCleanupRef.current();
                mainBlockCleanupRef.current = AriaEase.makeBlockAccessible({ blockId: 'search-result-container-overlay', blockItemsClass: 'dialog-block-interactive' });
                const dialog = document.querySelector('.search-result-container-overlay');
                const elements = dialog.querySelectorAll('.dialog-block-interactive');
                elements[0].focus();
            }
        } else {
            if (!mainBlockCleanupRef.current) {
                mainBlockCleanupRef.current = AriaEase.makeBlockAccessible({ blockId: 'body-div', blockItemsClass: 'block-interactive' });
            }
        }

        const handleGlobalKeyDown = (event) => {
            if(dialog) {
                if (event.key === 'Escape') {
                    event.preventDefault(); 
                    setDialog(false); 
                    focusDialogTrigger();
                    return;
                }
                if (event.key === 'Tab') {
                    const focusedElement = document.activeElement;
                    if (focusedElement?.classList.contains('dialog-block-interactive')) {
                        event.preventDefault();
                        const dialogItems = document.querySelectorAll('.dialog-block-interactive');
                        const currentIndex = Array.from(dialogItems).indexOf(document.activeElement);
                        if (event.shiftKey) {
                            if (currentIndex <= 0 || currentIndex === -1) {
                                dialogItems[dialogItems.length - 1]?.focus();
                            } else {
                                dialogItems[currentIndex - 1]?.focus();
                            }
                         } else {
                            if (currentIndex === dialogItems.length - 1 || currentIndex === -1) {
                                dialogItems[0]?.focus();
                            } else {
                                dialogItems[currentIndex + 1]?.focus();
                            }
                        }
                    }
                }
            }
        }
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [dialog]);

  return (
    <div id='body-div'>
        <div className='h-[56px] flex items-center justify-between px-2'>
            <button className='text-sm mt-4 rounded-lg px-4 py-2 border flex items-center justify-center block-interactive delete-profile' onClick={() => setDialog(true)}>Delete Profile</button>
            <button className='text-sm mt-4 rounded-lg px-4 py-2 border flex items-center justify-center block-interactive' onClick={() => setToast(true)}>Update Profile Settings</button>
            <div>
                <button id="header-merchant-profile-button" className='text-sm mt-4 rounded-lg px-4 py-2 border flex items-center justify-center block-interactive' onClick={displayMenu} aria-haspopup="true" aria-expanded="false" aria-controls="merchant-dropdown-menu">Display Profile Menu</button>
                <div className="merchant-dropdown-menu" id="merchant-dropdown-menu" aria-labelledby="header-merchant-profile-button" role="menu" style={{display: "none"}}>
                    <div className="merchant-dropdown-menu-inner-padded-div">
                        <div className="merchant-dropdown-menu-merchant-profile-div">
                            <div className="merchant-dropdown-menu-merchant-profile-grid-div">
                                <div className="merchant-dropdown-menu-merchant-profile-image-div flex items-center justify-center">
                                    <span>DC</span>
                                </div>
                                <span className="merchant-dropdown-menu-merchant-name">Davii Collections</span>
                            </div>
                            <svg width="10.67" height="7.33" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.3332 1L3.99984 8.33333L0.666504 5" stroke="#303030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <a href="https://admin.shopify.com" className="merchant-dropdown-menu-all-stores-link profile-menu-item" role="menuitem">
                            <svg width="20" height="20" viewBox="0 0 21 20" fill="rgba(48, 48, 48, 1)" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.757 3H7.24302C6.85944 3 6.4971 3.17611 6.26012 3.47772L3.87394 6.51468C3.63169 6.823 3.5 7.20375 3.5 7.59586V8.25C3.5 9.31867 4.10958 10.245 5 10.7001V15.25C5 16.2165 5.7835 17 6.75 17H14.25C15.2165 17 16 16.2165 16 15.25V10.7001C16.8904 10.245 17.5 9.31867 17.5 8.25V7.76879C17.5 7.26465 17.3307 6.77511 17.0192 6.3787L14.7399 3.47772C14.5029 3.17611 14.1406 3 13.757 3ZM13.5 15.5H14.25C14.3881 15.5 14.5 15.3881 14.5 15.25V11C13.712 11 13.0014 10.6686 12.5 10.1375C11.9986 10.6686 11.288 11 10.5 11C9.71199 11 9.00138 10.6686 8.5 10.1375C7.99862 10.6686 7.28801 11 6.5 11V15.25C6.5 15.3881 6.61193 15.5 6.75 15.5H10.5V13C10.5 12.4477 10.9477 12 11.5 12H12.5C13.0523 12 13.5 12.4477 13.5 13V15.5ZM6.5 9.5H6.25C5.55964 9.5 5 8.94036 5 8.25V7.59586C5 7.53985 5.01881 7.48545 5.05342 7.44141L7.36453 4.5H13.6355L15.8397 7.30543C15.9436 7.43757 16 7.60075 16 7.76879V8.25C16 8.94036 15.4404 9.5 14.75 9.5H14.5C13.8096 9.5 13.25 8.94036 13.25 8.25V7.75C13.25 7.33579 12.9142 7 12.5 7C12.0858 7 11.75 7.33579 11.75 7.75V8.25C11.75 8.94036 11.1904 9.5 10.5 9.5C9.80964 9.5 9.25 8.94036 9.25 8.25V7.75C9.25 7.33579 8.91421 7 8.5 7C8.08579 7 7.75 7.33579 7.75 7.75V8.25C7.75 8.94036 7.19036 9.5 6.5 9.5Z" fill="rgba(48, 48, 48, 1)"/>
                            </svg>
                            <span className="merchant-dropdown-menu-link-text">All stores</span>
                        </a>
                    </div>
                    <hr className="merchant-dropdown-menu-hr"/>
                    <div className="merchant-dropdown-menu-inner-padded-div">
                        <a href="https://admin.shopify.com" className="merchant-dropdown-menu-plain-link merchant-dropdown-menu-link-text profile-menu-item" role="menuitem">Help Center</a>
                        <a href="https://admin.shopify.com" className="merchant-dropdown-menu-plain-link merchant-dropdown-menu-link-text profile-menu-item" role="menuitem">Changelog</a>
                        <a href="https://admin.shopify.com" className="merchant-dropdown-menu-plain-link merchant-dropdown-menu-link-text profile-menu-item" role="menuitem">Community forums</a>
                        <a href="https://admin.shopify.com" className="merchant-dropdown-menu-plain-link merchant-dropdown-menu-link-text profile-menu-item" role="menuitem">Hire a Shopify Partner</a>
                        <a href="https://admin.shopify.com" className="merchant-dropdown-menu-plain-link merchant-dropdown-menu-link-text profile-menu-item" role="menuitem">Keyboard shortcuts</a>
                    </div>
                    <hr className="merchant-dropdown-menu-hr"/>
                    <div className="merchant-dropdown-menu-inner-padded-div">
                        <a href="https://admin.shopify.com" className="merchant-dropdown-menu-profile-name-email-link profile-menu-item" role="menuitem">
                            <p>David Micheal</p>
                            <p>davidmicheal@gmail.com</p>
                        </a>
                        <a href="https://admin.shopify.com" className="merchant-dropdown-menu-plain-link merchant-dropdown-menu-link-text profile-menu-item" role="menuitem">Manage account</a>
                        <a href="https://admin.shopify.com" className="merchant-dropdown-menu-plain-link merchant-dropdown-menu-link-text profile-menu-item" role="menuitem">Log out</a>
                    </div>
                </div>
            </div>
        </div>

        {dialog && (
            <div id="search-result-container-overlay" className='search-result-container-overlay fixed top-[60px] left-0 right-0 bottom-0 animate-fadeIn'>
                <div id='search-container' className='search-result-container fixed max-h-[350px] rounded-md z-[999] m-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 slideDown' tabIndex="-1" role="dialog" aria-modal="true" aria-label="Delete profile" aria-describedby='modal-heading'>
                    <div className='flex justify-end search-close-button-div p-2'>
                            <button onClick={() => {setDialog(false); focusDialogTrigger();}} className='dialog-close-button rounded-md p-1 dialog-block-interactive'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4 text-black"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                            </button>
                        </div>
                        <div className='px-2 py-4'>
                            <h2 className='font-bold text-3xl text-center' id="modal-heading">Delete Profile</h2>
                            <p className='text-sm text-center mt-2'>Are you sure you want to delete your profile? This action is irreversible.</p>
                            <div className='flex items-center justify-between mt-10 px-4'>
                                <button onClick={() => {setDialog(false); focusDialogTrigger();}} className='dialog-block-interactive flex items-center justify-center text-sm px-10 py-2 rounded-lg border confirm text-gray-700'>Cancel</button>
                                <button onClick={() => {setDeleteToast(true); setDialog(false); focusDialogTrigger();}} className='dialog-block-interactive flex items-center justify-center text-sm px-10 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800'>Delete</button>
                            </div>
                        </div>
                </div>
            </div>
        )}

        <div className={`toast fixed top-[100px] right-4 z-50 transition-all duration-500 ease-in-out ${(toast || deleteToast) ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} bg-blue-600 text-white px-4 py-2 rounded shadow-lg flex items-center`} style={{ minWidth: '200px' }}>
          <span className="flex-1">{toast && ("Your setting has been updated")} {deleteToast && ('Your profile has been deleted')}</span>
          <span className='sr-only' aria-live='assertive' role="status">{announce}</span>
          {/* <button className="ml-4 text-white hover:text-gray-200 focus:outline-none toast-button" onClick={() => setToast(false)} aria-label="Close setting updated toast." aria-hidden={toast} tabIndex={toast ? 0 : -1}>
            &times;
          </button> */}
        </div>
    </div>
  )
}

export default DynamicUIAnnouncing