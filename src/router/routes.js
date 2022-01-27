import Home from '../containers/home/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { scrollToTop: true },
  },
];

export default routes;
