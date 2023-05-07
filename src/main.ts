import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./assets/tailwind.css"
import {Amplify} from "aws-amplify";
import AmplifyVue from '@aws-amplify/ui-vue';
// @ts-ignore
import aws_exports from "./aws-exports";
// @ts-ignore
import store from './store'

Amplify.configure(aws_exports);

const app = createApp(App).use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(AmplifyVue);
app.use(router).mount('#app');
