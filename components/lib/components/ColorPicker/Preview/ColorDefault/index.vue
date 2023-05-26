<template>
  <div class="defalut_color_box">
    <div class="defalut_color_value" v-for="(item) in defaultColorList" :key="item.id" :style="`background:${item.value}`" @click="colorChange(item.value)"></div>
  </div>
</template>

<script>
import { hexToRgb } from "../../../../helpers";
export default {
  data() {
    return {
      defaultColorList: [
        {value:'#FA1B1B',id:1},
        {value:'#010000',id:2},
        {value:'#FFFFFF',id:3},
        {value:'#5021C5',id:4},
        {value:'#FED130',id:5},
      ]
    };
  },
  props: {
    updateColor: Function,
  },
  methods: {
    colorChange(value){
      const color = hexToRgb(value);
      if (color) {
        this.updateColor(color);
      }
    }
  },
};
</script>