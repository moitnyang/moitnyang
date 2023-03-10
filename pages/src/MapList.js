import React, { useState, useEffect } from 'react';
import styles from '@/styles/Map.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';


function MapList() {

    const router = useRouter();
    //좌표
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    //법정동
    const [dong, setDong] = useState();
    //주소
    const [address, setAddress] = useState();

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
                        setAddress(result[0].address.address_name);

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

// //내 위치
// const centerLat = 37.5665;
// const centerLng = 126.9780;

// // 데이터베이스에서 가져온 위치 정보 (위도, 경도) 배열
// const locations = [
//     // db 에서 가져온 자료 객체 들어갈 자리
// ];

// 거리 계산 함수 (두 지점 사이의 거리를 km 단위로 반환)
// function calcDistance(lat1, lng1, lat2, lng2) {
//   const R = 6371; // 지구 반경 (km)
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLng = (lng2 - lng1) * Math.PI / 180;
//   const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//     Math.sin(dLng / 2) * Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // 두 지점 사이의 거리 (km)
//   return parseFloat(d.toFixed(2)); // 소수점 아래 2자리까지만 포함
// }

// // 거리가 10km 이내인 위치 필터링
// const nearbyLocations = locations.map(location => {
//   const distance = calcDistance(centerLat, centerLng, location.lat, location.lng);
//   return { ...location, distance }; // 객체 병합을 통해 거리 정보를 추가
// }).filter(location => location.distance <= 10);

// // 결과 출력
// console.log(nearbyLocations);
    return (
        <>
            <div className={styles.listHeader}>
                <button onClick={() => router.push({ pathname: '/src/First' })}>
                    <Image src="/images/back.png" alt="" width={25} height={25} />
                </button>
            </div>
            <div>
                위도 : {latitude} , 경도 : {longitude} , {dong}
            </div>
        </>
    )
}



export default MapList