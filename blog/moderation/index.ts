import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status: string = data.content.includes("orange")
      ? "rejected"
      : "approved";

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        ...data,
        status,
      },
    });
  }
});

app.listen(4003, () => {
  console.log("Listening on port 4003");
});
