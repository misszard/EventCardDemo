/**
 * @author zard
 */
$(function(){
	
	/*拓展功能栏焦点变化的标识*/
	var flag = 1;
	
	/*拓展功能栏上功能的个数，现初始值设为3*/
	var fun_count = 3;
	
	/*当期焦点EventCard,基为0的下标,-1表示没有被EventCard聚焦*/
	var currentEventCardIndex = -1;
	
	/*当前焦点EventCard下的焦点基本功能,基为0的下标，-1表示当前焦点EventCard下基本功能没有被聚焦*/
	var currentbaseFunIndex = -1;
	
	/*获取生成EventCard的html模板*/
	var template = $('#item-template').html();
	
	var container = $("body");
	
	/*默认所有EventCard的拓展功能不显示*/
	$("div .expan_div").hide();
	
  /*虚拟的EventCard数据*/	
  var data = [{id:"1",
  			   title:"海报标题1",
  			   imageUrl:"Images/1.jpg",
  			   imageUrl1:"Images/base1.jpg",
  			   imageUrl2:"Images/base2.jpg",
  			   imageUrl3:"Images/base3.jpg",
  			   imageUrl4:"Images/base4.jpg",
  			   imageUrl5:"Images/base5.jpg",
  			   imageUrl6:"Images/base6.jpg"},
  			 {id:"2",
  			  title:"海报标题2",
  			  imageUrl:"Images/1.jpg",
  			  imageUrl1:"Images/base1.jpg",
  			  imageUrl2:"Images/base2.jpg",
  			  imageUrl3:"Images/base3.jpg",
  			  imageUrl4:"Images/base4.jpg",
  			  imageUrl5:"Images/base5.jpg",
  			  imageUrl6:"Images/base6.jpg"}]; 
  
  /*将数据渲染到html模板中*/			
  for(var i=0;i<data.length;i++)
  {
	var element = $.tmpl(template,data[i]);
	container.append(element);
  }
  
  /*默认第一个eventCard被聚焦*/
  if(data.length>0){
  	currentEventCardIndex = 0;
  	onEventCardChange();
  }			 
 	
  container.bind("keydown",keydown)	;
  
  $(".quickFlip").quickFlip();
  
  function keydown() {
  	var keyCode = event.keyCode;
  	
  	switch(keyCode)
  	{
  		/*左方向键*/
  		case 37:
  			if(currentbaseFunIndex==-1)
  			{
  				//如果没有拓展功能,怎什么都不做
  				return;
  			}
  			else
  			{
  				//如果有拓展功能,则退出拓展功能，拓展功能下标清空为-1
  				var eventCard = $(".event_card").eq(currentEventCardIndex);
  				eventCard.find(".expan_div img").removeClass("focusImg");
  				currentbaseFunIndex = -1;
	  			eventCard.children(".expan_div").hide();
  			}
  		break;
  		
  		/*上方向键*/
  		case 38:
  			if(currentbaseFunIndex==-1)
  			{
  				//如果没有拓展功能,如果是最上面的EventCard则不向上聚焦，否则向上聚焦一格
  				if(currentEventCardIndex==0)
  				{
  					return;
  				}
  				else
  				{
  					//向上聚焦一格
					currentEventCardIndex-=1;
					onEventCardChange();  					
  				}
  			}
  			else
  			{
  				//如果已经有拓展功能，则向上聚焦拓展功能,如果已经是最上面一个拓展功能，则保持聚焦不变
				if(currentbaseFunIndex==0)
				{
					return;
				}
				else
				{
					var eventCard = $(".event_card").eq(currentEventCardIndex);
					currentbaseFunIndex-=1;
					eventCard.find(".expan_div img").removeClass("focusImg");
					eventCard.find(".quickFlip").eq(currentbaseFunIndex).find("a img").addClass("focusImg");
				}
  			}
  		break;
  		
  		/*右方向键*/
  		case 39:
  			var eventCard = $(".event_card").eq(currentEventCardIndex);
  			var currentFlipers = eventCard.find(".quickFlip");
	  		if(currentbaseFunIndex!=-1)
	  		{
	  			//当前某个基本功能被聚焦，播放动画
	  			currentFlipers.eq(currentbaseFunIndex).animate({left:"114"},500,function(){
		  			currentFlipers.eq(currentbaseFunIndex).find("a").eq(0).trigger("click");
	  			}).animate({left:"0"},500);
	  		}
	  		else
	  		{
	  			//当前没有基本功能被聚焦，但是有某个EventCard被聚焦,
	  			//则显示该EventCard的拓展功能，并聚焦拓展功能的第一个
	  			eventCard.children(".expan_div").show();
	  			currentbaseFunIndex = 0;
	  			currentFlipers.eq(currentbaseFunIndex).find("img").addClass("focusImg");
	  		}
	  		break;
  		
  		/*下方向键*/
  		case 40:
			if(currentbaseFunIndex==-1)
			{
				//如果没有拓展功能，则向下聚焦EventCard,如果已经是最后一个EventCard，则保持聚焦不变
				if(currentEventCardIndex+1==data.length)
				{
					return;
				}
				else
				{
					currentEventCardIndex+=1;
					onEventCardChange();
				}
			}
			else
			{
				//如果已经有拓展功能，则向下聚焦拓展功能,如果已经是最后一个拓展功能，则保持聚焦不变
				if(currentbaseFunIndex==2)
				{
					return;
				}
				else
				{
					var eventCard = $(".event_card").eq(currentEventCardIndex);
					currentbaseFunIndex+=1;
					eventCard.find(".expan_div img").removeClass("focusImg");
					eventCard.find(".quickFlip").eq(currentbaseFunIndex).find("a img").addClass("focusImg");
				}
			}	
  		break;
  		
  		default:
  		break;
  		
  	}
}

	function onEventCardChange()
	{
		$("body .event_card").removeClass("focusEventCard").eq(currentEventCardIndex).addClass("focusEventCard");
	}	

});
