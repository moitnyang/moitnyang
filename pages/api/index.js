// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from './db';

// 회원 가입
export default function handler(req, res) {
  const {body,method} =req;
  
  res.status(200).json("")


  function insertMember(){
    // 넘어온 회원 정보
    // body {name , id , pass , tel }
    // executeQuery("insert into member('id','name','pass','tel') vales(?,?,?,?)",[body.id, body.name, body.pass, body.tel])
    res.send("회원가입 성공")
  }

  function login(){
    // body {id, pass }
    // let loginCheck = executeQuery("select * from member where id= ? and pass =?",[body.id , body.pass])
    //if(loginCheck.length > 1) res.json({message : "성공" , memberinfo : loginCheck})
    //else res.json({message : "실패"})
  }

  switch(method){
    case "POST": insertMember(); break; //회원가입 
    case "GET": login(); break;  //로그인
    

  }
}
