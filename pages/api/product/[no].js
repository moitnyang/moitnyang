
import { executeQuery } from "../db";


export default async function handler(req, res) {
    const { method, query } = req;
    const product_no = query.no
    //console.log(product_no)
    const selectProductInfo = async () => {
        if (product_no) {
            try {
                const data = await executeQuery("SELECT * FROM product where product_no = ?", [product_no])
                return res.status(200).json(data);
            }
            catch(e){
                return res.status(500).json({msg : e})
            }
        }
        else {
            return res.status(500).send("에러!!")
        }

    }
    switch (method) {
        case "GET": await selectProductInfo(); break;
    }

}