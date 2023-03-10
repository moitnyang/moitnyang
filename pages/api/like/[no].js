
import { executeQuery } from "../db";


export default async function handler(req, res) {

    const { body, method, query } = req;

    const product_no = query.no;
    const member_id = "hoon"

    const updataLike = async () => {
        var msg = "";
        var likeData;
        if (product_no && member_id) {
            
            var likeCk = await executeQuery("SELECT * FROM product_like WHERE member_id = ? AND product_no = ?", [member_id, product_no])
            if (likeCk.length > 0) {
                await executeQuery("UPDATE product SET likenum = likenum - 1 WHERE product_no = ?", [product_no]);
                await executeQuery("DELETE FROM product_like WHERE member_id = ? AND product_no = ?", [member_id, product_no])
                likeData = await executeQuery("SELECT * FROM product WHERE product_no IN (SELECT product_no FROM `product_like` WHERE member_id = 'hoon')", [])
                msg = "좋아요 삭제"
            }
            else {
                await executeQuery("UPDATE product SET likenum = likenum + 1 WHERE product_no = ?", [product_no]);
                await executeQuery("INSERT INTO product_like(member_id, product_no) VALUES (?,?)", [member_id, product_no]);
                likeData = await executeQuery("SELECT * FROM product WHERE product_no IN (SELECT product_no FROM `product_like` WHERE member_id = 'hoon')", [])
                    msg="좋아요 추가"
            }
            return res.status(200).json({
                msg,
                likeData
            })
        }
    }

    switch (method) {

        case "PUT": await updataLike(); break;
    }
}