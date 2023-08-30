import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const events: any = [];

app.post("/events", (req: Request, res: Response) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
  console.log("Received Event", event.type);
});

app.get("/events", (req: Request, res: Response) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
