import { executeQuery } from "../db";

export default async function handler(req, res) {
  const { body, method, query } = req;

  if (method === "GET") {
    // const all = await executeQuery('select * from member',[]);
    console.log(query.id, query.password)
    let loginCheck = await executeQuery(
      "select * from member where member_id=? and member_pass=?",
      [query.id, query.password]
    );
    res.json(loginCheck);
  }
  
  // only post method is accepted
  if (method === "POST") {
    await executeQuery(
      "insert into member (member_id,member_pass,member_name,member_tel) values (?,?,?,?) ",
      [body.id, body.password, body.username, body.phone]
    );
    res.send("회원가입 완료!!!");
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}