import React, { useState, useEffect } from 'react';
import styles from '@/styles/Map.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';


function MapList() {
    
    const router = useRouter();

    useEffect(()=>{
        window.kakao.maps.load(() => {
            const mapContainer = document.getElementById("map");
            const mapOption = {
                center: new window.kakao.maps.LatLng(37.4832599, 126.9321032), // 지도의 중심좌표
                level: 3, // 지도의 확대 레벨
            };

            let map = new window.kakao.maps.Map(mapContainer, mapOption);

            function locationLoadSuccess(pos){
                // 현재 위치 받아오기
                var currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                // 지도 중심을 부드럽게 이동
                map.panTo(currentPos);   
                
                var iwContent = '<div  style="padding:5px; border:none">내위치</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                // 마커 생성
                var marker = new kakao.maps.Marker({
                    position: currentPos
                });

                var infowindow = new kakao.maps.InfoWindow({
                    position : currentPos, 
                    content : iwContent 
                });

                // 기존에 마커가 있다면 제거
                marker.setMap(null);
                marker.setMap(map);
                infowindow.open(map, marker); 
            };

            function locationLoadError(pos){
                alert('위치 정보를 가져오는데 실패했습니다.');
            };

            function getCurrent(){
                navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
            };

            getCurrent();
            console.log(getCurrent());


        });
    }, [])


    return (
        <>
            <div className={styles.listHeader}>
                <button onClick={()=>router.push({pathname:'/src/First'})}> 
                    <Image src="/images/back.png" alt="" width={25} height={25}/>
                </button>
            </div>
            <div id="map" className={styles.map}></div>
        </>
    )
}



export default MapList