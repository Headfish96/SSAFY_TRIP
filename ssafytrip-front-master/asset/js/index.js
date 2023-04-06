let serviceKey =
  "HGWbiXI4puxU2CzKvcLxn5CesxFWEHG%2F49E1OBVZH4N3flzq0q%2B442V4Ii2Bk43fuLm0jmkitNv5Qaxxb1U6ag%3D%3D";

// 페이지 로딩 후 동작 지정
window.onload = function () {
  loadSwiperData();
  loadPopularAndRecommendData();
};

function locateDetail(_this) {
  window.location.href = "./detail.html";
}

function loadPopularAndRecommendData() {
  let contentTypeId = 12;
  let numOfRow = 500;
  let regionUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${serviceKey}&numOfRows=${numOfRow}&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&contentTypeId=${contentTypeId}`;

  fetch(regionUrl)
    .then((response) => response.json())
    .then((data) => {
      let items = data.response.body.items.item;

      let randomIdx = Array.from(getRandom(10));
      for (let i = 0; i < 3; i++) {
        let idx = randomIdx[i];

        let contentId = items[idx].contentid;
        let firstImage = items[idx].firstimage;
        let title = items[idx].title;

        let popularList = document.getElementById("popularList");
        popularList.innerHTML += `
          <div id=${contentId}>
            <div class="popular-img">
              <img src="${firstImage}" alt="" />
            </div>
            <h3 class="popular-title">${title}</h3>
          </div>
        `;
      }

      for (let i = 4; i < 10; i++) {
        let idx = randomIdx[i];

        let contentId = items[idx].contentid;
        let firstImage = items[idx].firstimage;
        let title = items[idx].title;

        let recommendList = document.getElementById("recommendList");
        recommendList.innerHTML += `
          <div id=${contentId}>
            <div class="recommend-img"><img src="${firstImage}" alt="" /></div>
            <div class="recommend-title">${title}</div>
          </div>
        `;
      }
    });
}

function loadSwiperData() {
  // swiper 정보 로딩
  let swiperInit = ["2435104", "2662681", "2606210"];

  for (let contentId of swiperInit) {
    let url = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${serviceKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let item = data.response.body.items.item[0];

        let title = item.title;
        let description = item.overview;
        let image = item.firstimage;

        let sliceStr = 100;
        if (description.length > sliceStr) {
          description = description.substr(0, sliceStr) + "...";
        }

        let swiperEl = document.getElementById("swiper-wrapper");

        swiperEl.innerHTML += `
          <div class="swiper-slide" onclick="locateDetail(this)">
              <div id=${contentId} class="div-img-temp">
                <div class="swiper-description">
                  <h2>${title}</h2>
                  <p>
                    ${description}
                  </p>
                </div>
              </div>
            </div>
          `;

        let content = document.getElementById(contentId);
        content.setAttribute("style", `background-image: url(${image});`);
      });
  }

  var mySwiper = new Swiper(".swiper-container", {
    // 3초마다 자동으로 슬라이드가 넘어갑니다. 1초 = 1000
    autoplay: {
      delay: 3000,
    },
  });
}

function getRandom(size) {
  const set = new Set();

  while (set.size !== size) {
    set.add(Math.floor(Math.random() * 500));
  }
  return set;
}
