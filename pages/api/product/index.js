import multer from "multer";
import { executeQuery } from "../db";
import { uploadFile } from "./upload"
// multer는 미들웨어 형태로 구동된다
// 프로미스 객체 생성하여 직접 구현
// 참고 : https://github.com/vercel/next.js/discussions/37886

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}
// multer bodyParser를 false로 설정해야 multer에서 
// FormData에 있는 데이터를 받아서 처리 가능
export const config = {
    api: {
        bodyParser: false
    }
}
export default async function handler(req, res) {
    const { body, method } = req;


    async function insertProduct() {
        // 이미지를 upload 정보를 db에 저장
        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage });
        try {
            await runMiddleware(req, res, upload.single("image"))
            const fileBuffer = req.file.buffer;
            const fileName = req.body.name;
            const fileType = req.file.mimetype;
            const title = req.body.title;
            const price = req.body.price;
            const content = req.body.content;
            const category = req.body.category;
            const date = new Date().getTime();
            const location = "논현동";  // 위치
            const member_id = "hoon"  // id
            //console.log(req.file.buffer,fileName,fileType)
            const uploadCheck = await uploadFile(fileBuffer, fileName, fileType);  //이미지 업로드에 관한 함수
            if (uploadCheck.status == 200) { //이미지 저장 성공
                //이미지 저장 성공시 DB에 저장
                await executeQuery("INSERT INTO product( `product_title`, `product_price`, `product_img`, `product_content`, `product_date`, `product_location`, `product_category`, `member_id`) VALUES (?,?,?,?,?,?,?,?)",
                    [title, price, uploadCheck.url, content, category, date, location, member_id]).then(res => {
                        console.log("저장");
                    })
                /* await executeQuery("insert into member values(?,?,?,?)",["hoon1","1234","테스트","000000"]) */
                return res.status(200).json({
                    message: "성공"
                });
            }
            else{
                return res.send("이미지를 저장하지 못했습니다.")
            }
        }
        catch (error) {
            console.log(error);
            return res.send(error)
        }
    }
   
    const selectProduct = async()=>{
        const id = "hoon"
        // 전체 상품 불러오기
        var data = await executeQuery("select * from product",[]);
        // 좋아요한 상품 불러오기 member_id 를 갖고와야함
        var likeData = await executeQuery("SELECT * from product WHERE product_no IN (SELECT product_no FROM `product_like` WHERE member_id = 'hoon')",[])
        return res.status(200).json({
            data,
            likeData
        });
    }
    switch (method) {
        case "POST": insertProduct(); break; //상품작성 
        case "GET": selectProduct(); break;  //상품불러오기


    }
 /*    res.status(200).json({ name: 'John Doe' }) */
}