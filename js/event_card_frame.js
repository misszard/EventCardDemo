// javascript ~ Just do it.

/*模拟数据资源*/
var sourceArray = new Array(["Dangerous", "source/Michael_Jackson_Dangerous_2.jpg", "source/Dangerous.mp4"], ["Cloud Atlas", "source/cloud-atlas-01.jpg", "source/Dangerous.mp4"]);

/*资源文件类型*/
var imageArray = ["jpg", "png", "gif"];
var audioArray = ["mp3", "wav", "ra"];
var videoArray = ["mp4", "avi", "rmvb", "flv"];

/*定义类型标识*/
var imageType = 1;
var audioType = 2;
var videoType = 3;

/*函数调用*/
// onDisplay();

/**
 * 呈现
 */
function onDisplay() {
	/**EventCard整体*/
	var event_card = document.createElement("div");
	event_card.id = "event_card";
	event_card.style.display = "block";
	event_card.style.margin = "0px auto";
	event_card.style.marginTop = "50px";
	event_card.style.width = "500px";
	event_card.style.height = "320px";
	event_card.style.position = "static";
	event_card.style.zIndex = "1";
	document.getElementById("body").appendChild(event_card);

	/**EventCard title部分*/
	var top_card = document.createElement("div");
	top_card.id = "top_card";
	top_card.style.width = "500px";
	top_card.style.height = "64px";
	top_card.style.textAlign = "center";
	top_card.style.fontSize = "36px";
	top_card.style.lineHeight = "64px";
	top_card.style.backgroundColor = "rgba(73, 160, 154, 0.223529)";
	top_card.style.overflow = "hidden";
	event_card.appendChild(top_card);

	/**EventCard 取景器部分*/
	var bottom_card = document.createElement("div");
	bottom_card.id = "bottom_card";
	bottom_card.style.width = "500px";
	bottom_card.style.height = "256px";
	bottom_card.style.verticalAlign = "middle";
	bottom_card.style.overflow = "hidden";
	bottom_card.style.position = "relative";
	event_card.appendChild(bottom_card);
	this.onAssemble(1);
	this.expanColumn();
}

/**
 * 拓展功能栏
 */
function expanColumn() {
	/*拓展功能栏*/
	var expan_div = document.createElement("div");
	expan_div.id = "expan_div";
	expan_div.style.width = "110px";
	expan_div.style.height = "375px";
	expan_div.style.backgroundColor = "#F8F8FF";
	expan_div.style.marginLeft = "20px";
	expan_div.style.position = "relative";
	expan_div.style.zIndex = "2";
	document.getElementById("event_card").appendChild(expan_div);

	/*功能 1*/
	var expan_fun1 = document.createElement("div");
	expan_fun1.id = "expan_fun1";
	expan_fun1.style.width = "110px";
	expan_fun1.style.height = "125px";
	expan_div.appendChild(expan_fun1);

	/*功能 2*/
	var expan_fun2 = document.createElement("div");
	expan_fun2.id = "expan_fun2";
	expan_fun2.style.width = "110px";
	expan_fun2.style.height = "125px";
	expan_fun2.style.border = "1px #EEE9E9 solid";
	expan_fun2.style.backgroundColor = "#F2F2F2";
	expan_div.appendChild(expan_fun2);

	/*功能 3*/
	var expan_fun3 = document.createElement("div");
	expan_fun3.id = "expan_fun3";
	expan_fun3.style.width = "110px";
	expan_fun3.style.height = "125px";
	expan_div.appendChild(expan_fun3);
}

/**
 * 生成EventCard(组装)
 */
function onAssemble(id) {
	document.getElementById("top_card").innerHTML = sourceArray[id][0];

	var img = document.createElement("img");
	document.getElementById("bottom_card").appendChild(img);
	img.setAttribute("src", sourceArray[id][1]);

	var img_width = this.getOriginalSize(sourceArray[id][1])[0];
	var img_height = this.getOriginalSize(sourceArray[id][1])[1];

	var img_width_new = this.imageCompress(img_width, img_height)[0];
	var img_height_new = this.imageCompress(img_width, img_height)[1];

	img.setAttribute("width", img_width_new);
	img.setAttribute("height", img_height_new);

	this.set_img_center(img, img_width_new, img_height_new);
}

/**
 * 获取资源图片原始的宽(width)和高(height)
 */
function getOriginalSize(path) {
	var image = new Image();
	image.src = path;
	return [image.width, image.height];
}

/**
 * 图片压缩,等比例压缩图片的宽高，使其短的一方与取景器对应的宽高保持一致，另一方取中间部分,返回压缩后图片的宽高
 */
function imageCompress(width_origin, height_origin) {
	if(width_origin >= 500 && height_origin >= 256) {
		var width_compress_rate = 500 / width_origin;
		var height_compress_rate = 256 / height_origin;
		return width_compress_rate >= height_compress_rate ? [500, height_origin * width_compress_rate] : [width_origin * height_compress_rate, 256];
	}
}

/**
 * 控制取景器获取图片的区域，这里是获取图片的中心
 */
function set_img_center(image, width, height) {
	image.style.position = "absolute";
	var width_offset = (width - 500) / 2;
	var height_offset = (height - 256) / 2;
	image.style.top = "-" + height_offset + "px";
	image.style.left = "-" + width_offset + "px";
}

/**
 * 视频的跳转
 */
function video_play() {
	// window.location="video.html";
	var event_card = document.getElementById("EventCard");
	var video_div = document.getElementById("video");
	var my_video = document.getElementById("myVideo");

	// var card_is_display = (card.style.display == '');
	// var video_is_display = (video.style.display == '');

	event_card.style.display = "none";
	video_div.style.display = "block";
	console.log("next");
	if(my_video.paused) {
		console.log("here");
		my_video.play();
	}
}

/**
 * 识别
 */
function onRecognize() {
	/*识别资源类型*/

}

/**
 * 执行
 */
function onExecute() {
	/*执行EventCard的功能*/
}

/**
 * 销毁
 */
function onDestroy() {
	/*EventCard的销毁*/
}

