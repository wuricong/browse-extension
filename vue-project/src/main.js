import { createApp } from "vue"
import App from "./App.vue"
import Antd from "ant-design-vue"
import "./styles/tailwind.css"
import SvgIcon from "@/svg/svg-icon.vue"
import "virtual:svg-icons-register"
import "ant-design-vue/dist/reset.css"
const app = createApp(App)
app.use(Antd)
app.component("svgIcon", SvgIcon)
app.mount("#app")



