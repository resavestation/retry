async function retryCallback(callback, retry) {
  let count = 0;
  for (let i = 0; i < retry; i++) {
    try {
      return await callback();
    } catch {
      count++;
      await new Promise(r => setTimeout(r, 1000));
      console.log("重試:", i+1);
    }
  }
  return `總共錯誤 ${count} 次`;
}

// 此場景是在必須確認r1執行完畢後才開始執行r2
const getData = async () => {
  console.log('starting request 1');
  const r1 = await retryCallback("", 6);
  console.log(r1);
  console.log('starting request 2');
  const r2 = await retryCallback("", 5);
  console.log(r2);
};

// 此場景仍然讓r1, r2是異步，只不過會確保他們重試完要求次數
const getData2 = () => {
  console.log('starting request 1');
  const r1 = retryCallback("", 6);
  console.log(r1);
  console.log('starting request 2');
  const r2 = retryCallback("", 5);
  console.log(r2);
};