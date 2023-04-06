let serviceKey =
  "HGWbiXI4puxU2CzKvcLxn5CesxFWEHG%2F49E1OBVZH4N3flzq0q%2B442V4Ii2Bk43fuLm0jmkitNv5Qaxxb1U6ag%3D%3D";

window.onload = () => {
  let contentTypeId = 12;
  let numOfRow = 500;
  let regionUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${serviceKey}&numOfRows=${numOfRow}&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&contentTypeId=${contentTypeId}`;

  fetch(regionUrl)
    .then((response) => response.json())
    .then((data) => {
      let items = data.response.body.items.item;

      let randomIdx = getRandom(10);
      for (let idx of randomIdx) {
        let contentId = items[idx].contentid;
        let firstImage = items[idx].firstimage;
        let detailUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${serviceKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1`;

        fetch(detailUrl)
          .then((response) => response.json())
          .then((itemData) => {
            let detail = itemData.response.body.items.item[0];
            let description = detail.overview;
            let title = detail.title;

            let sectionEl = document.getElementById("list-section");
            sectionEl.innerHTML += `
            <div class="list-container" id=${contentId}>
                <div class="list-img"><img src="${firstImage}" alt="" /></div>
                <div class="list-discription-container">
                    <h2 class="list-title">${title}</h2>
                    <div class="list-text">${description}</div>
                    <button class="like-btn">나만의 여행 등록</button>
                </div>
            </div>
              `;
          });
      }
    });
};

function getRandom(size) {
  const set = new Set();

  while (set.size !== size) {
    set.add(Math.floor(Math.random() * 500));
  }
  return set;
}
