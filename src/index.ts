import express, { Request, Response, Express } from "express";
import mysql, { PoolOptions, RowDataPacket, Connection, FieldPacket } from "mysql2/promise";

const port : number = Number(process.env["PORT"]) || 3000;

const app : Express = express();

const access : PoolOptions = {
  host: process.env["DB_HOST"] || "",
  port: Number(process.env["DB_PORT"]) || 0,
  user: process.env["DB_USER"] || "",
  password: process.env["DB_PASSWORD"] || "",
  database: process.env["DB_DATABASE"] || ""
}

const conn: Connection = mysql.createPool(access);


interface RenglonCalif extends RowDataPacket {
  id : number,
  name: string,
  grade : number
};

interface SummaryData {
  id: number,
  approved: boolean
};
app.get("/summary", async(req: Request, res: Response)=>{
  try{
    const dbResult : [RenglonCalif[], FieldPacket[]] =
      await conn.query("SELECT * FROM califs");
    const mapResult : SummaryData[] = dbResult[0].map(
          (unRenglon :RenglonCalif)=>{
            return {
              "id": unRenglon.id,
              "approved": unRenglon.grade >= 7
            }
          });

    res.send(mapResult);
  }catch(err){
    console.log(err);
    res.send("Error interno");
  }
});


app.post("/add", async (req: Request, res: Response)=>{
  /*
  console.log(req.query);
  console.log(req.query["id"]);
  INSERT INTO <tabla> (<col1>, <col2>) VALUES (<val1>, <val2>);
  */
  try{
    const dbResult = await conn.query(
      "INSERT INTO califs (name, grade) VALUES (?, ?)",
      [req.query["name"], Number(req.query["grade"])]
    )
    res.send(dbResult[0]["insertId"]);
  }catch(err){
    res.send("Error interno");
  }
});


app.get("/info", async(req: Request, res: Response)=>{
  try{
    const dbResult: [ RenglonCalif[], FieldPacket[] ] =
      await conn.query("SELECT * FROM califs");
    res.send(dbResult[0]);
  }catch(err){
    console.log(err);
    res.send(":(");
  }
});


app.get("/id/:identificador", async (req: Request, res: Response)=>{
  try{
    const dbResult : [ RenglonCalif[], FieldPacket[]] =
      await
      conn.query(`SELECT * FROM califs WHERE id = ?`, [req.params["identificador"]]);
    res.send(dbResult[0]);
  }catch(err){
    res.send("Error");
  }
});




app.listen(port, ()=>{
  console.log(`Running: ${port}`);
});
