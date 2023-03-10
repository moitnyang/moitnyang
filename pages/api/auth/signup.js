
import { executeQuery } from "../db";

export default async function handler(req, res){

  const {body, method} = req;

  if(method === 'GET'){
    // const all = await executeQuery('select * from member',[]);
    const all = await executeQuery('select * from member where id=?',[2]);
    res.json(all)
  }
  // only post method is accepted
  if(method === 'POST'){
    await executeQuery('insert into member (id,username,password,phone) values (?,?,?,?) ',[body.id, body.password, body.username,  body.phone]);
    res.send('회원가입 완료!!!')
  } else{
      res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
  }

}
