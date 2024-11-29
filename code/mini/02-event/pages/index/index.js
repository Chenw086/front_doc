// index.js
Page({
  handler(e) {
    console.log('查看事件对象：', e)
  },
  getInput(e) {
    console.log('输入事件对象：', e)
  },
  parentHandler() {
    console.log('parentHandler 点击了')
  },
  btnHandler() {
    console.log('btnHandler 点击了')
  }
})
