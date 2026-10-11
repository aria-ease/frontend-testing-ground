import { useState } from 'react';

const Tabs = () => {
    const[activeTab, setActiveTab] = useState(1);
  return (
    <div className='flex gap-5 max-w-[700px] m-auto pt-10'>
        <div role='tablist' aria-label='Settings' className='flex flex-col gap-3'>
            <button className='rounded-lg block-interactive border px-4 py-1 text-sm' role='tab' aria-selected={activeTab === 1 ? 'true' : 'false'} id='profile-button' aria-controls='profile-panel' tabIndex={activeTab === 1 ? 0 : -1} onClick={() => setActiveTab(1)}>Profile</button>
            <button className='rounded-lg block-interactive border px-4 py-1 text-sm' role='tab' aria-selected={activeTab === 2 ? 'true' : 'false'} id='notification-button' aria-controls='notification-panel' tabIndex={activeTab === 2 ? 0 : -1} onClick={() => setActiveTab(2)}>Notification</button>
            <button className='rounded-lg block-interactive border px-4 py-1 text-sm' role='tab' aria-selected={activeTab === 3 ? 'true' : 'false'} id='security-button' aria-controls='security-panel' tabIndex={activeTab === 3 ? 0 : -1} onClick={() => setActiveTab(3)}>Security</button>
        </div>
        <div>
            {activeTab === 1 && (
                <div role="tabpanel" aria-labelledby='profile-button' id="profile-panel">
                    <h1 className="font-bold">Profile Settings</h1>
                    <form>
                        <div className='mt-3 flex flex-col gap-1'>
                            <label className="text-sm">Display Name</label>
                            <input type='text' placeholder='Enter display name' className='border rounded-md p-1'></input>
                        </div>
                        <div className='mt-3 flex flex-col gap-1'>
                            <label className="text-sm">Email</label>
                            <input type='email' placeholder='Enter email' className='border rounded-md p-1'></input>
                        </div>
                        <button className='rounded-lg border px-4 py-1 mt-3 text-sm'>Save Profile Changes</button>
                    </form>
                </div>
            )}

            {activeTab === 2 && (
                <div role="tabpanel" aria-labelledby='notification-button' id="notification-panel">
                    <h1 className="font-bold">Notification Preferences</h1>
                    <div className='mt-3'>
                        <h2>Email Notifications</h2>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm'>Receive updates via email</span>
                            <input type="checkbox"></input>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 3 && (
                <div role="tabpanel" aria-labelledby='security-button' id="security-panel">
                    <h1 className="font-bold">Security Settings</h1>
                    <form>
                        <div className='mt-3 flex flex-col gap-1'>
                            <label className="text-sm">Current Password</label>
                            <input type='text' placeholder='Enter current password' className='border rounded-md p-1'></input>
                        </div>
                        <div className='mt-3 flex flex-col gap-1'>
                            <label className="text-sm">New Password</label>
                            <input type='text' placeholder='Enter new password' className='border rounded-md p-1'></input>
                        </div>
                        <div className='mt-3 flex flex-col gap-1'>
                            <label className="text-sm">Confirm New Password</label>
                            <input type='text' placeholder='Confirm new password' className='border rounded-md p-1'></input>
                        </div>
                        <button className='rounded-lg border px-4 py-1 mt-3 text-sm'>Update Password</button>
                    </form>
                </div>
            )}
        </div>
    </div>
  )
}

export default Tabs