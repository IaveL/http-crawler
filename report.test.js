const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sort 2 pages by number of crawl hits", () => {
  const input = {
    "https://wagslane.dev/path": 1,
    "https://wagslane.dev": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev", 3],
    ["https://wagslane.dev/path", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sort 5 pages by number of crawl hits", () => {
  const input = {
    "https://wagslane.dev/path": 1,
    "https://wagslane.dev": 12,
    "https://wagslane.dev/path2": 3,
    "https://wagslane.dev/path3": 21,
    "https://wagslane.dev/path4": 94,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev/path4", 94],
    ["https://wagslane.dev/path3", 21],
    ["https://wagslane.dev", 12],
    ["https://wagslane.dev/path2", 3],
    ["https://wagslane.dev/path", 1],
  ];
  expect(actual).toEqual(expected);
});
