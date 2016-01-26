$(document).ready(function () {
	window.hotel_no = getParm('hotel_no',window.location.href);

	//改变门店背景图片
		var changeImgUrl = function (hotel_no) {
			// var urlImg = "url(http://static.quhuhu.com/image/topic/store/20160119/bc.png)";
			var imgFormat = '.jpg' ? '.jpg' : '.png';
			var urlImg = "url(http://source.qunar.com/apt_q_web/other/jizan/" + hotel_no +imgFormat+ ")";
			// console.log(urlImg);
			$('.fakeroom').css("background-image",urlImg);
			$('.fakeroom').css("background-size","cover");
		};
		// changeImgUrl();
	//检查错误提示存在
	function checkError () {
		var errorP = $('.error');
		errorP.show()
	}
	function checkErrorO () {
		var errorP = $('.errorO');
		if (errorP.hasClass('hide')) {
			errorP.removeClass('hide')
		};
	}
	function checkErrorOk () {
		var errorP = $('.error');
		if (!errorP.hasClass('hide')) {
			errorP.addClass('hide');
		};
	}
	function checkIsInput () {
		var errorI = $('.errorI');
		if (!errorI.hasClass('hide')) {
			errorI.addClass('hide');
		};
	}
	function checkErrorL () {
		var errorT = $('.errorT');
		$('.error,.errorI').hide();
			$('.errorT').show()

	}
	function getParm (key, Link, returns) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            Link = Link ? Link : location.search;
            returns = returns ? Link.substr(1).match(reg) : Link.substr(1).match(reg) ? Link.substr(1).match(reg)[2] : Link.substr(1).match(reg);
            if (returns != null) {
                return returns;
            } else {
                return "";
            }
        };
	function GetQueryString(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	};
	//房型介绍副标题折行换行
	(function () {
			var subTitle = $('.room-desTitle .subTitle').html();
			var subTiLen = subTitle.length;
			if (subTiLen>15) {
					subTitle = subTitle.slice(0,15) +'...';
					$('.subTitle').html(subTitle);
			};
	})();
	//页面渲染
var render = 	function () {
		
		$.ajax({
		url:'http://touch.beta.quhuhu.com/praise/checkCurrentTime',
		type:'GET',
		data :{
			'hotel_no':hotel_no
		},
		dataType:'jsonp',
		success:function (res) {
				var proTimes = res.data.praise;
				var ranking = res.data.ranking;
				var hotelName = res.data.names;
				var hotelDesc = res.data.descriptions;

			if (res.code == '0000') {
							$('.subTitle').html(hotelDesc);
							$('.mainTitle').html(hotelName);
							changeImgUrl(hotel_no);
							var str = '活动截止到2016-01-27。';
				 			$('.activityDeadline').html(str);

							if ($.cookie(hotel_no)) {
								var hasProed = "<div class='has-proed'> 您已经点过赞啦！<br/><p style='font-size:0.4rem;font-weight:bold;'>门店收集到<span style='color:yellow;'>"+proTimes+"</span>个赞</p></div>"
								$('.pro-dot').addClass('hide');
								$('.pre-order img').removeClass('hide');
								$('.fllowerL').after(hasProed);
								$('.fakeroom').addClass('mask');
						};

			} else {
				 // window.activityDeadline = res.data.activityDeadline;
				 // var str = '活动截止到'+ activityDeadline.slice(0,4) + '年';
				 var str = '活动截止到2016-01-27。';
				 $('.activityDeadline').html(str);

				var hasOutDate = "<div class='has-proed'> <p class='zindex'>活动已经结束了！</p><br/><p style='font-size:0.4rem' class='zindex'>门店收集到<span style='color:yellow'>" +proTimes+"</span>个赞</p></div>";
					$('.subTitle').html(hotelDesc);
					$('.mainTitle').html(hotelName);
					changeImgUrl(hotel_no);
				$('.pro-dot').addClass('hide');
				$('.pre-order img').removeClass('hide');
				$('.fllowerL').after(hasOutDate);
				$('.fakeroom').addClass('mask');
			};
		},

	})
	};
	
	render();
	$(".pro-dot img").on('click',function () {
		$.ajax({
			url:'http://touch.beta.quhuhu.com/praise/pushPraise',
			type:'GET',
			dataType:'jsonp',
			data : {'hotel_no':hotel_no},
			success:function (res) {
							var proTimes = res.data.praise;
							var ranking = res.data.ranking;
							$.cookie(hotel_no,hotel_no);
				if (res.code == '0001') {
								
								
								// window.proTimes = proTimes;
								// window.ranking = ranking;
								//点赞成功
								var proSuccess = dialog({
					    					content: "<div class='clickPro'>" +
					    										"<div class='dialog-pos'>您是第<span class='totalPro'>" + proTimes + "</span>位点赞者～<p style='font-size:0.2rem;'>公寓已收到您的-赞美</br>感谢您的助力～</p></div>"+
					    										"<div class='okPro'><img width='' src='http://static.quhuhu.com/image/topic/store/20160119/sure.png' alt=''></div>"+
					    										"</div>",
					    										//quickClose:true
										});
								//中奖
								var proWinning = dialog({
			    							content: "<div class='clickWinning'>" +
			    													"<div class='dialog-pos'>您是第<span class='totalPro'>" + proTimes + "</span>位点赞者～</br><span class='lottery'>恭喜您获得全国不限入住时间<span style='font-weight:bold;'>免费房券</span>一张</span></div>"+
				    													"<div class='telWrapper'>"+
						    												"<input type='number' class='tel' maxlength='11' placeholder='请输入您的手机号码'/>"+
						    												"<p class='error hide'>手机号码格式有误</p>"+
						    												"<p class='errorI hide' style='color:red'>您尚未填写手机号码</p>"+
						    												"<p class='errorT hide' style='color:red;font-size:0.4rem'>手机号码格式有误</p>"+
				    													"</div>"+
				    													"<div class='okFetch'><img width='' src='http://static.quhuhu.com/image/topic/store/20160119/fetch.png' alt=''></div>"+
			    												"</div>",
			    												//quickClose:true
										});
								var talkingGirlDialog = dialog({
											content: "<div class='fetchSuccess'>" +
																	 "<p class='dialog-pos'>向世界传播爱的客服姑娘将在一个工作日内联系您请您耐心等待～</br></p>"+
																	 "<div class='successFetch'><img width='' src='http://static.quhuhu.com/image/topic/store/20160119/sure.png' alt=''></div>"+
																"</div>",
										});
								proWinning.showModal();
								$('.tel').on('focus',function (e) {
															var self = $(this);
															self.val('');
															// checkError();
															checkErrorOk();
															checkIsInput();
																// $('.errorI,.error').hide()
																// $('.error').css('display','none');
																	$('.errorT').css('display','none');
														});
								$('.tel').on('input',function (e) {
									var self = $(this);
									var phoneNum = Number(self.val());
									var data = {
										'mobile_num' : phoneNum,
										'hotel_no':hotel_no,
										'praise' : proTimes
									};
									checkErrorOk();
									if (self.val().length==11) {
											// self.blur();
										if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phoneNum)) {
												// if (phoneNum=='') {
												// 	$('.errorI').show()
												// }else{
												// 	$('.error').show();
												// };
												
												checkErrorL();
												// $('.error').css('display','none');
												
										}else{
											$('.errorI,.error').hide()
										};
									}else if(self.val().length>11) {
										 self.blur();
									};
								})
								$('.okFetch img').on('click',function () {
									
									var self = $(this);
									var str = '请输入您的手机号码';
									var stri = '您尚未填写手机号码';
									var strt = '手机号码格式有误';
									var phoneNum = $('.tel').val();
									if ( phoneNum=='') {
											$('.error').html(stri).removeClass('hide');
											$('.errorI').addClass('hide');
									};
									if (phoneNum!=''&&phoneNum.length!==11) {
										// $('.error').html(stri).removeClass('hide');
										// 	$('.errorI').addClass('hide');
										$('.errorT').show();
									};
									var isNum = Number(phoneNum);
									if (!phoneNum) {
										checkIsInput();
										// $('.error').val('').html('您尚未填写手机号码').removeClass('hide');
									}else{

										if (isNum && phoneNum.length!==11) {
											checkErrorOk();
										}
										// else{
										// 	$('.error,.errorI').hide()
										// };

										if (str == phoneNum) {
											$('.errorI').removeClass('hide');
										};
										if (isNum&&phoneNum.length==11&&!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phoneNum)) {
												$('.error,.errorI').hide();
												// $('.errorI').after("<span style='font-size:0.4rem;color:red'>手机号码格式有误</span>");
										};
										if (isNum&&phoneNum.length==11&&/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phoneNum)) {

													var data = {
												'mobile_num' : phoneNum,
												'hotel_no':hotel_no,
												'praise' : proTimes
											};
											$.ajax({
														url:'http://touch.beta.quhuhu.com/praise/pushWin',
														type:'POST',
														dataType:'jsonp',
														data : data,
														 success:function (res) {
															if (res.code='0000') {
																proWinning.remove();
																talkingGirlDialog.showModal();
																$('.successFetch img').on('click',function () {
																	talkingGirlDialog.remove();
																	var hasProed = "<div class='has-proed'> 您已经点过赞啦！<br/><p style='font-size:0.4rem'>门店收集到<span style='color:yellow'>"+proTimes+"</span>个赞，在参与活动的门店中排名第<span style='color:yellow'>"+ ranking+"</span></p></div>"
																	$('.fllowerL').after(hasProed);
																	$('.pro-dot').addClass('hide');
																	$('.pre-order img').removeClass('hide');
																	$('.fakeroom').addClass('mask');
																})
															};
														}
													})


										};
									};
									
								
								})
					}else{
						// var proSuccess = dialog({
					 //    					content: "<div class='clickPro'>" +
					 //    										"<p class='dialog-pos'>您是第<span class='totalPro'>" + proTimes + "</span>位点赞者～</br></br>公寓已收到您的赞美，感谢您的助力～</p>"+
					 //    										"<div class='okPro'><img width='' src='./img/sure.png' alt=''></div>"+
					 //    										"</div>",
					 //    										//quickClose:true
						// 				});
							var proSuccess = dialog({
					    					content: "<div class='clickPro'>" +
					    										"<div class='dialog-pos'>您是第<span class='totalPro'>" + proTimes + "</span>位点赞者～<div style='height:4rem;font-size:0.6rem;margin-top:1rem'>公寓已收到您的赞美</br>感谢您的助力～</div></div>"+
					    										"<div class='okPro'><img width='' src='http://static.quhuhu.com/image/topic/store/20160119/sure.png' alt=''></div>"+
					    										"</div>",
					    										//quickClose:true
										});
								proSuccess.showModal();
								$('.okPro').on('click',function () {
									proSuccess.remove();
									var hasProed = "<div class='has-proed'> 您已经点过赞啦！<br/><p style='font-size:0.4rem'>门店收集到<span style='color:yellow'>"+proTimes+"</span>个赞，在参与活动的门店中排名第<span style='color:yellow'>"+ ranking+"</span></p></div>"
									$('.fllowerL').after(hasProed);
									$('.pro-dot').addClass('hide');
									$('.pre-order img').removeClass('hide');
									$('.fakeroom').addClass('mask');
								})	
					};
			}
		})
		// var proSuccess = dialog({
  //   	content: "<div class='clickPro'>" +
  //   								"<p class='dialog-pos'>您是第<span class='totalPro'>137</span>位点赞者～</br></br>公寓已收到您的赞美，感谢您的助力～</p>"+
  //   								"<div class='okPro'><img width='' src='http://static.quhuhu.com/image/topic/store/20160119/okPro.png' alt=''></div>"+
  //   						"</div>",
		// });
		// proSuccess.showModal();

	})

	// var iscroll = new IScroll('.wrapper');
	// iscroll.refresh()


  //预定酒店
  $('.pre-order img').on('click',function () {
  	window.location.href = 'http://touch.quhuhu.com/hotel/m/t/briefIntroduction?realHotelNo=' + hotel_no;
  })
})
