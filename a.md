new Promise(function (resolve, reject) {
  console.log("A");
  resolve();
})
  .then(function () {
    new Promise(function (resolve, reject) {
      console.log("B");
      resolve();
    })
      .then(function () {
        console.log("C");
      })
      .then(function () {
        new Promise(function (resolve, reject) {
          console.log("D");
          resolve();
        })
          .then(function () {
            console.log("E");
          })
          .then(function () {
            console.log("F");
          });
        console.log("G");
      });
    console.log("H");
  })
  .then(function () {
    console.log("I");
  });

new Promise(function (resolve, reject) {
  console.log("J");
  resolve();
})
  .then(function () {
    console.log("K");
  })
  .then(function () {
    console.log("L");
  });

注：下文中的轮次只是为了方便大家理解

首先，我们来看最外层的两个 new Promise，里面的同步语句会先执行，所以最先打印出来的是 A 和 J。

因为每个 Promise 都会产生一个微任务，所以最外层的两个 Promise 的第一个 then 会进入到第一轮的微任务当中，下面我们来单独看这两个 then。第一个 Promise 的第一个 then 里面又 new 了一个新的 Promise，这个新的 Promise 产生一个微任务，本轮的微任务已经在执行当中了，所以这个微任务会被排到下一个微任务队列的第一位，还是先执行里面的同步语句，打印 B 和 H，之后运行第二个 Promise 的第一个 then，打印 K。

第一轮微任务执行完毕，开始第二轮微任务，先执行第三个 Promise 的第一个 then，打印 C，继续执行第一个 Promise 的第二个 then，打印 I，最后执行第二个 Promise 的第二个 then，打印 L。

第三轮微任务开始，执行第三个 Promise 的第二个 then，这个 then 里面又 new 了一个新的 Promise，同理，新的 Promise（第四个）产生的微任务放入下一轮第一个执行，此时执行同步语句，打印 D 和 G。

第四轮微任务开始执行第四个 Promise 的第一个 then，打印 E。

第五轮微任务开始执行第四个 Promise 的第二个 then，打印 F。

综上，我们最后得到的结果就是：

A J B H K C I L D G E F