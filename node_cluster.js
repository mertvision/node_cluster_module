/**
 * Nodejs, tek bir işlemci çekirdeğinde çalışır ve tek bir iş parçacığı (thread) kullanır. İş parçacığı, bir programın çalışma 
sürecinde işlemci çekirdeği tarafından yürütülen bir parçadır. Nodejs'in tek iş parçacığı modeli, yüksek performans ve 
düşük bellek tüketimi gibi avantajlara sahip olmasına rağmen CPU tüketiminin yoğun olduğu işlemlerin yapılması gibi 
bazı durumlarda yeterli olmayabilir. Bu nedenle Node.js'in içinde gömülü olarak bulunan `cluster` modülü, çoklu iş parçacığı 
(multi-threading) modelini kullanmamızı ve yardımcı iş parçacıkları yaratmamızı sağlar. Böyle bir çoklu iş parçacığı modelinde, 
Node.js birden fazla iş parçacığı kullanarak yoğun CPU işlemlerini işleyebilir.

`cluster`: Node.js içinde gömülü olarak bulunan ve çoklu iş parçacıkları modelini kullanmamızı sağlayan bir modüldür.
Cluster modülü, Node.js işleminin birden fazla kopyasını oluşturur ve her bir kopya farklı bir iş parçacığı kullanarak çalışır. 
Farklı bir deyişle, ana iş parçacığını çatallayarak alt iş parçacıkları oluşturmamızı sağlar. Bu iş parçacıklarını işlemci 
sayısına göre oluşturarak aynı uygulamanın kendi bellek alanlarında çalışacak farklı örneklerini işlemeyi mümkün kılar. 
Bu sayede, Node.js uygulaması aynı anda birden fazla işlem yapabilir hale gelir.

 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// cluster modülü yüklenir (built-in)
const cluster = require("cluster");
// os modülü yüklenir (built-in)
const os = require("os");

// cluster modülünü kullanarak işlemci çekirdeği sayısı belirlemek
const CPUSnum = os.cpus().length;

// işlemci çekirdek sayısını yazdır
console.log(CPUSnum); 

// bir ana iş parçacığı (master) oluşturun. Bu, diğer iş parçacıklarını yönetecek ve kontrol edecektir:
if(cluster.isMaster){
    // ana iş parçacığı
    console.log(`Master iş parçacığı PID: ${process.pid}`);

    for (let i=0; i<CPUSnum ; i++ ){
        cluster.fork() // işçi iş parçacıklarını oluştur
    };

    // bir işçi iş parçacığı oluşturulduğunda konsola yazdır
    cluster.on("fork", function(worker, err){
        console.log(`\t İşçi iş parçacığı yaratıldı: (worker ${worker.process.pid})`);
    });

    // işçi iş parçacıklarının hatalarını izle ve yeniden başlat
    cluster.on("exit", (worker, code, signal)=> {
        console.log(`İşçi iş parçacığı: ${worker.process.pid} sonlandırıldı`);
        cluster.fork() // yeni işçi iş parçacığı oluştur
    });

} else {
    // işçi iş parçacığı
    console.log(`İşçi iş parçacığı PID: ${process.pid}`);
 
    const http = require('http');
      http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Merhaba Dünya!');
    }).listen(3000);
};

