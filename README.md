# Node.js Cluster Module

Node.js operates on a single processor core and uses a single thread. A thread is a portion of a program that is executed by a processor core during the program's runtime. Although Node.js' single-threaded model offers advantages like high performance and low memory consumption, it may not be sufficient for tasks that involve heavy CPU usage. Therefore, the `cluster` module, which is built into Node.js, allows us to use a multi-threading model and create worker threads. In such a multi-threading model, Node.js can handle CPU-intensive tasks by utilizing multiple threads.

### `cluster` Module:
The `cluster` module is a built-in Node.js module that allows us to implement a multi-threading model. 
It creates multiple copies of the Node.js process, with each copy running on a separate thread. In other words, it allows us to fork the main thread to create worker threads. By creating these threads based on the number of available CPU cores, it enables running multiple instances of the same application in their own memory spaces. This way, the Node.js application can perform multiple tasks simultaneously.
