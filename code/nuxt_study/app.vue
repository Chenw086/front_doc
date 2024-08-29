<template>
	<h1>路由学习</h1>

  <!-- 路由的跳转是在客户端进行的 -->
  <NuxtLink to="/login">登陆页面</NuxtLink>
  <br>
  <NuxtLink to="/">首页</NuxtLink>

  <!-- 这个在 nuxt 里面不能正常的运行 -->
  <!-- <router-view></router-view> -->
   <div>
    <nuxtPage></nuxtPage>
   </div>
</template>

<script setup>

</script>

<style lang="scss"></style>
