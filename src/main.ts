import { createApp } from 'vue'
import './style.css'

// Components
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.$lang = "pt_BR"
app.mount('#app')
