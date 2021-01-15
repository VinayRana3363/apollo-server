import Express from 'express';
import pkg from 'apollo-server-express';

const { ApolloServer } = pkg;
class Server {
  constructor(config) {
    this.config = config;
    this.app = Express();
  }

  bootstrap() {
    // this.setupApollo(schema);
    // return this;
    this.setupRouts();
    return this;
  }

  setupRouts() {
    const { app } = this;
    app.get('/health-check', (req, res, next) => {
      res.send('I am fine');
    });
    return this;
  }

  setupApollo(schema) {
    const { app } = this;
    this.Server = new ApolloServer({
      ...schema
    });
    this.Server.applyMiddleware({ app });
    this.run();
  }

  run() {
    const { app, config: { PORT } } = this;
    app.listen(7000, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`App is running on port ${PORT}`);
    });
  }
}
export default Server;
