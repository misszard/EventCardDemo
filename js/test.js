var flag = 1;

function keyUp(event) {
	if(event.keyCode == 39) {
		if(flag == 1) {
			flag = 3;
		} else {
			flag--;
		}
		var chooseDivObj = document.getElementById("div" + flag);
		chooseDivObj.focus();
		//控制div选中样式
	}
}

function keyDown(event) {
	if(event.keyCode == 3) {
		if(flag == 3) {
			flag = 1;
		} else {
			flag++;
		}
		var chooseDivObj = document.getElementById("div" + flag);
		chooseDivObj.focus();
		//控制div选中样式
	}
}
