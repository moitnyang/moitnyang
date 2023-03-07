import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import styles from '@/styles/write.module.scss';
import { CategoryTranslate } from '../_app';

function Write() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [data, setData] = useState([]);
  const { categoryTranslate } = useContext(CategoryTranslate);
  const categoryList = ['baby', 'book', 'furniture', 'hobby', 'fashion', 'homeAppliance', 'householdGoods', 'petSupplies', 'sport'];


  const uploadToClient = (e) => {
    axios.get("/api").then(res=>{
      console.log(res.data);
    })
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      if (i.size > 500000) { //500kb 제한
        alert("파일사이즈가 초과하였습니다.");
      }
      else {
        setImage(i);
        encodeFileToBase64(i);
      }

    }
  }
  //업로드 사진 로직
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  //글 올리기
  const write = async() => {
    if (image && data.title && data.category && data.content && data.category != "n") {
      const body = new FormData();
      // db에 저장될 정보를  FormData에 담아서 api로 전달
      const fileName = "uploads/" + Math.random().toString(36).substring(2, 11) + new Date().getTime() + image.name;
      body.append("image", image);
      body.append("name", fileName);
      body.append("title", data.title)
      body.append("category", data.category)
      body.append("content", data.content)
      try {
        await axios.post('/api/product', body, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res=>{
          console.log(res.data)   //확인
        });
      }
      catch (err) {
        console.log(err)
      }
    }
    else {
      alert('입력하지 않은 정보가 있습니다.')
    }
  }
  // 가격 정규식
  const priceCk=(e)=>{
    var price = e.target.value; //받은 값
    let check = /^[0-9]+$/;  // 숫자만 추출하는 정규식
    if(!check.test(price)){
      alert("숫자만 입력 가능합니다.")
      e.target.value=""
    }else{
      setData({ ...data, price: e.target.value })
    }

  }
  
  return (
    <>
      <div className={styles.writeHeader}>
        <button onClick={() => router.push({ pathname: '/src/List' })}>
          <Image src="/images/back.png" alt="" width={25} height={25} />
        </button>
        <p>물건 올리기</p>
        <button className={styles.submitBtn} onClick={write}>완료</button>
      </div>
      <div className={styles.writeContainer}>
        <div className={styles.fileBox}>
          <label htmlFor="file" className={imageSrc && styles.imagelabel}>
            {imageSrc != false ? <img src={imageSrc} alt="preview-img"  /> :
              <img src="/images/camera.png" alt=""/>}</label>
          <input type="file" id="file" onChange={uploadToClient} />
          {/*  <div className={styles.preview}>
            {imageSrc && <img src={imageSrc} alt="preview-img" />}
          </div> */}
          {imageSrc && <p>이미지를 클릭하여 사진을 변경할 수 있습니다.</p>}<p>※500Kb 이하의 사진만 가능합니다.</p>
        </div>
        <div className={styles.writeTextBox}>
          <input type="text" placeholder='제목' onChange={(e) => setData({ ...data, title: e.target.value })} />
          <div className={styles.categoryBox}>

            <div>
              <select id="select" defaultValue="n" onChange={(e) => setData({ ...data, category: e.target.value })}>
                <option value="n">카테고리</option>
                {
                  categoryList.map((obj, key) => {
                    return (
                      <option key={key} value={obj}>{categoryTranslate(obj)}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div className={styles.priceBox}>
            <p><b>\</b></p><input type="text" placeholder='가격' onChange={(e) => priceCk(e)} />
          </div>
          <textarea placeholder='내용을 입력하세요.' onChange={(e) => setData({ ...data, content: e.target.value })} />
        </div>
      </div>
    </>
  )
}

export default Write