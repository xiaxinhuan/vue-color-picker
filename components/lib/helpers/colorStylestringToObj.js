import { hexToRgb } from "./index";
export default function colorStylestringToObj(colorStyle) {
    // 参考示例 radial-gradient(rgba(104, 142, 101, 1) 0.9105714977297008%,rgba(224, 217, 29, 1) 100%)
    // console.log('colorStyle',colorStyle)
    let str = '' , arr=[], points = [], gradientType="",degree = 0;
    if(colorStyle.indexOf("radial-gradient") > -1){
      gradientType = 'radial'
      // radial-gradient( 字符串长度16 
      str = colorStyle.slice(16, colorStyle.length-2)
      arr = str.split("%,")
    }else if(colorStyle.indexOf("linear-gradient") > -1){
      gradientType = 'linear'
      // linear-gradient( 字符串长度16 
      str = colorStyle.slice(16, colorStyle.length-2)
      arr = str.split("%,")
      let newStr = arr[0]
      degree = newStr.split("deg")[0]*1
      var index = newStr.indexOf(',') + 1
      arr[0] = newStr.slice(index,newStr.length)
    }
    // console.log('arr',arr)
    points = arr.map((item)=>{
      if(item.indexOf("rgba") > -1){
        let str2 = item.split(')')[1]
        let str3 = item.split(')')[0]
        let str4 = str3.slice(5,str3.length)
        let newStrArr = str4.split(",")
        return {
          left: str2*1,
          red: newStrArr[0]*1,
          green: newStrArr[1]*1,
          blue: newStrArr[2]*1,
          alpha: newStrArr[3]*1,
        }
      }else if(item.indexOf("#") > -1){
        let str2 = item.trim().replace("%","")
        let newStrArr = str2.split(" ")
        let newObj = hexToRgb(newStrArr[0])
        return {
          left: newStrArr[1]*1,
          alpha: 1,
          ...newObj
        }
      }
    })
    // console.log('points',points)
    return {
      type: gradientType,
      degree: degree,
      points: points,
    }
}
