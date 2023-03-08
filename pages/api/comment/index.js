
import { executeQuery } from "../db";


export default function handler(req, res) {
    const { body, method } = req;



    async function insertComment() {
        const content = body.content;
        console.log(body.content)
        const date = new Date().getTime();
        const id = "hoon"  // ID
        const no = "1";    // 상품 NO
        await executeQuery("INSERT INTO comment(`comment_content`, `comment_date`, `member_id`, `product_no`) VALUES (?,?,?,?)",
            [content, date, id, no])
        return res.status(200).json("댓글 저장")
    }
    async function selectComment() {
        const no = "1";    // 상품 NO
        var data = await executeQuery("select * from comment where product_no = ?",[no])

        return res.status(200).json(data);

    }

    switch (method) {
        case "POST": insertComment(); break; //댓글작성 
        case "GET": selectComment(); break;  //불러오기


    }

}