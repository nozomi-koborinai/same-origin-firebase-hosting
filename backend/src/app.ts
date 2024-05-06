import express, { Application, Request, Response } from "express";
import { query } from './postgres';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello-world", async (req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

app.get('/data', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM your_table_name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

const port = process.env.PORT || 8000;
try {
  app.listen(port, () => {
    console.log(`Running at Port ${port}...`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}