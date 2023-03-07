import connectMongo from "@/database/conn";
import { executeQuery } from "../db";

export default async function handler(req, res){
  connectMongo().catch(error => res.json({ error: "Connection Failed...!"}))
  const {body, method} = req;

  if(method === 'GET'){
    // const all = await executeQuery('select * from member',[]);
    const all = await executeQuery('select * from member where id=?',[2]);
    res.json(all)
  }
  // only post method is accepted
  if(method === 'POST'){
    await executeQuery('insert into member (name,password,email) values (?,?,?) ',[body.username, body.password, body.email]);
    res.send('회원가입 완료!!!')
  } else{
      res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
  }

}
