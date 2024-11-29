---
title: 小程序 - 事件
---

# 事件

::: info 信息
`所有的内容都在 02-event 项目中，对照着文档测试学习，这里不详细展开`

事件文档: [地址](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)

事件冒泡：[文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E5%88%86%E7%B1%BB)
:::

小程序中绑定事件与在网页开发中绑定事件几乎一致，只不过在小程序不能通过 on 的方式绑定事件，也没有 click 事件

`小程序中绑定事件使用 bind 方法，click 事件也需要使用 tap 事件来进行代替`，绑定事件的方式有两种：

1. bind:事件名: bind:tap
2. bind 事件名: bindtap

`事件处理函数需要写到 .js 文件中`，在 .js 文件中需要调用小程序提供的 Page 方法来注册小程序的页面，我们可以直接在 Page 方法中创建事件处理函数

- target 与 currentTarget 区别

target： 它指向的是触发事件的那个最原始的元素，也就是事件真正的源头元素

currentTarget：它指向的是当前正在执行事件处理函数的那个元素，通常就是绑定事件的元素
