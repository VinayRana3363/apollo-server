import user from '../../service/user.js';

export default {
  getAllTrainees: async(parent, args, context) => {
    const { dataSources: { traineeAPI } } = context;
    const{ payload: { skip, limit, sort }} = args;
    const response = await traineeAPI.getAllTrainee(skip, limit, sort);
    console.log(response);
    return response;
  },
  getTrainee: (parent, args) => {
    const { id } = args;
    return user.getUser(id);
  }
};
