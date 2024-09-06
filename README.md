# Node.js Cluster Modülü

Nodejs, tek bir işlemci çekirdeğinde çalışır ve tek bir iş parçacığı (thread) kullanır. İş parçacığı, bir programın çalışma 
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
