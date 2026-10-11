import { useState, useRef } from "react";

const BrokenCombobox = () => {
    const[listShown, setListShown] = useState(false);
    const[inputValue, setInputValue] = useState("");
    const[optionsArray] = useState([
        {id: "apple", label: "Apple", hidden: false},
        {id: "mango", label: "Mango", hidden: false},
        {id: "orange", label: "Orange", hidden: false},
        {id: "banana", label: "Banana", hidden: false}
    ]);

    const comboboxInstanceRef = useRef(null);

    const [activeDescendantId, setActiveDescendantId] = useState(null);


    const changeInput = (event) => {
        setInputValue(event.target.value);
        const query = event.target.value.toLowerCase();
        let hasMatch = false;
        
        optionsArray.forEach(opt => {
            const match = opt.label.toLowerCase().includes(query);
            const el = document.getElementById(opt.id);
            if (el) {
                
                if (match) hasMatch = true;
            }
        });
        
        // Open listbox if there are matches and user is typing
        if (hasMatch && query.length > 0) {
            setListShown(true);
        }
        
        // Refresh the library's cache after hiding/showing elements
        if (comboboxInstanceRef.current) {
            comboboxInstanceRef.current.refresh();
        }
    }
    
  return (
    <div id="combo-wrapper" className="max-w-[700px] m-auto pt-10">
        <div className="flex flex-col gap-2 inline-block min-w-[280px]">
            <label 
                htmlFor="fruit" 
                className="text-sm font-medium black-grey-text"
            >
                Select a fruit
            </label>
            <div className="relative">
                <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                    <input 
                        type="text"
                        id="fruit"
                        name="fruit"
                        value={inputValue}
                        onChange={changeInput}
                        placeholder="Search fruits..."
                        className="flex-1 px-3 py-2 bg-transparent outline-none rounded-l-lg text-sm"
                        role="combobox"
                        aria-controls="fruits-listbox"
                        aria-expanded={listShown}
                    />
                    <button 
                        id="show-list-button"  
                        aria-label="Open fruits list"
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-lg transition-colors"
                        onClick={() => setListShown(!listShown)}
                        tabIndex={-1}
                    >
                        <svg 
                            className={`w-4 h-4 transition-transform duration-200 ${listShown ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>   
        </div>
        <ul 
                id="fruits-listbox" 
                className={`mt-2 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden min-w-[280px] w-full inline-block ${listShown ? "show" : "hide"}`}
                role="listbox"
            >
                {optionsArray.map(opt => (
                    <li 
                        key={opt.id} 
                        id={opt.id} 
                        hidden={opt.hidden} 
                        className={`list-options px-3 py-2.5 text-sm cursor-pointer hover:bg-blue-50 aria-[selected=true]:bg-blue-100 aria-[selected=true]:text-blue-900 transition-colors border-b border-gray-100 last:border-b-0 ${activeDescendantId === opt.id ? 'bg-blue-100 text-blue-900' : ''}`}
                        onClick={() => {
                            setInputValue(opt.label);
                            setListShown(false);
                        }}
                        role="option"
                    >
                        {opt.label}
                    </li>
                ))}
            </ul>
    </div>
  )
}

export default BrokenCombobox