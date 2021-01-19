import pkg from 'apollo-server-express';
const { PubSub } = pkg;

const pubSubObject = new PubSub();
export default pubSubObject;
