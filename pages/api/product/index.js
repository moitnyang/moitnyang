
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
    const {query ,body, method } = req;


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
            const dong = req.body.dong;
            const lat = req.body.lat;
            const lng = req.body.lng;
            const member_id = req.body.id;
            // 년 월 일
            const now = new Date()
            const month = now.getMonth() + 1;
            const day = now.getDate();
            const date = `${month}.${day}`
            
            const uploadCheck = await uploadFile(fileBuffer, fileName, fileType);  //이미지 업로드에 관한 함수
            
            if (uploadCheck.status == 200) { //이미지 저장 성공
                //이미지 저장 성공시 DB에 저장INSERT INTO `product`(`product_no`, `product_title`, `product_price`, `product_img`, `product_content`, `product_date`, `product_lng`, `product_category`, `likenum`, `member_id`, `product_dong`, `product_lat`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-12]')
                await executeQuery("INSERT INTO product( product_title, product_price, product_img, product_content, product_date, product_lng, product_category, member_id, product_dong, product_lat) VALUES (?,?,?,?,?,?,?,?,?,?)",
                    [title, price, uploadCheck.url, content, date, lng, category, member_id, dong, lat]).then(res => {
                        console.log("저장");
                    })
                return res.status(200).json({
                    message: "성공"
                });
            }
            else {
                return res.send("이미지를 저장하지 못했습니다.")
            }
        }
        catch (error) {
            return res.send(error)
        }
    }

    const selectProduct = async () => {
        const member_id = query.id;
        // 전체 상품 불러오기
        var data = await executeQuery("SELECT * FROM product ORDER BY product_no DESC", []);
        // 좋아요한 상품 불러오기 member_id 를 갖고와야함
        var likeData = await executeQuery("SELECT * FROM product WHERE product_no IN (SELECT product_no FROM product_like WHERE member_id = ?)", [member_id])
        // 좋아요 랭크순 상품 불러오기
        var rankData = await executeQuery("SELECT * FROM product ORDER BY likenum DESC LIMIT 5",[]);
        return res.status(200).json({
            data,
            likeData,
            rankData
        });
    }
    switch (method) {
        case "POST": await insertProduct(); break; //상품작성 
        case "GET": await selectProduct(); break;  //상품불러오기


    }
    /*    res.status(200).json({ name: 'John Doe' }) */
}
