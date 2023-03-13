import multer from "multer";

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

    // 이미지를 upload 정보를 db에 저장
    if (req.method === "POST") {
        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage });
        try {
            await runMiddleware(req, res, upload.single("image"))
            const title = req.body.title;
            const category = req.body.category;
            const content = req.body.content;
            const fileBuffer = req.file.fileBuffer;
            const fileName = req.body.name;
            const fileType = req.file.mimetype;
            const uploadCheck = await uploadFile(fileBuffer, fileName, fileType);  //이미지 업로드에 관한 함수
            if (uploadCheck.status == 200) //이미지 저장 성공
                return res.status(200).json({
                    message: "성공"
                   
                });
            
        }
        catch (error) {
            console.log(error);
            return res.send(error)
        }
    }
    res.status(200).json({ name: 'John Doe' })
}