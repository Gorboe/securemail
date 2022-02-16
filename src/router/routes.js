import Home from '../containers/home/index.vue';
import InspectMail from '../containers/inspectmail/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { scrollToTop: true },
  },
  {
    path: '/inspectmail',
    name: 'InspectMail',
    component: InspectMail,
  },
];

export default routes;
