import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/write.module.scss';
import { CategoryContext, CategoryTranslate } from '../_app';
import { useSession } from "next-auth/react";
import imageCompression from "browser-image-compression";
function Write() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState('');
  const [data, setData] = useState([]);
  const { categoryTranslate } = useContext(CategoryTranslate);
  const { setImage, write } = useContext(CategoryContext);
  const categoryList = ['baby', 'book', 'furniture', 'hobby', 'fashion', 'homeAppliance', 'householdGoods', 'petSupplies', 'sport'];
  const { data: session, status } = useSession();

  /////// Geolocation을 활용하여 위도,경도를 구하고 KAKAO_MAP_API를 이용하여 주소를 가져옴////////
  // function currentLocation() {
  //   // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
  //   if (navigator.geolocation) {
  //     // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       var lat = position.coords.latitude // 위도
  //       var lon = position.coords.longitude; // 경도
  //       console.log(lat, lon)
  //       window.kakao.maps.load(() => {
  //         var geocoder = new kakao.maps.services.Geocoder();
  //         var coord = new kakao.maps.LatLng(lat, lon);
  //         var callback = function (result, status) {
  //           if (status === kakao.maps.services.Status.OK) {
  //             console.log(result[0].road_address);
  //           }
  //         };
  //         geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  //       })
  //     })
  //   } else {
  //     alert('현재위치를 가져올수 없습니다.')
  //   }
  // }
  // useEffect(() => {
  //   currentLocation();
  // }, [])

  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      actionImgCompress(i);
    };
  }

  const actionImgCompress = async (fileSrc) => {
    console.log("압축 시작");
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(fileSrc, options);
      encodeFileToBase64(compressedFile);
      setImage(compressedFile)
    } catch (error) {
      console.log(error);
    }
  }
  //업로드 사진 미리보기
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
  // 가격 정규식
  const priceCk = (e) => {
    var price = e.target.value; //받은 값
    let check = /^[0-9]+$/;  // 숫자만 추출하는 정규식
    if (!check.test(price)) {
      alert("숫자만 입력 가능합니다.")
      e.target.value = ""
    } else {
      setData({ ...data, price: e.target.value })
    }
  }
  useEffect(()=>{
    setData({ ...data, category: categoryTranslate(router.query.category) })
  },[])

  return (
    <>
      <div className={styles.writeHeader}>
        <button onClick={() => router.push({ pathname: '/src/List', query: { category: router.query.category } })}>
          <Image src="/images/back.png" alt="" width={25} height={25} placeholder="blur"
                    blurDataURL={'/images/back.png'}/>
        </button>
        <p>물건 올리기</p>
        <button className={styles.submitBtn} onClick={() => { write(data.title, data.category, data.price, data.content, session.user.email) }}>완료</button>
      </div>
      <div className={styles.writeContainer}>
        <div className={styles.fileBox}>
          <label htmlFor="file" className={imageSrc && styles.imagelabel}>
            {imageSrc != false ? <img src={imageSrc} alt="preview-img" /> :
              <img src="/images/camera.png" alt="" />}</label>
          <input type="file" id="file" name='image' onChange={uploadToClient} />
          {imageSrc && <p>이미지를 클릭하여 사진을 변경할 수 있습니다.</p>}<p>※500Kb 이상의 사진일 경우 화질이 저하될 수 있습니다.</p>
        </div>
        <div className={styles.writeTextBox}>
          <input type="text" placeholder='제목' onChange={(e) => setData({ ...data, title: e.target.value })} />
          <div className={styles.categoryBox}>
            <div>
              <select id="select" defaultValue={categoryTranslate(router.query.category)} onChange={(e) => setData({ ...data, category: e.target.value })}>
                <option value="n">카테고리</option>
                {
                  categoryList.map((obj, key) => {
                    return (
                      <option key={key} value={categoryTranslate(obj)} >{categoryTranslate(obj)} </option>
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