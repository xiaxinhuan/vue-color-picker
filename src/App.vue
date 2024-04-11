<template>
  <div id="app">
    <div class="test_scroll" ref="testScroll">
      <div class="btn" @click="clickEvent">按钮</div>
      <VueColorPicker style="margin-top:200px"></VueColorPicker>
      <!-- <VueColorPicker style="margin-left:800px"></VueColorPicker> -->
    </div>
    
  </div>
</template>
<script>
export default {
  name:'App',
  methods:{
    clickEvent(){
      let domRef = this.$refs.testScroll
      domRef.style.height = '2000px'
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn{
  padding: 16px 32px;
  cursor: pointer;
}
</style>
