import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,

} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // s3의 저장위치의 url을 받아오는 라이브러리
const awsAccessKey = process.env.MY_AWS_ACCESS_KEY;
const awsSecretKey = process.env.MY_AWS_SECRET_KEY;
const awsS3Bucket = process.env.MY_AWS_S3_BUCKET;
const awsS3BucketRegion = process.env.MY_AWS_S3_BUCKET_REGION;
const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
  region: awsS3BucketRegion,

})

export async function uploadFile(fileBuffer, fileName, mimetype) {

  //저장할 bucket의 위치와 이미지파일 이름, 데이터, 타입을 저장
  const uploadParams = {
    Bucket: awsS3Bucket,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype
  }
  
  // s3 저장 위치에 접근
  const command = new GetObjectCommand(uploadParams);
  // s3에 bucket에 이미지정보를 보내서 저장하고 성공,실패값을 받아옴
  //const res = await s3.send(new PutObjectCommand(uploadParams));
  // 저장 위치의 url을 받아옴
  var url = await getSignedUrl(s3, command, { expiresIn: 3600 })

  return {status:res.$metadata.httpStatusCode, url:url.split("?")[0]};
}


