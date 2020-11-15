import * as bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import Controller from "./interfaces/controller.interface";
import * as dotenv from "dotenv";
import InitProjectSeed from "./seeds/initProjectSeed";
dotenv.config();

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initProject();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeErrorHandling() {}

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private connectToTheDatabase() {
    mongoose.connect(process.env.MONGO_SECRET, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });
  }

  private initProject() {
    new InitProjectSeed();
  }
}

export default App;
