setTimeout(() => {
  console.log(1);
  setTimeout(() => {
    console.log(22);
    setTimeout(() => {
      console.log(33);
    }, 1000);
  }, 500);
}, 100);

// 串行代码，可以通过 async 第三方库进行改造
