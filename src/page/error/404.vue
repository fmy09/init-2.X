<!-- 404页面 -->
<template>
  <div class="error">
    <div class="error-info">
      <img src="../../../static/image/style/404.png" alt="">
      <p>很抱歉，您要访问的页面不存在！</p>
      <button @click="back">返回上一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  // 方法集合
  methods: {
    back: function () {
      this.$router.go(-1)
    }
  }
}
</script>
