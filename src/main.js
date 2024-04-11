import Vue from 'vue';
import App from './App.vue';

import vueUiDemo from 'dengta-color-picker';
Vue.use(vueUiDemo);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
