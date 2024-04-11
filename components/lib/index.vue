<template>
  <div class="color_picker_content" ref="color_picker_content">
    <div class="color_picker_box" @click.stop>
      <div
        class="preview_color"
        @click="colorClick"
        :style="backgroundStyle"
      ></div>
      <div class="color_picker color_picker_panpel color_picker_panpel_dengta" ref="color_picker_panpel" v-if="renderShow" v-show="isShow">
        <div class="picker_type" v-show="typeShow">
          <div class="select_title" @click="selecShow = !selecShow">
            {{ selectTitle }}<img src="./assets/images/arrow.png" alt="" />
          </div>
          <div class="select_poper" v-show="selecShow">
            <p @click="typeSelect('1')" :class="{'checked' : (selectTitle==='纯色模式')}">纯色模式</p>
            <p @click="typeSelect('2')" :class="{'checked' : (selectTitle==='线性渐变')}">线性渐变</p>
            <p @click="typeSelect('3')" :class="{'checked' : (selectTitle==='径向渐变')}">径向渐变</p>
          </div>
        </div>
        <ColorPicker
          :color="color"
          :is-gradient="isGradient"
          :gradient="gradient"
          :onStartChange="color => onChange(color, 'start')"
          :onChange="color => onChange(color, 'change')"
          :onEndChange="color => onChange(color, 'end')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ColorPicker } from "./index.js";
import { hexToRgb,colorStylestringToObj } from "./helpers";

export default {
  name: "App",
  model: {
    prop: "InCommingColor",
    event: "colorChange",
  },
  props: {
    InCommingColor: {
      type: String,
      default: "#fff",
    },
    typeShow:{
      type: Boolean,
      default: true,
    }
  },
  components: {
    ColorPicker,
  },
  data() {
    return {
      renderShow: false,
      isShow: false,
      backgroundStyle:'',
      isGradient: false,
      selecShow: false,
      selectTitle: "纯色模式",
      color: {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
      },
      gradient: {
        type: "linear",
        degree: 0,
        points: [
          {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
          },
          {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1,
          },
        ],
      },
    };
  },
  watch: {
    InCommingColor: {
      handler(newValue) {
        // console.log('newValue',newValue)
        // 开放状态变更事件
        if (newValue) {
          this.backgroundStyle = `background:${newValue}`
          if (newValue.indexOf("linear-gradient") > -1) {
            // 线性渐变
            this.typeSelect('2')
            this.color = {
              red: 255,
              green: 0,
              blue: 0,
              alpha: 1,
            };
            this.gradient = colorStylestringToObj(newValue)
          } else if (newValue.indexOf("radial-gradient") > -1) {
            // 径向渐变
            this.typeSelect('3')
            this.color = {
              red: 255,
              green: 0,
              blue: 0,
              alpha: 1,
            };
            this.gradient = colorStylestringToObj(newValue)
          } else if (newValue.indexOf("rgba") > -1) {
            // 纯色 rgba
            let incommingColorLength = newValue.length - 1;
            let str = newValue.slice(5, incommingColorLength);
            let newArr = str.split(",");
            this.color = {
              red: newArr[0] * 1,
              green: newArr[1] * 1,
              blue: newArr[2] * 1,
              alpha: newArr[3] * 1,
            };
          } else {
            // 纯色 #fff
            this.color = hexToRgb(newValue);
          }
        }else{
          this.backgroundStyle = ''
        }
      },
      deep: true,
      immediate: true,
    }
  },
  mounted() {
    document.addEventListener("click", this.bodyCloseMenus);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.bodyCloseMenus);
  },
  methods: {
    onChange(attrs) {
      // console.log("name", name, attrs);
      // if (name == "change" || name == "end") {
      //   this.$emit("colorChange", attrs.style); //双向绑定的
      //   this.$emit("change", attrs);
      // }
      console.log('attrs',attrs)
      if (attrs.style !== this.InCommingColor) {
        // console.log('attrs',attrs)
        this.backgroundStyle = `background:${attrs.style}`
        this.$emit("colorChange", attrs.style); //双向绑定的
        this.$emit("change", attrs);
      }
    },
    typeSelect(val) {
      if (val === "1") {
        this.isGradient = false;
        this.selectTitle = "纯色模式";
      }
      if (val === "2") {
        this.isGradient = true;
        this.gradient.type = "linear";
        this.selectTitle = "线性渐变";
        this.gradient = {
          type: "linear",
          degree: 0,
          points: [
            {
              left: 0,
              red: 0,
              green: 0,
              blue: 0,
              alpha: 1,
            },
            {
              left: 100,
              red: 255,
              green: 0,
              blue: 0,
              alpha: 1,
            },
          ],
        }
      }
      if (val === "3") {
        this.isGradient = true;
        this.gradient.type = "radial";
        this.selectTitle = "径向渐变";
        this.gradient = {
          type: "radial",
          points: [
            {
              left: 0,
              red: 0,
              green: 0,
              blue: 0,
              alpha: 1,
            },
            {
              left: 100,
              red: 255,
              green: 0,
              blue: 0,
              alpha: 1,
            },
          ]
        }
      }
      this.selecShow = false;
    },
    colorClick(e) {
      if (!this.renderShow) {
        this.renderShow = true;
      }
      // 浏览器的宽高
      let documentCllientWidth = document.documentElement.clientWidth
      let documentCllientHeight = document.documentElement.clientHeight
      // 浏览器得滚动条
      let windowScrollX = document.documentElement.scrollLeft
      let windowScrollY = document.documentElement.scrollTop
      let previewLeftPx = this.$refs.color_picker_content.getBoundingClientRect().left + windowScrollX
      let previewTopPx = this.$refs.color_picker_content.getBoundingClientRect().bottom + windowScrollY
      let domRightPx = documentCllientWidth - this.$refs.color_picker_content.getBoundingClientRect().left
      let domBottomtPx = documentCllientHeight - this.$refs.color_picker_content.getBoundingClientRect().bottom
      // console.log(this.$refs.color_picker_content.getBoundingClientRect())
      this.$nextTick(()=>{
        const body = document.querySelector('body')
        body.append(this.$refs.color_picker_panpel)
        this.$refs.color_picker_panpel.style.left =  previewLeftPx + 'px';
        this.$refs.color_picker_panpel.style.top =  previewTopPx + 'px'
        // 防止 color_picker_panpel 右侧超出浏览器被挡住
        let translatexPx = 0; let translateYPx = 0;
        if(domRightPx < 300){
           translatexPx = 320 - domRightPx
        }
        if(domBottomtPx < 300){
          translateYPx = 320 - domBottomtPx
        }
        this.$refs.color_picker_panpel.style.transform =  `translate(-${translatexPx}px,-${translateYPx}px)`
        // console.log('this.$parent',this,this.$parent.$children,this.$parent.$children[0]._uid)
        // 同一个页面中只打开一个color_picker_panpel
        // let domsRefs = this.$parent.$children
        // if(domsRefs && domsRefs.length>0){
        //   for(let i=0;i<domsRefs.length;i++){
        //     if(domsRefs[i].$refs.color_picker_panpel){
        //       domsRefs[i].$refs.color_picker_panpel.isShow = false
        //       console.log(domsRefs[i].$refs.color_picker_panpel.isShow)
        //     }
            
        //   }
        // }
        // console.log(domsRefs)
        this.isShow = true;
      })
    },
    bodyCloseMenus(e) {
      // console.log('sasa',e)
      if(!this.$refs.color_picker_panpel) return false;
      let self = this;       
      var elem = e.target;
      var targetArea = this.$refs.color_picker_panpel;
      // 点击色板外面的区域关闭本色板
      if(!targetArea.contains(elem)) self.isShow = false;
    },
  },
};
</script>

<style src="@/lib/index.scss" lang="scss" scoped />
<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
}
.color_picker_content {
  position: relative;
}
.color_picker_box {
  width: 100%;
}
.preview_color {
  width: 30px;
  height: 30px;
  border: 1px solid #999;
  cursor: pointer;
}
.color_picker {
  position: absolute;
  z-index: 2053;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  .picker_type {
    color: #505a71;
    position: relative;
    font-size: 14px;
    color: #1b2337;
    padding: 12px 16px;
    border-bottom: 1px solid #D0D0DE;
    .select_title {
      cursor: pointer;
      width: 100px;
      color: #252525;
      img {
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
    }
    .select_poper {
      position: absolute;
      top: 30px;
      left: 0;
      width: 100%;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 8px 16px rgb(42 49 67 / 6%), 0 4px 8px rgb(42 49 67 / 4%),
        0 12px 28px rgb(42 49 67 / 6%);
      width: 120px;
      z-index: 1000;
      p {
        box-sizing: border-box;
        color: #1b2337;
        cursor: pointer;
        font-size: 14px;
        line-height: 22px;
        padding: 9px 0 9px 16px;
        width: 120px;
        color: #8D8DA7;
      }
      p.checked{
        color: #252525;
      }
    }
  }
}
</style>
