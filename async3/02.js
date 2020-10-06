// // const async = require('async');
// //
// // const res = async.series([
// //   callback => {
// //     setTimeout(() => {
// //       console.log(1);
// //       callback(); // 作用：告诉
// //     }, 100);
// //   },
// //   callback => {
// //     setTimeout(() => {
// //       console.log(2);
// //       callback();
// //     }, 500);
// //   },
// //   callback => {
// //     setTimeout(() => {
// //       console.log(3);
// //       callback();
// //     }, 1000);
// //   }
// // ]);
// //
// // console.log(Object.prototype.toString.call(res) === '[object Promise]');
//
// const async = require('async');
//
// const res = async.series([
//   callback => {
//     setTimeout(() => {
//       console.log(1);
//       callback(null, 111111);
//     }, 100);
//   },
//   callback => {
//     setTimeout(() => {
//       console.log(2);
//       callback();
//     }, 500);
//   },
//   callback => {
//     setTimeout(() => {
//       console.log(3);
//       callback();
//     }, 1000);
//   }
// ], (error, results) => { // 返回值丢给了回调的第二参数，以数组的形式返回
//   console.log('results', results);
// });
//
// console.log('res', res); // 返回值给了回调的第二参数，所以返回undefined
const async = require('async');
async.series({
  one: function(callback) {
    setTimeout(function() {
      callback(null, 1);
    }, 200);
  },
  method(callback) {
    setTimeout(() => {
      callback(null, 2);
    }, 100);
  }
}, function(err, results) {
  console.log(err, results);
});
