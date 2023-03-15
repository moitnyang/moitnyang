import { executeQuery } from "../db";

export default async function handler(req, res) {
  const { body, method, query } = req;

  if (method === "GET") {
    let loginCheck = await executeQuery(
      "select * from member where member_id=? and member_pass=?",
      [query.id, query.password]
    );
    res.json(loginCheck);
  }

  // only post method is accepted
  if (method === "POST") {
    var check = await executeQuery("select * from member where member_id = ?", [body.id])
    if (check.length > 0) {
      res.json({
        msg: "같은 아이디가 있습니다.",
        success: false
      })
    } else {
      await executeQuery(
        "insert into member (member_id,member_pass,name,member_tel) values (?,?,?,?) ",
        [body.id, body.password, body.username, body.phone]
      );
      res.json({
        msg: "회원가입 성공.",
        success: true
      })
    }


  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST Accepted" });
  }
}
