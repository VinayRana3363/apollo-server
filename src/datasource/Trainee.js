import pkg  from 'apollo-datasource-rest';
import config from '../config/configurations.js';

const { RESTDataSource } = pkg;

export default class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.SERVICE_URL}/api/trainee`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  createTrainee(payload) {
    return this.post('', payload);
  }

  updateTrainee(payload) {
    return this.put('', payload);
  }

  deleteTrainee(id) {
    return this.delete(`/${id}`, id);
  }

  getAllTrainee(skip, limit, sort) {
    return this.get(`/?skip=${skip}&limit=${limit}&sort=${sort}`);
  }

}