async function retryCallback(callback, retry) {
  let count = 0;
  for (let i = 0; i < retry; i++) {
    try {
      return await callback();
    } catch {
      count++;
      console.log("重試:", i);
    }
  }
  return `總共錯誤 ${count} 次`;
}
const getData = async () => {
  console.log('starting request 1');
  const r1 = await retryCallback("", 6);
  console.log(r1);
  console.log('starting request 2');
  const r2 = await retryCallback("", 5);
  console.log(r2);
};