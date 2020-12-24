import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)

import App from './App.vue'
import router from './router'
import registerComponents from './components'
import registerEditComponents from './editComponents'

import VueDraggableResizable from 'vue-draggable-resizable'

Vue.config.productionTip = false

// 全局使用组件
Vue.use(ElementUI)
Vue.component('vue-draggable-resizable', VueDraggableResizable)

// 注册组件，分离写法，以后增加组件不需要修改这个文件
registerComponents(Vue)
registerEditComponents(Vue)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
