import { createApp } from 'vue'
import { createDexa } from '@dexa-ui/vue'
import '@dexa-ui/css'
import '../../shared/playground.css'
import App from './App.vue'

createApp(App).use(createDexa()).mount('#app')
