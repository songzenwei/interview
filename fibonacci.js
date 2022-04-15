// 斐波那契数列
// 方式1:递归  时间复杂度 O(2^n) 空间复杂度 O(n)
//     function fibonacci(n) {
//     if (n <= 2) {
//         return 1
//     };
//     return fibonacci(n - 2) + fibonacci(n - 1);
// }

//  方式2:缓存计算结果
// var fibonacci = function () {
//     let memo = [0, 1];
//     let fib = function (n) {
//         if (memo[n] == undefined) {
//             memo[n] = fib(n - 2) + fib(n - 1)
//         }
//         return memo[n]
//     }
//     return fib;
// }()
// fibonacci(30)

//   方式3:缓存计算结果优化
// var memoizer = function (func) {
//     let memo = [];
//     return function (n) {
//         if (memo[n] == undefined) {
//             memo[n] = func(n)
//         }
//         return memo[n]
//     }
// };
// var fibonacci=memoizer(function(n){
//     if (n == 1 || n == 2) {
//         return 1
//     };
//     return fibonacci(n - 2) + fibonacci(n - 1);
// })
// fibonacci(30)

// 方式4(最优): for 循环 时间复杂度 O(n) 空间复杂度 O(1)
var fibonacci = function (n) {
  let n1 = 1;
  n2 = 1;
  for (let i = 2; i < n; i++) {
    let sum = n1 + n2;
    n1 = n2;
    n2 = sum;
  }
  return n2;
};
fibonacci(30);
console.log(fibonacci(30));
