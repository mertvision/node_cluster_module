/**
 * Node.js operates on a single processor core and uses a single thread. A thread is a portion of a program 
 * executed by a processor core during the program's runtime. Although Node.js' single-threaded model offers advantages 
 * like high performance and low memory consumption, it might not be sufficient for tasks that involve heavy CPU usage. 
 * Therefore, the `cluster` module, which is built into Node.js, allows us to use a multi-threading model and create 
 * auxiliary threads. In such a multi-threading model, Node.js can handle CPU-intensive tasks by utilizing multiple threads.

 * `cluster`: A built-in Node.js module that enables the usage of a multi-threading model.
 * The cluster module creates multiple copies of the Node.js process, with each copy running on a separate thread. 
 * In other words, it forks the main thread to create worker threads. By creating these threads based on the number of 
 * available CPU cores, it enables running multiple instances of the same application in their own memory spaces.
 * This allows the Node.js application to perform multiple tasks simultaneously.
 * 
 * Author: Mert Özdemir <mertozdemir2026@outlook.com>
 */

// Import the cluster module (built-in)
import cluster from "cluster";
// Import the OS module (built-in)
import os from "os";
// Import HTTP module to create a web server
import http from "http";

// Determine the number of CPU cores using the cluster module
const CPUSnum: number = os.cpus().length;

// Print the number of CPU cores
console.log(CPUSnum);

// Create a master thread. This will manage and control the worker threads:
if (cluster.isMaster) {
    // Master thread
    console.log(`Master thread PID: ${process.pid}`);

    // Fork worker threads for each CPU core
    for (let i = 0; i < CPUSnum; i++) {
        cluster.fork(); // Create worker threads
    }

    // Log when a worker thread is created
    cluster.on("fork", function (worker, err) {
        console.log(`\t Worker thread created: (worker ${worker.process.pid})`);
    });

    // Monitor for worker thread errors and restart them
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker thread: ${worker.process.pid} terminated`);
        cluster.fork(); // Create a new worker thread
    });

} else {
    // Worker thread
    console.log(`Worker thread PID: ${process.pid}`);

    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello World!');
    }).listen(3000);
};
