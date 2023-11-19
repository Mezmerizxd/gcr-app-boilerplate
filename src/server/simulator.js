// /**
//  * @description This is a simulator for the server. It will simulate api calls to the server and track response timings and more
//  * @argument {string} [url='https://'] - The url of the server
//  * @argument {number} [instances_limit=0] - The number of instances running, 0 is unlimited
//  */
// /*
//   This will have multiple instances running
//   in a loop doing the following:

//     * A random 5 number code is generated so that
//     it can be put in the username and email so
//     theres less chance of a collision

//     * Create the account and then save the token
//     in a variable

//     * Then login with the account and save the
//     token in a variable

//     * Use all the apis that require a token in
//     a loop and track the response times
// */

// const fetch = require('node-fetch');

// let urlIndex;
// let url;
// let instancesLimitIndex;
// let instancesLimit;

// let instances = 0;
// let pings = 0;
// let speed = 500;
// let responseTimes = [];
// let accountsMade = 0;
// let loginsMade = 0;

// function RandomCode() {
//   return Math.floor(Math.random() * 100000000).toString();
// }

// async function CreateAccount(username, email, password) {
//   try {
//     const start = new Date();
//     const response = await fetch(`${url}/auth/create`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         email,
//         password,
//       }),
//     });
//     const end = new Date();
//     const responseTime = end - start;
//     responseTimes.push(responseTime);
//     pings += 1;
//     const json = await response.json();
//     const server = json.server;
//     const data = json.data;

//     if (server.success === false) {
//       console.error(`Create account failed: ${server.error}`);
//       throw new Error(server.error);
//     } else {
//       accountsMade += 1;
//       return data;
//     }
//   } catch (error) {
//     console.error("Couldn't create account");
//     throw new Error(error);
//   }
// }

// async function LoginAccount(email, password) {
//   try {
//     const start = new Date();
//     const response = await fetch(`${url}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });
//     const end = new Date();
//     const responseTime = end - start;
//     responseTimes.push(responseTime);
//     pings += 1;
//     const json = await response.json();
//     const server = json.server;
//     const data = json.data;

//     if (server.success === false) {
//       console.error(`Login account failed: ${server.error}`);
//       throw new Error(server.error);
//     } else {
//       loginsMade += 1;
//       return data;
//     }
//   } catch (error) {
//     console.error("Couldn't login account");
//     throw new Error(error);
//   }
// }

// async function GetProfile(token) {
//   try {
//     const start = new Date();
//     const response = await fetch(`${url}/account/profile`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     });
//     const end = new Date();
//     const responseTime = end - start;
//     responseTimes.push(responseTime);
//     pings += 1;
//     const json = await response.json();
//     const server = json.server;
//     const data = json.data;

//     if (server.success === false) {
//       console.error(`Get profile failed: ${server.error}`);
//       throw new Error(server.error);
//     } else {
//       return data;
//     }
//   } catch (error) {
//     console.error("Couldn't get profile");
//     throw new Error(error);
//   }
// }

// function DisplayInfo() {
//   // Clear console
//   console.clear();

//   const averageResponseTime =
//     responseTimes.length > 0 ? responseTimes.reduce((acc, time) => acc + time, 0) / responseTimes.length : 0;

//   // Display info
//   console.log(`
//     Instances: ${instances}\n
//     Pings: ${pings}\n
//     Speed: ${speed}ms\n
//     Accounts made: ${accountsMade}\n
//     Logins made: ${loginsMade}\n
//     Last Response Time: ${responseTimes.length > 0 ? responseTimes[responseTimes.length - 1] + 'ms' : 'N/A'}\n
//     Average Response Time: ${averageResponseTime.toFixed(2)}ms\n
//   `);
// }

// async function Run() {
//   try {
//     instances += 1;

//     const code = RandomCode();
//     const username = `simulator_${code}`;
//     const email = `simulator_${code}@simulated.com`;
//     const password = `simulator_${code}`;

//     const create = await CreateAccount(username, email, password);
//     const login = await LoginAccount(email, password);

//     if (!create.sessions || create.sessions.length === 0) {
//       console.error('No sessions found');
//       throw new Error('No sessions found');
//     }

//     let validToken = create?.sessions[create.sessions.length - 1]?.token;
//     if (!validToken) {
//       console.error('No valid token found');
//       throw new Error('No valid token found');
//     }

//     return setInterval(async () => {
//       const profile = await GetProfile(validToken);
//     }, speed);
//   } catch (error) {
//     console.error("Couldn't run");
//     throw new Error(error);
//   }
// }

// const Delay = (ms) => new Promise((res) => setTimeout(res, ms));

// setTimeout(async () => {
//   try {
//     urlIndex = process.argv.findIndex((arg) => arg.includes('url='));
//     url = process.argv[urlIndex].split('=')[1] || 'http://localhost:4000/api/v1';
//   } catch (error) {
//     console.error("Couldn't find url in arguments, please add url=");
//     process.exit(1);
//   }
//   try {
//     instancesLimitIndex = process.argv.findIndex((arg) => arg.includes('instances_limit='));
//     instancesLimit = parseInt(process.argv[instancesLimitIndex].split('=')[1]) || 0;
//   } catch (error) {
//     console.info("Couldn't find instances_limit in arguments, setting to 0 (unlimited)");
//   }

//   console.log(`Starting simulator with url: ${url} and instances_limit: ${instancesLimit || 'unlimited'} ...`);

//   await Delay(5000);

//   setInterval(async () => {
//     if (instancesLimit > 0 && instances >= instancesLimit) return;
//     await Run();
//   }, speed);

//   setInterval(() => {
//     DisplayInfo();
//   }, 100);
// }, 1000);
