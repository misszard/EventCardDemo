var expan_div;

/*------------------创建EventCardDemo类----------------------*/
EventCardDemo = function() {
	console.debug("EventCardDemo构造函数");
	this.onAssemble = EventCardDemo.onAssemble;
}
/**
 * 生成EventCard(组装)
 */
EventCardDemo.onAssemble = function(id) {
	console.debug("onAssemble");
	/*模拟数据资源*/
	var sourceArray = new Array(["Dangerous", "source/Michael_Jackson_Dangerous_2.jpg", "source/Dangerous.mp4"], ["Cloud Atlas", "source/cloud-atlas-01.jpg", "source/Dangerous.mp4"]);

	document.getElementsByClassName("top_card")[0].innerHTML = sourceArray[id][0];

	var img = document.createElement("img");
	document.getElementsByClassName("bottom_card")[0].appendChild(img);
	img.setAttribute("src", sourceArray[id][1]);

	/*图片加载完成再执行里面的方法*/
	img.onload = function() {
		var img_width = getOriginalSize(sourceArray[id][1])[0];
		var img_height = getOriginalSize(sourceArray[id][1])[1];

		console.debug(img_width + ", " + img_height);

		var img_width_new = imageCompress(img_width, img_height)[0];
		var img_height_new = imageCompress(img_width, img_height)[1];

		img.setAttribute("width", img_width_new);
		img.setAttribute("height", img_height_new);

		set_img_center(img, img_width_new, img_height_new);
	}
}
/**
 * 呼出及退出拓展功能栏
 */
function display_expanColumn(b) {
	if(b) {
		expan_div.style.display = "block";
	} else {
		expan_div.style.display = "none";
	}
}

/*拓展功能栏焦点变化的标识*/
var flag = 1;

/*拓展功能栏上功能的个数，现初始值设为3*/
var fun_count = 3;

/**
 * 响应键盘方向键事件。
 * 右：呼出拓展功能栏
 * 左：退出拓展功能栏
 * 在拓展功能栏显示状态下：上下方向键切换焦点
 * 在拓展功能栏隐藏状态下：上下方向键不做任何处理
 */
function keydown() {
	// console.debug("keyCode = " + window.event.keyCode);
	expan_div = document.getElementsByClassName("expan_div")[0];

	if(window.event.keyCode == 39) {
		/* 呼出拓展功能栏*/
		display_expanColumn(1);
	}

	if(window.event.keyCode == 37) {
		/* 退出拓展功能栏*/
		display_expanColumn(0);

		/*焦点回到第一个*/
		flag = 1;
	}

	if(expan_div.style.display == "block") {
		/*上方向键*/
		if(window.event.keyCode == 38) {
			flag--;
			flag = flag >= 1 ? flag : 1;
		}

		/*下方向键*/
		if(window.event.keyCode == 40) {
			flag++;
			flag = flag <= fun_count ? flag : fun_count;
		}
		this.onlyOneFocus(flag);
	}

	/*在拓展功能不显示的状态下，按enter键播放视频*/
	if(expan_div.style.display != "block") {
		if(window.event.keyCode == 13) {
			this.onExecute();
		}
	}

	/*按小键盘的"-"键执行EventCard的销毁*/
	if(window.event.keyCode == 109) {
		this.onDestroy();
	}
}

/**
 * 设置拓展功能栏上有且只有一个获取焦点
 */
function onlyOneFocus(a) {
	for(var i = 1; i <= fun_count; i++) {
		console.log(i);
		document.getElementsByName("expan_fun"+i)[0].className = "expan_fun";
	}
	document.getElementsByName("expan_fun"+a)[0].className = "expan_fun_onfocus";
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
	console.debug("width_origin " + width_origin + ", " + "height_origin " + height_origin);
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

/*var int=self.setInterval("onRecognize()",2000);*/

/**
 * 识别
 */
function onRecognize() {
	/*识别资源类型*/
	var path = "source/";
	var file_name;
	var point = file_name.lastIndexOf(".");
	var file_type = file_name.subString(point + 1, file_name.length).toLowerCase();
	if(file_type == "jpg" || file_type == "mp4" || file_type == "mp3") {
		alert("发现资源");
	}
}

/**
 * 执行
 */
function onExecute() {
	window.location = "video.html";
}

/**
 * 销毁
 */
function onDestroy() {
	/*EventCard的销毁*/
	var event_card = document.getElementById("event_card1");
	event_card.parentNode.removeChild(event_card);
}

