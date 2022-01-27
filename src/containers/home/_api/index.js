import BaseApiClient from '../../../api/baseapiclient';

export default class ApiClient extends BaseApiClient {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  async fetch() {
    return this.get('data/2.5/weather?q=London&appid=5eb8db130a46874b305b27c19d716778&units=metric');
  }
}
