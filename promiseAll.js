  //Promise.all 方法实现
  function promiseAll(array) {
    let result = [];
    let index = 0;
    return new Promise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index == array.length) {
          //因为可能会有异步操作 所以需要等待
          resolve(array);
        }
      }
      for (let i = 0; i < array.length; i++) {
        const current = array[i];
        if (current instanceof Promise) {
          //如果是Promise
          current.then(
            (value) => addData(i, value),
            (reason) => reject(reason)
          ); //如果有一个失败就Promise状态就变为失败
        } else {
          addData(i, array[i]);
        }
      }
    });
  }


  function p1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p1");
      }, 2000);
    });
  }

  function p2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p2");
      }, 1000);
    });
  }
  // 测试
  promiseAll(["a", "b", p2(), p1(), "c", "d"]).then(
    (res) => {
      console.log(res); //[ 'a', 'b', 'p2', 'p1', 'c', 'd' ]
    },
    (error) => {
      //只要有一个失败就立即执行失败的回调，并停止往下执行
      console.log(error);
    }
  );