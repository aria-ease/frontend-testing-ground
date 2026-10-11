import { useState } from "react";

const HiddenContent = () => {
  const[ariaHidden, setAriaHidden] = useState(false);
  const[showToast, setShowToast] = useState(false);
  
  return (
    <div className="flex items-center justify-center h-[100vh] w-full">
      {/* <div className="max-w-[700px] m-auto">
        <h1>aria-hidden=&#34;{`${ariaHidden}`}&#34;</h1>
        <p>Use to hide reduntant content from screen reader, but remain displayed because they&#39;re visually decorative</p>
        <button className="rounded-lg p-2 border mt-2 flex items-center gap-2 mb-10">
          <span aria-hidden={`${ariaHidden}`}>🔍</span>
          <span className="text-sm">Search Docs</span>
        </button>

        <input type='checkbox' value={ariaHidden} onChange={() => setAriaHidden(!ariaHidden)}></input>
      </div> */}

      {/* <div>
        <div className={`fixed top-4 right-4 z-50 transition-all duration-500 ease-in-out ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} bg-blue-600 text-white px-4 py-2 rounded shadow-lg flex items-center`} style={{ minWidth: '200px', display: `${showToast ? "block" : "none"}` }}>
          <span className="flex-1">Your setting has been updated</span>
          <button className="ml-4 text-white hover:text-gray-200 focus:outline-none" onClick={() => setShowToast(false)} aria-label="Close setting updated toast.">
            &times;
          </button>
        </div>

        <h1 className="text-lg">How not to hide content accessibly</h1>
        <p>While hiding content using position, e.g float, translate, opacity, may work for visual use, it&#39;s terrible accessibility practice.</p>
        <p>The screen reader announces &#34;Close setting updated toast&#34;. But what toast?</p>

        <h1 className="text-lg">How to hide content accessibly</h1>
        <p>Use &#34;display: none&#34;. It hides content both visually and from screen readers</p>
        <button onClick={() => setShowToast(true)} className="text-sm mt-4 rounded-lg px-4 py-2 border flex items-center justify-center">Save Settings</button>
      </div> */}

      <div>
        <h1 className="text-lg">Hide content visually, but make available to screen reader</h1>
        <p className="mb-4">Sighted users see the icon that indicates a new tab will be opened. The screen reader announces &#34;opens in a new tab&#34; while it&#39;s visually hidden</p>
        <a href="https://example.com" target="_blank" className="text-sm text-blue-800 flex items-center gap-1">
          <span>Visit example.com</span>
          <span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}

export default HiddenContent