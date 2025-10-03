import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';
import './styles/tailwind.css'
import SvgIcon from '@/svg/svg-icon.vue'
import 'virtual:svg-icons-register'
const app = createApp(App)
app.use(Antd)
app.component('svgIcon',SvgIcon)
app.mount('#app')
