import { useState, useEffect, useRef } from "react";

const ComboBox = () => {

    const [listShown, setListShown] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [optionsArray] = useState([
        {id: "apple", label: "Apple"},
        {id: "mango", label: "Mango"},
        {id: "orange", label: "Orange"},
        {id: "banana", label: "Banana"}
    ]);
    const [visibleOptionsArray, setVisibleOptionsArray] = useState(optionsArray);
    const [activeOptionId, setActiveOptionId] = useState("");

    const visibleOptionsRef = useRef([]);
    const activeIndexRef = useRef(-1);


    useEffect(() => {
        visibleOptionsRef.current = visibleOptionsArray;
    }, [visibleOptionsArray]);


    useEffect(() => {
        const input = document.getElementById('fruit');
        const list = document.getElementById('fruits-listbox');
        const listButton = document.getElementById('show-list-button');
        if (!input || !list) return;

        const handleKeyDown = (event) => {
            const currentVisible = visibleOptionsRef.current;
            const currentIndex = activeIndexRef.current;

            if (event.key === 'Escape') {
                if(listShown) {
                    setListShown(false);
                    activeIndexRef.current = -1;
                    setActiveOptionId("");
                    input.setAttribute("aria-activedescendant", "");
                    return;
                } /* else {
                    input.value = "";
                    setInputValue("");
                    optionsArray.forEach(opt => opt.hidden = false);
                    setVisibleOptionsArray([...optionsArray]);
                    return;
                }  */
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (!listShown || currentVisible.length === 0) return;
                
                // Calculate new index (wrap around)
                const newIndex = currentIndex <= 0 
                    ? currentVisible.length - 1 
                    : currentIndex - 1;
                
                activeIndexRef.current = newIndex;
                const activeOption = currentVisible[newIndex];
                const optionId = activeOption?.id || "";
                setActiveOptionId(optionId);
                input.setAttribute("aria-activedescendant", optionId);
                
                // Scroll into view if needed
                activeOption?.scrollIntoView({ block: 'nearest' });
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                
                // Open list if closed
                if (!listShown) {
                    setListShown(true);
                    // Set visible options to all options when opening on empty input
                    if (inputValue.trim() === '') {
                        setVisibleOptionsArray(optionsArray);
                    }
                    activeIndexRef.current = -1;
                    return;
                }
                
                if (currentVisible.length === 0) return;
                
                // Calculate new index (wrap around)
                const newIndex = currentIndex >= currentVisible.length - 1 
                    ? 0 
                    : currentIndex + 1;
                
                activeIndexRef.current = newIndex;
                const activeOption = currentVisible[newIndex];
                const optionId = activeOption?.id || "";
                setActiveOptionId(optionId);
                input.setAttribute("aria-activedescendant", optionId);
                
                // Scroll into view if needed
                activeOption?.scrollIntoView({ block: 'nearest' });
            }

            if(event.key === 'Enter') {
                if(listShown && currentIndex >= 0 && currentIndex < currentVisible.length) {
                    const selectedOption = currentVisible[currentIndex];
                    setInputValue(selectedOption.textContent);
                    setListShown(false);
                    activeIndexRef.current = -1;
                    setActiveOptionId("");
                    input.setAttribute("aria-activedescendant", "");
                }
            }
        };

        const mouseSelectItem = (event) => {
            if(listShown && list.contains(event.target)) {
                setInputValue(event.target.textContent);
                input.setAttribute("aria-activedescendant", event.target.id);
                setListShown(false);
                activeIndexRef.current = -1;
                setActiveOptionId("");
            }
        }

        const handleMouseMove = (event) => {
            if(listShown && event.target.hasAttribute('role') && event.target.getAttribute('role') === 'option') {
                const optionId = event.target.id;
                setActiveOptionId(optionId);
                input.setAttribute("aria-activedescendant", optionId);
                const currentVisible = visibleOptionsRef.current;
                const index = currentVisible.indexOf(event.target);
                activeIndexRef.current = index;
            }
        };

        const handleClickOutside = (event) => {
            const combo = document.getElementById('combo-wrapper');
            if (combo && !combo.contains(event.target)) {
                setListShown(false);
                activeIndexRef.current = -1;
                setActiveOptionId("");
            }
        };

        const handleListButtonKeyDown = (event) => {
            if(event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setListShown(!listShown);
                if (!listShown) {
                    setTimeout(() => input.focus(), 0);
                }
            }
        }

        input.addEventListener('keydown', handleKeyDown);
        list.addEventListener('keydown', handleKeyDown);
        list.addEventListener('mousedown', mouseSelectItem);
        list.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleClickOutside);
        listButton.addEventListener('keydown', handleListButtonKeyDown);
        return () => {
            input.removeEventListener('keydown', handleKeyDown);
            list.removeEventListener('keydown', handleKeyDown);
            list.removeEventListener('mousedown', mouseSelectItem);
            list.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleClickOutside);
            listButton.removeEventListener('keydown', handleListButtonKeyDown)
        }
    }, [visibleOptionsArray, listShown, inputValue, optionsArray]);


    const changeInput = (event) => {
        const value = event.target.value;
        setInputValue(value);
        const query = value.toLowerCase();
        const filtered = optionsArray.filter(opt => opt.label.toLowerCase().includes(query));
        setVisibleOptionsArray(filtered);
        setListShown(filtered.length > 0);
        activeIndexRef.current = -1;
        setActiveOptionId("");
    };

    // Button toggles list
    const handleListButtonClick = () => {
        if (listShown) {
            setListShown(false);
        } else {
            setVisibleOptionsArray(optionsArray);
            setListShown(true);
            setTimeout(() => {
                const input = document.getElementById('fruit');
                if (input) input.focus();
            }, 0);
        }
    };

    return (
        <div id="combo-wrapper" className="max-w-[700px] m-auto pt-10 text-sm">
            <div className="flex flex-col gap-1 inline-block">
                <label htmlFor="fruit">Select a fruit</label>
                <div className="border max-w-[205px]">
                    <div className="flex items-center justify-between p-1">
                        <input 
                            type="text"
                            id="fruit"
                            name="fruit"
                            value={inputValue}
                            onChange={changeInput}
                            role="combobox"
                            aria-haspopup="listbox"
                            aria-expanded={listShown}
                            aria-controls="fruits-listbox"
                        />
                        <button 
                            id="show-list-button" 
                            aria-label="Open fruits list" 
                            tabIndex={-1}
                            type="button"
                            onClick={handleListButtonClick}
                        >▼</button>
                    </div>
                </div>   
            </div>
            <ul 
                role="listbox" 
                id="fruits-listbox" 
                aria-label="Fruits" 
                className="border inline-block w-[205px]"
                style={{ display: listShown ? "block" : "none" }}
            >
                {visibleOptionsArray.map(opt => (
                    <li 
                        key={opt.id} 
                        id={opt.id} 
                        role="option" 
                        aria-selected={activeOptionId === opt.id ? "true" : "false"}
                        className={`list-options p-2 hover:bg-blue-50 ${activeOptionId === opt.id ? "bg-blue-200" : ""}`}
                    >
                        {opt.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ComboBox