//鼠标状态 up || down
let mouseStatus = "up"; //down
let modelShow = false;
/** 获取选中的文本 */
const getSelectedText = () => window.getSelection().toString().trim();
/** 创建一个模态框 */
const createModelDom = () => {
  //外层容器
  const browerHelperModelBox = document.createElement("div");
  browerHelperModelBox.classList.add("brower_helper-model_box");
  // 设置模态框的样式
  const browerHelpeModelMain = document.createElement("div");
  browerHelpeModelMain.classList.add("brower_helper-model_main");
  browerHelperModelBox.appendChild(browerHelpeModelMain);
  document.body.appendChild(browerHelperModelBox);
};

/** 展示模态框 */
const showModel = (range) => {
  createModelDom();
  const modelDom = document.querySelector(".brower_helper-model_box");
  if (!modelDom) return;
  // 获取选中文本的范围的位置
  const rect = range.getBoundingClientRect();
  modelDom.style.display = "block";
  modelShow = true;
  const x = rect.left - modelDom.clientWidth / 2.3;
  const y = rect.top - modelDom.clientHeight * 1.5; // 设置偏移量
  modelDom.style.left = `${x}px`;
  modelDom.style.top = `${y}px`;
};

/** 鼠标按下处理函数 */
const clickDownHandler = (event) => {
  if (mouseStatus === "down") return;
  mouseStatus = "down";
  const modelDom = document.querySelector(".brower_helper-model_box");
  if (!modelDom) return;
  if (!modelDom.contains(event.target)) {
    modelDom.style.display = "none";
    modelShow = false;
    document.body.removeChild(
      document.querySelector(".brower_helper-model_box")
    );
  }
};

/** 鼠标抬起处理函数 */
const clickUpHandler = (e) => {
  if (mouseStatus === "up") return;
  mouseStatus = "up";
  //获取选中的文本并去除两边空格
  const selectedText = getSelectedText();
  if (selectedText === "") return;
  const range = window.getSelection().getRangeAt(0);
  showModel(range);
  //文本所在元素
  const selectElement = e.target;
  if (!selectElement) return;
};

/** 监听鼠标按下 */
document.addEventListener("mousedown", clickDownHandler);
/** 监听鼠标抬起 */
document.addEventListener("mouseup", clickUpHandler);
