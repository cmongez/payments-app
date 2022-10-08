import Vue from 'vue';
import VueRouter from 'vue-router';
import PaymentsApp from '../components/PaymentsApp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'PaymentsView',
    component: PaymentsApp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
