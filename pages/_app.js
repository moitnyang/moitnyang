import '@/styles/globals.css'
import React, { useState, createContext, useMemo } from 'react';
import { SessionProvider } from 'next-auth/react'
export const CategoryContext = createContext();
export const CategoryTranslate = createContext();

export default function App({ Component, pageProps }) {
  const [category, setCategory] = useState('');

  const lists = [
    { id: 0, category: "homeAppliance", title: "노트북 팔아요", location: "신길동", price: "150만원", src: "/images/nop.png", likeThis: false, likeNum: 0 },
    { id: 1, category: "sport", title: "헬스장 회원권 팝니다!", location: "신길동", price: "45만원", src: "/images/nop.png", likeThis: false, likeNum: 0 },
    { id: 2, category: "homeAppliance", title: "소니 wh-1000", location: "신길동", price: "37만원", src: "/images/nop.png", likeThis: false, likeNum: 0 },
    { id: 3, category: "homeAppliance", title: "갤럭시 S21 팝니다", location: "신길동", price: "100만원", src: "/images/nop.png", likeThis: false, likeNum: 0 },
    { id: 4, category: "homeAppliance", title: "게임기 팔아요", location: "신길동", price: "150만원", src: "/images/nop.png", likeThis: false, likeNum: 0 },
    { id: 5, category: "petSupplies", title: "애견간식 팔아요", location: "신길동", price: "45만원", src: "/images/nop.png", likeThis: false, likeNum: 0 },
    { id: 6, category: "homeAppliance", title: "삼성 TV 급처", location: "신길동", price: "60만원", src: "/images/nop.png", likeThis: false, likeNum: 0 },
    { id: 7, category: "book", title: "리액트 책팔아요", location: "신길동", price: "45만원", src: "/images/nop.png", likeThis: false, likeNum: 0 },
    { id: 8, category: "furniture", title: "책상팔아요", location: "신길동", price: "60만원", src: "/images/nop.png", likeThis: false, likeNum: 0 }
  ]
  const [items, setItems] = useState(lists);

  const [myItems, setMyItems] = useState([]);



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
        
      }
    })
    , []);

  return (
    <SessionProvider session={pageProps.session}>
      <CategoryTranslate.Provider value={action}>
        <CategoryContext.Provider value={{ category, setCategory, items, setItems, myItems, setMyItems }}>
          <Component {...pageProps} />
        </CategoryContext.Provider>
      </CategoryTranslate.Provider>
    </SessionProvider >
  )
}
