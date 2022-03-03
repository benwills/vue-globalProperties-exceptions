import { createApp } from 'vue'
import App from './App.vue'
import TestPlugin from './plugins/TestPlugin'

const app = createApp(App)
app.use(TestPlugin, {
  greetings: {
    hello: 'Bonjour!'
  },
  departures: {
    goodbye: 'Au revoir!'
  },
});
app.mount('#app')
