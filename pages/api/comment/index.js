
import { executeQuery } from "../db";


export default async function handler(req, res) {
    const { body, method } = req;

    const insertComment=async()=> {
        const comment_content = body.content;
        const now = new Date()
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const comment_date = `${year}.${month}.${day}`
        const comment_id = "hoon"  // ID
        const comment_no = "1";    // 상품 NO
        await executeQuery("INSERT INTO comment(comment_content, comment_date, member_id, product_no) VALUES (?,?,?,?)",
            [comment_content, comment_date, comment_id, comment_no])
        return res.status(200).json("댓글 저장");
    }

    const selectComment = async()=> {
        const product_no =5;    // 상품 NO
        const data = await executeQuery("SELECT * FROM comment WHERE product_no = ?", [product_no])
        return res.status(200).json(data);

    }
   
    switch (method) {
        case "POST": await insertComment(); break; //댓글작성 
        case "GET": await selectComment(); break;  //불러오기
    }
}  