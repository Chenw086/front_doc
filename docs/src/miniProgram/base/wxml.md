---
title: 小程序 - wxml
---

# wxml

::: warning 文档

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/)

主要看文档即可，不在以上官网的内容才会在此处进行补充记录，笔记在 code/mini/03-template 里面

- 注意点：

1. 双大括号写法内部，只能写表达式，不能写语句，也不能调用 js 的方法

:::

## 修改数据

[setData](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#Page-prototype-setData-Object-data-Function-callback)

[使用注意点](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips/runtime_setData.html)

小程序中修改数据不推荐通过赋值的方式进行修改，通过赋值的方式修改数据无法改变页面的数据

而是要通过 `setData()` 方法进行修改，setData() 方法接收对象作为参数，key 是需要修改的数据，value 是最新的值

作用：

1. 更新数据
2. 驱动视图更新

## 简易双向数据绑定

[官网说明](https://developers.weixin.qq.com/miniprogram/dev/framework/view/two-way-bindings.html)

注意事项：

> 虽然官网有讲，但还是提一嘴

1. 只能是一个单一字段的绑定
2. 尚不能写 data 路径

## 渲染中的知识点

block 相当于 vue 中 template

hidden 相当于 vue 中 v-show

wx:if 相当于 vue 中 v-if
