import Vue from 'vue'

// 样式
import './style/app.scss'

import App from 'src/views/app'

const isProduct = process.env.NODE_ENV === 'production'

Vue.config.productionTip = false
Vue.config.devtools = !isProduct

new Vue({
    el: '#app',
    template: '<app></app>',
    components: {App}
})
