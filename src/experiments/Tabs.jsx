import { useEffect, useRef } from 'react';
import { makeTabsAccessible } from '../../../package/src/tabs';

const Tabs = () => {
    const verticalTabsRef = useRef(null);
    const horizontalTabsRef = useRef(null);

    useEffect(() => {
        // Initialize vertical tabs
        verticalTabsRef.current = makeTabsAccessible({
            tabListId: 'settings-tabs',
            tabsClass: 'settings-tab',
            tabPanelsClass: 'settings-panel',
            orientation: 'vertical',
            activateOnFocus: true,
            callback: {
                onSelectedChange: (index, selected) => {
                    console.log(`Vertical tab of ${index} has selected ${selected}`);
                }
            }
        });

        // Initialize horizontal tabs
        horizontalTabsRef.current = makeTabsAccessible({
            tabListId: 'product-tabs',
            tabsClass: 'product-tab',
            tabPanelsClass: 'product-panel',
            orientation: 'horizontal',
            activateOnFocus: true,
            callback: {
                onSelectedChange: (index, selected) => {
                    console.log(`Horizontal tab at ${index} has selected ${selected}`);
                },
                onContextMenu: (tabIndex) => {
                    // Right-click or Shift + F10 was pressed - open context menu
                    const tabNames = ['Overview', 'Features', 'Pricing', 'Reviews'];
                    const menu = confirm(`Context menu for "${tabNames[tabIndex]}" tab\n\nOptions:\n• Add to favorites\n• Share tab\n• Close others\n\nPress OK to continue`);
                    console.log(`Context menu opened for tab ${tabIndex} (${tabNames[tabIndex]})`, { menu });
                }
            }
        });

        // Cleanup on unmount
        return () => {
            if (verticalTabsRef.current) {
                verticalTabsRef.current.cleanup();
            }
            if (horizontalTabsRef.current) {
                horizontalTabsRef.current.cleanup();
            }
        };
    }, []);

    return (
        <div className='max-w-[900px] m-auto pt-10 space-y-12'>
            {/* Horizontal Tabs Example */}
            <section>
                <h1 className='text-2xl font-bold mb-4'>Horizontal Tabs Example</h1>
                <p className='text-sm text-gray-600 mb-2'>
                    Use Left/Right arrows to navigate, Home/End to jump to first/last tab
                </p>
                <p className='text-sm text-blue-600 mb-4'>
                    💡 Try <span className='font-semibold'>right-click</span> (or <kbd className='px-1 py-0.5 bg-gray-100 border rounded text-xs'>Shift</kbd> + <kbd className='px-1 py-0.5 bg-gray-100 border rounded text-xs'>F10</kbd> on Windows) to open context menu
                </p>
                <div>
                    <div id='product-tabs' aria-label='Product Info' className='flex gap-2 border-b'>
                        <button className='px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 product-tab' aria-haspopup="menu">
                            Overview
                        </button>
                        <button className='px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 product-tab' aria-haspopup="menu">
                            Features
                        </button>
                        <button className='px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 product-tab' aria-haspopup="menu">
                            Pricing
                        </button>
                        <button className='px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 product-tab' aria-haspopup="menu">
                            Reviews
                        </button>
                    </div>
                    <div className='mt-4'>
                        <div className="product-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-2">Product Overview</h2>
                            <p>This is a comprehensive overview of our amazing product. It includes all the essential information you need to know.</p>
                        </div>

                        <div className="product-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-2">Key Features</h2>
                            <ul className='list-disc ml-5 space-y-1'>
                                <li>Full keyboard navigation support</li>
                                <li>ARIA compliant implementation</li>
                                <li>Automatic focus management</li>
                                <li>Customizable orientation</li>
                            </ul>
                        </div>

                        <div className="product-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-2">Pricing Plans</h2>
                            <div className='space-y-2'>
                                <div className='p-3 border rounded'>
                                    <h3 className='font-semibold'>Free</h3>
                                    <p className='text-sm'>$0/month - Perfect for testing</p>
                                </div>
                                <div className='p-3 border rounded bg-blue-50'>
                                    <h3 className='font-semibold'>Pro</h3>
                                    <p className='text-sm'>$29/month - For professionals</p>
                                </div>
                            </div>
                        </div>

                        <div className="product-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-2">Customer Reviews</h2>
                            <div className='space-y-3'>
                                <div className='border-b pb-2'>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-semibold'>John D.</span>
                                        <span className='text-yellow-500'>★★★★★</span>
                                    </div>
                                    <p className='text-sm mt-1'>Excellent accessibility support!</p>
                                </div>
                                <div className='border-b pb-2'>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-semibold'>Sarah M.</span>
                                        <span className='text-yellow-500'>★★★★☆</span>
                                    </div>
                                    <p className='text-sm mt-1'>Easy to use and implement.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vertical Tabs Example */}
            <section>
                <h1 className='text-2xl font-bold mb-4'>Vertical Tabs Example</h1>
                <p className='text-sm text-gray-600 mb-4'>
                    Use Up/Down arrows to navigate, Home/End to jump to first/last tab
                </p>
                <div className='flex gap-5'>
                    <div id='settings-tabs' aria-label='Settings' className='flex flex-col gap-2 min-w-[140px]'>
                        <button className='rounded-lg block-interactive border px-4 py-2 text-sm text-left settings-tab'>
                            Profile
                        </button>
                        <button className='rounded-lg block-interactive border px-4 py-2 text-sm text-left settings-tab'>
                            Notification
                        </button>
                        <button className='rounded-lg block-interactive border px-4 py-2 text-sm text-left settings-tab'>
                            Security
                        </button>
                    </div>
                    <div className='flex-1'>
                        <div className="settings-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-3">Profile Settings</h2>
                            <form className='space-y-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">Display Name</label>
                                    <input type='text' placeholder='Enter display name' className='border rounded-md p-2' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">Email</label>
                                    <input type='email' placeholder='Enter email' className='border rounded-md p-2' />
                                </div>
                                <button type="button" className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-600'>
                                    Save Profile Changes
                                </button>
                            </form>
                        </div>

                        <div className="settings-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-3">Notification Preferences</h2>
                            <div className='space-y-3'>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" id="email-notif" className='w-4 h-4' />
                                    <label htmlFor="email-notif" className='text-sm'>Receive updates via email</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" id="push-notif" className='w-4 h-4' />
                                    <label htmlFor="push-notif" className='text-sm'>Enable push notifications</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" id="sms-notif" className='w-4 h-4' />
                                    <label htmlFor="sms-notif" className='text-sm'>SMS notifications for important updates</label>
                                </div>
                            </div>
                        </div>

                        <div className="settings-panel p-4 border rounded">
                            <h2 className="font-bold text-lg mb-3">Security Settings</h2>
                            <form className='space-y-3'>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">Current Password</label>
                                    <input type='password' placeholder='Enter current password' className='border rounded-md p-2' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">New Password</label>
                                    <input type='password' placeholder='Enter new password' className='border rounded-md p-2' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className="text-sm font-medium">Confirm New Password</label>
                                    <input type='password' placeholder='Confirm new password' className='border rounded-md p-2' />
                                </div>
                                <button type="button" className='bg-blue-500 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-600'>
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Tabs