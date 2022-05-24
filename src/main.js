'use strict';

const upNextContainer = document.querySelector('.upNext ul');

const SERVERLESS_URL = 'https://hide-with-serverless-functions.netlify.app/';
const VIDEO_URL = `${SERVERLESS_URL}youtube/v3/videos?`;
const CHANNEL_URL = `${SERVERLESS_URL}youtube/v3/channels?`;

fetch(
  VIDEO_URL +
    new URLSearchParams({
      part: 'snippet',
      chart: 'mostPopular',
      maxResult: 1,
      regionCode: 'KR',
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelInfo(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelInfo = (video) => {
  fetch(
    CHANNEL_URL +
      new URLSearchParams({
        part: 'snippet',
        id: video.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      makeUpNexts(video);
    });
};

const makeUpNexts = (data) => {
  upNextContainer.innerHTML += `
  <li class="next" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
    <div class="img"><img src="${data.snippet.thumbnails.high.url}" alt="" /></div>
    <div class="info">
      <span class="title">${data.snippet.title}</span>
      <span class="name">${data.snippet.channelTitle}</span>
    </div>
    <i class="fas fa-ellipsis-v"></i>
  </li>
  `;
};
