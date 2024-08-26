importScripts('spark-md5.min.js');

self.onmessage = function (event) {
  const file = event.data;
  const reader = new FileReader();

  reader.onload = function (e) {
    const buffer = e.target.result;
    const hash = SparkMD5.ArrayBuffer.hash(buffer);
    self.postMessage(hash);
  };

  reader.readAsArrayBuffer(file);
};