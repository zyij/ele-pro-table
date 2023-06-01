// 引入封装好的组件
import EleProTable from "@/components/ProTable/index.vue";

// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// custom element css
import "@/styles/element.scss";


// 批量组件注册
const install = function (Vue: any) {
  Vue.component("EleProTable", EleProTable);
};

export default install; // 这个方法使用的时候可以被use调用
