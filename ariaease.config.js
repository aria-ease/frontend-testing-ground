
export default {
  audit: {
    urls: [
      'http://localhost:5173/test-harness?component=combobox'   
    ],
    output: {
      format: 'all',
      out: './accessibility-reports/audit'
    },
    
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  },
  test: {
    strictness: "balanced",
    components: [
      {
        name: "combobox",
        contractPath: "./tests/contracts/combobox.listbox.contract.json"
      },
      {
        name: "checkbox",
        contractPath: "./tests/contracts/checkbox.contract.json"
      },
      {
        name: "radio",
        contractPath: "./tests/contracts/radio.contract.json"
      },
      {
        name: "accordion",
        contractPath: "./tests/contracts/accordion.contract.json"
      },
      {
        name: "tabs",
        contractPath: "./tests/contracts/tabs.contract.json"
      },
      {
        name: "toggle",
        contractPath: "./tests/contracts/toggle.contract.json"
      },
      {
        name: "menu",
        contractPath: "./tests/contracts/menu.contract.json"
      }
    ]
  },
  contracts: [
    {
      src: "./tests/contracts/**/*.contract.mjs",
      out: "./tests/contracts"
    }
  ]
};