import { executeQuery } from "../db";

export default async function handler(req, res) {
  const { body, method, query } = req;

  if (method === "GET") {
    // const all = await executeQuery('select * from member',[]);

    let loginCheck = await executeQuery(
      "select * from member where id=? and password=?",
      [query.id, query.password]
    );
    res.json(loginCheck);
  }
  
  // only post method is accepted
  if (method === "POST") {
    await executeQuery(
      "insert into member (id,username,password,phone) values (?,?,?,?) ",
      [body.id, body.username, body.password, body.phone]
    );
    res.send("회원가입 완료!!!");
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}
