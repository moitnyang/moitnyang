
import { executeQuery } from "../db";


export default async function handler(req, res) {
    const { method ,query } = req;
    const id = query.id
    if (method === "GET" && id) {
        try {
            var data = await executeQuery("select * from product where product_no = ?", [id])
            res.status(200).json(data);
        }
        catch {
            res.send("에러!!")
        }
    }
   /*  res.send("성공") */

}