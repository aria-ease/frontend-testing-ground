import { createContract } from "aria-ease/contract";

export const checkboxContract = createContract("checkbox", (c) => {
    c.meta({
        id: "docs.custom.contract.checkbox",
        version: "1.0.0",
        created: "11-02-2026",
        lastUpdated: "19-03-2026",
        description: "Simple fluent DSL example for checkbox custom policy",
        source: {
        apg: "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/",
        wcag: ["2.2 AA"],
        },
        W3CName: "Checkbox",
    });

    c.selectors({
        main: "[role=group]",
        checkbox: "[role=checkbox]",
        relative: "[role=checkbox]"
    });

    c.static((s) => {
        s.target("checkbox").has("aria-checked", "false").required();
    });

    c.when("Space")
    .as("keypress")
    .on("relative", 1)
    .given({type: "checkbox.unchecked", ref: 1})
    .then({type: "checkbox.checked", ref: 1})
    .describe("Space checks an unchecked checkbox.")
    .required();

    c.when("Space")
    .as("keypress")
    .on("relative", 1)
    .given({type: "checkbox.checked", ref: 1})
    .then({type: "checkbox.unchecked", ref: 1})
    .describe("Space unchecks a checked checkbox.")
    .required();

    c.when("Click")
    .as("click")
    .on("relative", 1)
    .given({type: "checkbox.unchecked", ref: 1})
    .then({type: "checkbox.checked", ref: 1})
    .describe("Click checks an unchecked checkbox.")
    .required();

    c.when("Click")
    .as("click")
    .on("relative", 1)
    .given({type: "checkbox.checked", ref: 1})
    .then({type: "checkbox.unchecked", ref: 1})
    .describe("Click unchecks a checked checkbox.")
    .required();
})
