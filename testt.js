// File: dummyRequests.js
// Run: node dummyRequests.js

// Node 18+ has native fetch, otherwise: npm install node-fetch
// import fetch from 'node-fetch';

const API_URL = 'http://127.0.0.1:8000/api/activities/featured-activities'; // replace with your API
const TOTAL_REQUESTS = 1000; // total dummy requests
const CONCURRENCY = 100; // how many requests at a time

async function sendRequest(id) {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(`Request #${id} done, received ${data.length || 'response'}`);
  } catch (err) {
    console.error(`Request #${id} failed:`, err.message);
  }
}

async function runDummyRequests() {
  let promises = [];

  for (let i = 1; i <= TOTAL_REQUESTS; i++) {
    promises.push(sendRequest(i));

    // Control concurrency
    if (promises.length === CONCURRENCY) {
      await Promise.all(promises);
      promises = [];
    }
  }

  // Handle remaining requests
  if (promises.length > 0) {
    await Promise.all(promises);
  }

  console.log('All dummy requests completed!');
}

runDummyRequests();
runDummyRequests();
