window.onload = function () {
  getRem(1920, 100)
};
window.onresize = function () {
  getRem(1920, 100)
};
function getRem (pWidth, pRem) {
  let html = document.getElementsByTagName('html')[0];
  let oWidth = document.body.clientWidth || document.documentElement.clientWidth;
  // html.style.fontSize = oWidth / pWidth * pRem + 'px';
  // 调试
  html.style.fontSize = '100px';
}
