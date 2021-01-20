import Express from 'express';
import { createServer } from 'http';
import pkg from 'apollo-server-express';
import { UserAPI } from './datasource/index.js';

class Server {
  constructor(config) {
    this.config = config;
    console.log('config: ', config);
    this.app = Express();
  }

  bootstrap() {
    this.setupRouts();
    return this;
  }

  setupRouts() {
    const { app } = this;
    app.get('/health-check', (req, res) => {
      res.send('I am fine');
    });
    return this;
  }

  setupApollo(schema) {
    const { app } = this;
    const { ApolloServer } = pkg;
    this.Server = new ApolloServer({
      ...schema,
      dataSources: () => {
        const userAPI = new UserAPI();
        return { userAPI };
      },
      context: ({ req }) => {
        if (req) {
          return { token: req.headers.authorization};
        }
        return {};
      }
    });
    this.Server.applyMiddleware({ app });
    this.httpServer = createServer(app);
    this.Server.installSubscriptionHandlers(this.httpServer);
    this.run();
  }

  run() {
    const { config: { PORT } } = this;
    this.httpServer.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`App is running on PORT ${PORT}`);
    });
  }
}
export default Server;