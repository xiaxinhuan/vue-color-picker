<template>
  <img class="xi_guan" src="../../../../assets/images/xiguan.png" alt="" @click="nativePick">
</template>

<script>
import { hexToRgb } from "../../../../helpers";
export default {
  data() {
    return {
     
    };
  },
  props: {
      updateColor: Function,
    },
  methods: {
    async nativePick (e){
     const val =  e ? e.target.value : null
      if (val) {
        // console.log('获得颜色1: ' + val)
      } else {
        const eyeDropper = new EyeDropper() // 初始化一个EyeDropper对象
        // console.log('按Esc可退出')
        try {
          const result = await eyeDropper.open() // 开始拾取颜色
          // console.log('获得颜色2: ' + result.sRGBHex)
          const color = hexToRgb(result.sRGBHex);
          if (color) {
              this.updateColor(color);
          }
        } catch (e) {
          // console.log('用户取消了取色')
        }
      }
    }
  },
};
</script>