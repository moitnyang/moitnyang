import '@/styles/globals.css'
import React, { useState, createContext, useMemo, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react'
import axios from 'axios';
import { useRouter } from 'next/router';
export const CategoryContext = createContext();
export const CategoryTranslate = createContext();

export default function App({ Component, pageProps }) {
  const [category, setCategory] = useState('');
  const action = useMemo(
    () => ({
      categoryTranslate(c) {
        if (c == 'baby') { return "유아용품" }
        if (c == 'book') { return "도서" }
        if (c == 'fashion') { return "패션" }
        if (c == 'furniture') { return "가구" }
        if (c == 'hobby') { return "취미용품" }
        if (c == 'homeAppliance') { return "가전용품" }
        if (c == 'householdGoods') { return "생활용품" }
        if (c == 'petSupplies') { return "반려동물용품" }
        if (c == 'sport') { return "스포츠" }
        if (c == 'likeItems') { return "찜목록" }
        if (c == 'hotItems') { return "인기매물" }
        if (c == 'nearItems') { return "주변매물" }
        if (c == 'searchItems') { return "검색결과" }
      }
    })
    , []);
  //////////// 상품목록 , 찜목록//////////////////////////////////////////////////////////////
  const [product, setProduct] = useState(); // 상품 목록
  const [likeCheck, setLikeCheck] = useState(); // 찜 목록
  const [rank, setRank] = useState(); // 좋아요 랭크 목록
  const [nearProduct, setNearProduct] = useState(); // 근처 상품 목록
  async function getProduct(id) {
    const data = await axios.get("/api/product", { params: { id } });
    setProduct(data.data.data);
    setLikeCheck(data.data.likeData);
    setRank(data.data.rankData);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  // 좋아요 클릭시 
  const updataLike = async (no, id) => {
    await axios.put(`/api/like/${no}`, { id: id });
    getProduct(id);
  }

  /////////////// 현재 위치 /////////////////////////////////////////////////////////////
  //좌표
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  //법정동
  const [dong, setDong] = useState();
  //주소


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

  }, []);
  useEffect(() => {
    if (latitude && longitude) {
      // 카카오 지도 API에서 위도, 경도를 주소로 변환
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(longitude, latitude, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            // 변환된 주소에서 동 정보 추출
            for (let i = 0; i < result[0].address.address_name.split(' ').length; i++) {
              if (result[0].address.address_name.split(' ')[i].endsWith('동')) {
                setDong(result[0].address.address_name.split(' ')[i]);
                break;
              }
            }
          }
        });
      })
    }
  }, [latitude, longitude]);
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////// 내 주변 상품목록 ////////////////////////////////////////////////////////////
  //내 위치
  const centerLat = latitude;
  const centerLng = longitude;
  // 거리 계산 함수 (두 지점 사이의 거리를 km 단위로 반환)
  function calcDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 지구 반경 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // 두 지점 사이의 거리 (km)
    return parseFloat(d.toFixed(2)); // 소수점 아래 2자리까지만 포함
  }
  function nearbyLocationsFn(centerLat, centerLng) {
    const nearbyLocations = product && product.map(location => {
      const distance = calcDistance(centerLat, centerLng, location.product_lat, location.product_lng);
      return { ...location, distance }; // 객체 병합을 통해 거리 정보를 추가
    }).filter(location => location.distance <= 10); // 거리가 10km 이내인 위치 필터링
    // 결과 출력
    nearbyLocations && nearbyLocations.map((obj) => (
      likeCheck && likeCheck.map((oobj) => {
        if (obj.product_no == oobj.product_no) {
          obj.like = true;
        }
      })
    ))
    setNearProduct(nearbyLocations)



  }
  useEffect(() => {
    nearbyLocationsFn(centerLat, centerLng);
  }, [product]);
  ///////////////////////////////////////////////////////////////////////////////////////////
  /////////////////// 글쓰기 ////////////////////////////////////////////////////////////////
  const [image, setImage] = useState(null);
  const router = useRouter();
  const write = async (title, category, price, content, id) => {
    if (image && title && content && price && id && category != "n") {
      const body = new FormData();
      // db에 저장될 정보를  FormData에 담아서 api로 전달
      const fileName = "uploads/" + Math.random().toString(36).substring(2, 11) + new Date().getTime() + image.name;
      body.append("image", image);
      body.append("name", fileName);
      body.append("title", title);
      body.append("category", category);
      body.append("price", price);
      body.append("content", content);
      body.append("dong", dong);
      body.append("lat", latitude);
      body.append("lng", longitude);
      body.append("id", id);
      try {
        await axios.post('/api/product', body, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          getProduct();
          router.push("/src/First")  //확인
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
  ///////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////// 검색 ////////////////////////////////////////////////////
  const [search, setSearch] = useState();
  const [searchItems, setSearchItems] = useState();
  const searchFn = async (data) => {
   
    var data = await axios.get("/api/search", { params: { search: data } });
    data.data && data.data.map((obj) => (
      likeCheck && likeCheck.map((oobj) => {
        if (obj.product_no == oobj.product_no) {
          obj.like = true;
        }
      })
    ))
    setSearchItems(data.data);

  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////좋아요 확인/////////////////////////////////////////////////////
  function likeProduct() {
    product && product.map((obj) => (
      likeCheck && likeCheck.map((oobj) => {
        if (obj.product_no == oobj.product_no) {
          obj.like = true
        }
      }))
    )
    likeCheck && likeCheck.map((obj) => (
      likeCheck && likeCheck.map((oobj) => {
        if (obj.product_no == oobj.product_no) {
          obj.like = true
        }
      }))
    )
    rank && rank.map((obj) => (
      likeCheck && likeCheck.map((oobj) => {
        if (obj.product_no == oobj.product_no) {
          obj.like = true;
        }
      }))
    )
    nearProduct && nearProduct.map((obj) => (
      likeCheck && likeCheck.map((oobj) => {
        if (obj.product_no == oobj.product_no) {
          obj.like = true;
        }
      }))
    )
  }
  useEffect(() => {
    likeProduct();
  }, [likeCheck])
  /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// 댓글 /////////////////////////////////////////////////////////

  const [commentList, setList] = useState();
  // 댓글 쓰기
  const commentInsert = async (no, comment, id) => {
    await axios.post(`/api/comment/${no}`, { content: comment, id })
    commentSelect(no);
  }
  // 댓글 가져오기
  const commentSelect = async (no) => {
    await axios.get(`/api/comment/`).then((res) => setList(res.data.filter(obj => obj.product_no == no)));
  }


  ///////////////////상품  정보 //////////////////////////////////////////////////
  const [productInfo, setProductInfo] = useState();
  const getProductInfo = async (no) => {
    await axios.get(`/api/product/${no}`).then((res) => {
      likeCheck && likeCheck.map((obj) => {
        if (res.data[0].product_no === obj.product_no) {
          res.data[0].like = true;
          setProductInfo(res.data[0]);
        }
      })
      setProductInfo(res.data[0]);
    })

  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <SessionProvider session={pageProps.session}>
      <CategoryTranslate.Provider value={action}>
        <CategoryContext.Provider value={{ getProduct, category, setCategory, product, likeCheck, rank, updataLike, likeProduct, setImage, write, nearProduct, searchFn, commentInsert, commentList, commentSelect, getProductInfo, productInfo, searchItems, search, setSearch }}>
          <Component {...pageProps} />
        </CategoryContext.Provider>
      </CategoryTranslate.Provider>
    </SessionProvider >
  )
}
