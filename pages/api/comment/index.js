
import { executeQuery } from "../db";


export default async function handler(req, res) {
    
    const { body, method, query} = req;
    const selectComment = async()=> {
        
        const data = await executeQuery("SELECT * FROM comment",[])
        return res.status(200).json(data);

    }
    switch (method) {

        case "GET": await selectComment(); break;  //불러오기
    }

}