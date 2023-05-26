# vue-color-picker-gradient
## npm发布vue组件库模板，支持按需引入
## vue2写的组件
## Project setup
```
yarn install
```



## 二、组件库使用
npm install vue-color-picker-gradient -S

### 一、全局引入
```
// 在main.js中全局注册

import vueColorPickerGradient from 'vue-color-picker-gradient'
import 'vue-color-picker-gradient/lib/index/style.css'
Vue.use(vueColorPickerGradient)
```

#### 模板中使用方式：
```
<template>
  <div id="app">
    <VueColorPicker></VueColorPicker>
  </div>
</template>
```



### 二、按需部分引入
可以指定组件库中的某个组件单独引入。避免仅使用部分组件，要引入全部组件库的情况。
以引入组件库：vue-color-picker-gradient中的组件VueColorPicker为例

##### 配置：使用插件 babel-plugin-component
```
npm i babel-plugin-component -D
```

插件使用文档：https://www.npmjs.com/package/babel-plugin-component

在babel.config.js中增加
```
  "plugins": [
    [
      "component",
      {
        "libraryName": "vue-color-picker-gradient", // 组件的名称
        "camel2Dash": false,  // 组件路径保持驼峰，不自动转换为-连接
        "style": true   // 如果组件有样式文件，引入组件的单独的css
      }
    ],
  ]
```


#### 模板中使用方式：
```
<template>
  <div id="app">
    <VueColorPicker></VueColorPicker>
  </div>
</template>
```

#### 1. 直接全局注册：
```
// 在main.js中全局注册
import {VueColorPicker} from 'vue-color-picker-gradient'
Vue.use(VueColorPicker)
```


#### 2. 组件内部注册：
```
// 使用组件的.vue文件中局部注册
<script>
import {VueColorPicker} from 'vue-color-picker-gradient'
export default {
  components:{
    'VueColorPicker':VueColorPicker
  }
}
</script>
```
### 参考文章： 
[【npm】将自己的vue组件发布为npm包](https://www.jianshu.com/p/0fd669635b76)

[Vue Cli 3 搭建一个可按需引入组件的组件库架子](https://blog.csdn.net/weixin_33923762/article/details/91397133?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
