---
title: 小程序 - 组件和样式
---

# 组件和样式

## 组件

在开发 Web 网页的时候：页面的结构由 html 进行编写，例如： div、p、span、img、a 等

页面的样式由 css 进行编写，例如：经常会采用 .class、#id、element 等选择器

`但在小程序中不能使用 html 标签，也就没有 dom 和 bom，css 也仅仅支持部分选择器`

`小程序提供了 wxml 进行网页结构编写，同时提供了 wxss 进行页面的样式编写`

wxml 提供了 view、text、image、navigator 等标签来构建页面结构，只不过在小程序中将标签称为`组件`

wxss 对 css 扩充和修改，新增了尺寸单位 rpx、提供了全局的样式和局部样式，另外需要注意的是 `wxss 仅支持部分 css 选择器`

[官方说明](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

## 样式

### rpx

[官方说明 - rpx](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)

::: code-group

```html [wxml]
<!-- 绘制一个盒子，让盒子高度占据屏幕的一半 -->
<view class="box">陈伟测试</view>
```

```scss [scss]
// 不能使用 px，px 是固定单位
.box {
	width: 375rpx;
	background-color: red;
}
```

:::

- 全局与局部样式

定义在 app.wxss 中的样式为全局样式，作用于每一个页面。在 page 的 wxss 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。
