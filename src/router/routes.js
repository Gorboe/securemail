// import Home from '../containers/home/index.vue';
import InspectMail from '../containers/inspectmail/index.vue';
import SendMail from '../containers/sendmail/index.vue';
import ShowMail from '../containers/showmail/index.vue';

const routes = [
  {
    path: '/',
    name: 'SendMail',
    component: SendMail,
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
  {
    path: '/showmail',
    name: 'ShowMail',
    component: ShowMail,
  },
];

export default routes;
