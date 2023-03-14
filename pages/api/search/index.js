import { executeQuery } from "../db";

export default async function handler(req, res) {
    const { method, query } = req;
    const search = query.search;
    if (method === "GET") {
        const searchData = await executeQuery(`select * from product where product_title like '%${search}%' or product_content like '%${search}%' or member_id like '%${search}%' or product_dong like '%${search}%' `, [])
        res.status(200).json(searchData)
    }
}