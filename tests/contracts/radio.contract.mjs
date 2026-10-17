import { createContract } from "aria-ease/contract";

export const radioContract = createContract("radio", (c) => {
    c.meta({
        id: "docs.custom.contract.radio",
        version: "1.0.0",
        created: "11-02-2026",
        lastUpdated: "19-03-2026",
        description: "Simple fluent DSL example for radio custom policy",
        source: {
        apg: "https://www.w3.org/WAI/ARIA/apg/patterns/radio/",
        wcag: ["2.2 AA"],
        },
        W3CName: "Radio",
    });

    c.selectors({
        main: "[role=radiogroup]",
        radio: "[role=radio]",
        relative: "[role=radio]"
    });

    c.static((s) => {
        s.target("radio").has("aria-checked", "false").required();
    });

    c.when("Space")
    .as("keypress")
    .on("relative", 1)
    .given({type: "radio.unchecked", ref: 1})
    .then({type: "radio.checked", ref: 1})
    .describe("Space checks an unchecked radio.")
    .required();

    c.when("Click")
    .as("click")
    .on("relative", 1)
    .given({type: "radio.unchecked", ref: 1})
    .then({type: "radio.checked", ref: 1})
    .describe("Click checks an unchecked radio.")
    .required();

    c.when("Space")
    .as("keypress")
    .on("relative", 2)
    .given({type: "radio.checked", ref: 1})
    .then([{type: "radio.checked", ref: 2}, {type: "radio.unchecked", ref: 1}])
    .describe("Only one radio checked per time.")
    .required();

    c.when("ArrowDown")
    .as("keypress")
    .on("relative", 1)
    .given({type: "radio.unchecked", ref: 1})
    .then([{type: "radio.checked", ref: 2}, {type: "radio.focused", ref: 2}])
    .describe("Arrow Down moves focus and checks next radio.")
    .required();
})
