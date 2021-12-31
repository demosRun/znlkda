function scrollIntoView () {
  window.scrollTo(0, 0)
}

// 阻止微信拖动
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false})

setTimeout(() => {
  autoScale({
    deviseW: 750,
    deviseH: 1508,
    center: 'middle',
    scroll: false,
    type: 'scale',
    box: '.scale-box'
  })
}, 100);

var myHeaders = new Headers();

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://bp.people.com.cn/map_api/puAreas/paihang", requestOptions)
  .then(response => response.json())
  .then(result => {
    if (result.status == 1) {
      let codeAll = 0
      result.data.forEach(element => {
        codeAll += parseInt(element.score)
      }); 
      let newHtml = ''
      result.data.forEach(element => {
        newHtml += `<li class="rank-3" style="font-size: ${parseInt(element.score / codeAll * 10) + 5}ex"><a href="/#">${element.name}</a></li>`
      });
      document.querySelector('.tag-box').innerHTML = newHtml
      setTimeout(() => {
        document.getElementById('myCanvas').width = 700;
        document.getElementById('myCanvas').height = 600;
        document.getElementById('myCanvasContainer').style.height = 600 + 'px';
        TagCanvas.Start('myCanvas', 'tags', {
          "fadeIn": 1000,
          "weight": true,
          "maxSpeed": 0.05,
          "minSpeed": 0.005,
          "stretchX": 1.2,
          "wheelZoom": false,
          "textColour": "#ffffff",
          "textHeight": 20,
          "weightMode": "both",
          "dragControl": true,
          "frontSelect": true,
          "outlineMethod": "none",
          "weightGradient": {
            "0": "#ffffff",
            "1": "#ffffff",
            "0.33": "#ffffff",
            "0.66": "#ffffff"
          }
        });
        TagCanvas.SetSpeed('myCanvas', [-0.05, -0.05]);
      }, 100);
    }
  })
  .catch(error => console.log('error', error));