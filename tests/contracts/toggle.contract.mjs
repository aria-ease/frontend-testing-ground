import { createContract } from "aria-ease/contract";

export const radioContract = createContract("toggle", (c) => {
    c.meta({
        id: "docs.custom.contract.toggle",
        version: "1.0.0",
        created: "11-02-2026",
        lastUpdated: "19-03-2026",
        description: "Simple fluent DSL example for toggle custom policy",
        source: {
        apg: "https://www.w3.org/WAI/ARIA/apg/patterns/toggle/",
        wcag: ["2.2 AA"],
        },
        W3CName: "toggle",
    });

    c.selectors({
        main: "button[aria-pressed]",
        toggle: "button[aria-pressed]",
        relative: "button[aria-pressed]"
    });

    c.static((s) => {
        s.target("toggle").has("aria-pressed", "false").required();
    });

    c.when("Space")
    .as("keypress")
    .on("relative", 1)
    .given({type: "toggle.unpressed", ref: 1})
    .then({type: "toggle.pressed", ref: 1})
    .describe("Space presses an unpressed toggle.")
    .required();

    c.when("Space")
    .as("keypress")
    .on("relative", 1)
    .given({type: "toggle.pressed", ref: 1})
    .then({type: "toggle.unpressed", ref: 1})
    .describe("Space unpresses a pressed toggle.")
    .required();

    c.when("Click")
    .as("click")
    .on("relative", 1)
    .given({type: "toggle.unpressed", ref: 1})
    .then({type: "toggle.pressed", ref: 1})
    .describe("Click presses an unpressed toggle.")
    .required();

    c.when("Click")
    .as("click")
    .on("relative", 1)
    .given({type: "toggle.pressed", ref: 1})
    .then({type: "toggle.unpressed", ref: 1})
    .describe("Click unpresses a pressed toggle.")
    .required();
})
