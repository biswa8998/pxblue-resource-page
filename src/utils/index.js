import * as mdToJson from "md-2-json";

export function parseReadme(mdContent) {
  let data;
  try {
    data = mdToJson.parse(mdContent);
  } catch (e) {
  } finally {
    return data || {};
  }
}

export function findPos(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return curtop;
  }
}

export const brandColors = [
  "blue",
  "teal",
  "citron",
  "pine",
  "emerald",
  "wine",
  "crimson",
  "sunset",
  "rust",
  "navy",
  "sky",
  "sage",
  "toad",
  "butter",
  "goldenrod",
  "trophy"
];
