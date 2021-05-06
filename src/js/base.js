async function retryCallback(callback, retryTotal, retry) {
  !retry && (retry = 0);
  try {
    const data = await callback();
    return data;
  } catch {
    if (retry < retryTotal) {
      retry++;
      console.log("重試次數:", retry);
      return retryCallback(callback, retryTotal, retry)
    }
    else {
      return `失敗${retry}次`;
    }
  }
}
const getData = async () => {
  console.log('starting request 1');
  const r1 = await retryCallback("", 6);
  console.log(r1);
  console.log('starting request 2');
  const r2 = await retryCallback("", 5);
  console.log(r2);
};