import { describe, test, afterAll } from "vitest";
import { testUiComponent, cleanupTests } from "aria-ease/test";


afterAll(async () => {
  await cleanupTests();
});

describe("Combobox with Listbox popup WAI-ARIA Accessibility Test", () => {
  test("Combobox with Listbox popup meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("combobox", "http://localhost:5173/test-harness?component=combobox");
  });
});

describe("Accordion WAI-ARIA Accessibility Test", () => {
  test("Accordion meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("accordion", "http://localhost:5173/test-harness?component=accordion");
  });
});



describe("Menu WAI-ARIA Accessibility Test", () => {
  test("Menu meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("menu", "http://localhost:5173/test-harness?component=menu");
  });
});

describe("Menu with submenu WAI-ARIA Accessibility Test", () => {
  test("Menu with submenu meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("menu", "http://localhost:5173/test-harness?component=sub_menu");
  });
});


describe("Horizontal Tabs WAI-ARIA Accessibility Test", () => {
  test("Horizontal tabs meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("tabs", "http://localhost:5173/test-harness?component=tabs_horizontal");
  });
});

describe("Vertical Tabs WAI-ARIA Accessibility Test", () => {
  test("Vertical tabs meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("tabs", "http://localhost:5173/test-harness?component=tabs_vertical");
  });
});

describe("Toggle WAI-ARIA Accessibility Test", () => {
  test("Toggle meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("toggle", "http://localhost:5173/test-harness?component=toggle");
  });
});

describe("Radio WAI-ARIA Accessibility Test", () => {
  test("Radio meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("radio", "http://localhost:5173/test-harness?component=radio");
  });
});

describe("Checkbox WAI-ARIA Accessibility Test", () => {
  test("Checkbox meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("checkbox", "http://localhost:5173/test-harness?component=checkbox");
  });
});