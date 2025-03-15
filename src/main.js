import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'

import RootRoute from './routes/RootRoute.vue'

import TestRoute from './routes/set/TestRoute.vue'

import CardsRoute from './routes/set/test/CardsRoute.vue'
import ChoiceRoute from './routes/set/test/ChoiceRoute.vue'
import QuizRoute from './routes/set/test/QuizRoute.vue'
import LearnRoute from './routes/set/test/LearnRoute.vue'


const routes = [
  { path: "", component: RootRoute },
  { path: "/:set_id", component: TestRoute },
  { path: "/:set_id/learn", component: LearnRoute },
  { path: "/:set_id/quiz", component: QuizRoute },
  { path: "/:set_id/choice", component: ChoiceRoute },
  { path: "/:set_id/cards", component: CardsRoute },
]

const router = createRouter({
  history: createWebHistory("/fishki-frontend/"),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
