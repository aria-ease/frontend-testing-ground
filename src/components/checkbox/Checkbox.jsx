import { useEffect } from 'react';
import * as Checkbox from "aria-ease/checkbox";

const CheckboxComponent = () => {
    useEffect(() => {
        const checkboxInstance = Checkbox.makeCheckboxAccessible({
            checkboxGroupId: 'checkbox-div',
            checkboxesClass: 'checkbox',
            callback: {
                onCheckedChange: (index, checked) => {
                    console.log(`Checkbox at index ${index} is now ${checked ? 'checked' : 'unchecked'}`);
                }
            }
        });

        // Clean up on unmount
        return () => checkboxInstance.cleanup();
    }, []);
  return (
    <div className="settings-panel p-4 border rounded">
        <h2 className="font-bold text-lg mb-3">Notification Preferences</h2>
        <div className='space-y-3' id="checkbox-div">
            <div className='flex items-center gap-3'>
                <input type="checkbox" id="email-notif" className='w-4 h-4 checkbox' />
                <label htmlFor="email-notif" className='text-sm'>Receive updates via email</label>
            </div>
            <div className='flex items-center gap-3'>
                <input type="checkbox" id="push-notif" className='w-4 h-4 checkbox' />
                <label htmlFor="push-notif" className='text-sm'>Enable push notifications</label>
            </div>
            <div className='flex items-center gap-3'>
                <input type="checkbox" id="sms-notif" className='w-4 h-4 checkbox' />
                <label htmlFor="sms-notif" className='text-sm'>SMS notifications for important updates</label>
            </div>
        </div>
    </div>
  )
}

export default CheckboxComponent