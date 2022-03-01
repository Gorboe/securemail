import Home from '../containers/home/index.vue';
import InspectMail from '../containers/inspectmail/index.vue';
import SendMail from '../containers/sendmail/index.vue';

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
  {
    path: '/sendmail',
    name: 'SendMail',
    component: SendMail,
  },
];

export default routes;
