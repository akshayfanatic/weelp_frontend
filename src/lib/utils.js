import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// Time Delay for execution
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


//For Tracking log also with there file address
export const log = (...args) => {
  const error = new Error();
  const stack = error.stack.split('\n')[2].trim(); // Get the caller info from stack trace
  const match = stack.match(/(\/[^/]+)+:\d+:\d+/); // Extract file and line:column
  const filePath = match ? match[0] : 'unknown source';

  console.log(`🚀 [${filePath}] `, ...args); // Log with file info
};



// Function to generate slug
export const generateSlug = (value) => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ""); // Remove special characters
};



// date string  function
export const  actualDate=(str)=>{
  return (
    String(str).split('T').at(0)
  )
}


// String sign Remover
export const stringSignRemover = (string) => {
  return String(string).replace(/[^a-zA-Z0-9 ]/g, ' ');
};
