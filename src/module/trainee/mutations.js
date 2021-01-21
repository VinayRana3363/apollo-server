import userInstance from '../../service/user.js';
import pubsub from '../pubsub.js';
import constant from '../../lib/constant.js';

export default {
  createTrainee: async (parent, args, context) => {
    const { user } = args;
    const { dataSources: { traineeAPI } } = context;
    const addedUser = await traineeAPI.createTrainee({ userData: { ...user } });
    pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: addedUser.data });
    return addedUser.data;
  },
  updateTrainee:async (parent, args, context) => {
    const { user } = args;
    const { dataSources: { traineeAPI } } = context;
    const updatedUser = await traineeAPI.updateTrainee({...user});
    pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: updatedUser.data });
    return updatedUser.data;
  },
  deleteTrainee: async (parent, args, context) => {
    const { id } = args;
    const { dataSources: { traineeAPI } } = context;
    const deletedUser = await traineeAPI.deleteTrainee(id);
    console.log(deletedUser);
    pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: deletedUser.data });
    return deletedUser.data;
  }
};
