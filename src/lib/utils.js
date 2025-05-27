import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import _ from "lodash";



export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Create Method for  Delay Execution Promise
 * @param {*} ms
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


/**
 * Create Log method for checking where it come file
 * @param  {...any} args
 */
export const log = (...args) => {
  const error = new Error();
  const stack = error.stack.split("\n")[2].trim(); // Get the caller info from stack trace
  const match = stack.match(/(\/[^/]+)+:\d+:\d+/); // Extract file and line:column
  const filePath = match ? match[0] : "unknown source";

  console.log(`🚀 [${filePath}] `, ...args); // Log with file info
};



/**
 * Create Slug of Product Based on Name
 * @param {*} value
 * @returns "string"
 */
export const generateSlug = (value) => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ""); // Remove special characters
};


/**
 * Get Actual date from Date Instances
 * @param {*} str
 * @returns "string"
 */
export const actualDate = (str) => {
  return String(str).split("T").at(0);
};

/**
 * Remove sign from Strings
 * @param {*} string
 * @returns string
 */
export const stringSignRemover = (string) => {
  return String(string).replace(/[^a-zA-Z0-9 ]/g, " ");
};

/**
 * Remove key from Array of Objects { desiredkeytoremove: " " || {} }
 * @param {Array} array
 * @param {string} nestedKey
 * @returns []
 */
export function removeNestedKey(arr, keyToRemove) {
  return arr.map((item) => {
    if (_.isObject(item)) {
      const newItem = _.omit(item, keyToRemove); // Remove the key
      // Recursively remove the key from nested objects/values
      return _.mapValues(newItem, (val) => removeNestedKey([val], keyToRemove)[0]);
    }
    return item;
  });
}



/**
 * Format String Space to Comma "word1 word2" =>"word1 ,word2"
 * @param {String} string
 * @returns string
 */
export const addCommabetweenString = (string) => {
  return string
    .split(/[\s,]+/) // split by spaces or commas
    .filter(Boolean) // remove empty strings
    .join(" , ");
};


