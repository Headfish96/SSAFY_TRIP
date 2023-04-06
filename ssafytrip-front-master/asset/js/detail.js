let serviceKey =
  "HGWbiXI4puxU2CzKvcLxn5CesxFWEHG%2F49E1OBVZH4N3flzq0q%2B442V4Ii2Bk43fuLm0jmkitNv5Qaxxb1U6ag%3D%3D";

window.onload = () => {
  // 상세 페이지의 contentId - 현재는 하드코딩, 추후 서버로부터 가져오는 기능추가
  let contentId = "2435104";

  let url = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${serviceKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let item = data.response.body.items.item[0];
      console.log(item);

      let title = item.title;
      let description = item.overview;
      let image = item.firstimage;
      let lat = item.mapx;
      let lng = item.mapy;
      let addr1 = item.addr1;
      let addr2 = item.addr2;

      let mainImg = document.getElementById("bannerImg");
      mainImg.setAttribute("src", image);

      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(lng, lat),
        level: 5,
      };

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(lng, lat);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      var map = new kakao.maps.Map(container, options);

      marker.setMap(map);

      document.getElementById("description-title").innerText = title;
      document.getElementById("description-subtext").innerHTML = description;
      document.getElementById("addr").innerText = addr1 + " " + addr2;
      document.getElementById("detailTitle").innerText = title;
    });

  let imgUrl = `https://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=${serviceKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&imageYN=Y&subImageYN=Y&numOfRows=10&pageNo=1`;
  fetch(imgUrl)
    .then((response) => response.json())
    .then((data) => {
      let imgs = data.response.body.items.item;
      console.log(imgs);

      let imgContainer = document.getElementById("imgContainer");
      for (let item of imgs) {
        let img = item.originimgurl;
        console.log(img);

        imgContainer.innerHTML += `<div><img src="${img}" alt=""></div>`;
      }
    });
};
