import userInstance from '../../service/user.js';
import pubsub from '../pubsub.js';
import constant from '../../lib/constant.js';

export default {
  createTrainee: (parent, args) => {
    const { user } = args;
    const addedUser = userInstance.createUser(user);
    pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: addedUser });
    return addedUser;
  },
  updateTrainee: (parent, args) => {
    const { user } = args;
    const updatedUser = userInstance.updateUser(user);
    pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: updatedUser });
    return updatedUser;
  },
  deleteTrainee: (parent, args) => {
    const { id } = args;
    const deletedId = userInstance.deleteUser(id);
    pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: deletedId });
    return deletedId;
  }
};
