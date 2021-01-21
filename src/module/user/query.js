export default {
  getMyProfile: async (parent, args, context) => {
    const { dataSources: { userAPI } } = context;
    const response = await userAPI.getMe();
    console.log(response);
    return response.user;
  }
};
