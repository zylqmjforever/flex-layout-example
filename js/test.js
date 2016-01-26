$(document).ready(function () {
	//检查错误提示存在
	function checkError () {
		var errorP = $('.error');
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
	//房型介绍副标题折行换行
	(function () {
			var subTitle = $('.room-desTitle .subTitle').html();
			var subTiLen = subTitle.length;
			console.log(subTiLen);
			if (subTiLen>15) {
					subTitle = subTitle.slice(0,15) +'...';
					$('.subTitle').html(subTitle);
			};
	})()

	$.ajax({
		'url':'',
		'type':'GET',
		'dataType':'json',
		success:function (res) {
			if (res.code == '0000') {
				var data = res.data;
				var outDate = data.outDate;
				var proTimes = data.proTimes;
				var hasOutDate = "<div class='has-proed'> 活动已经结束了！<br/><p style='font-size:0.4rem'>门店收集到<span>" +proTimes+"</span>个赞</p></div>";
				window.proTimes = proTimes;
				if (outDate) {
					$('.pro-dot').addClass('hide');
					$('.pre-order img').removeClass('hide');
					$('.fllowerL').after(hasOutDate);
				} else{
							if ($.cookie('pro')) {
								var hasProed = "<div class='has-proed'> 您已经点过赞啦！<br/><p style='font-size:0.4rem'>门店收集到<span>127</span>个赞</p></div>"
								$('.pro-dot').addClass('hide');
								$('.pre-order img').removeClass('hide');
								$('.fllowerL').after(hasProed);
						};
				};
			};
		}
	})

	$('.pro img').on('click',function () {
		$.ajax({
			'url':'',
			'type':'GET',
			'dataType':'json',
			success:function (res) {
				if (res.code == '0000') {
					var data = res.data;
					var proTimes = data.proTimes;
					var proSuccess = dialog({
		    					content: "<div class='clickPro'>" +
		    										"<p class='dialog-pos'>您是第<span class='totalPro'>" + proTimes + "</span>位点赞者～</br></br>公寓已收到您的赞美，感谢您的助力～</p>"+
		    										"<div class='okPro'><img width='' src='./img/okPro.png' alt=''></div>"+
		    										"</div>",
		    										//quickClose:true
							});
					var proWinning = dialog({
    							content: "<div class='clickWinning'>" +
    													"<div class='dialog-pos'>您是第199位点赞者～</br><span class='lottery'>恭喜您获得全国不限入住时间免费房券一张</span></div>"+
	    													"<div class='telWrapper'>"+
			    												"<input class='tel' maxlength='11' value='请输入您的电话号码'/>"+
			    												"<p class='error hide'>请输入正确电话号码</p>"+
			    												"<p class='errorI hide'>您尚未填写手机号码</p>"+
	    													"</div>"+
	    													"<div class='okFetch'><img width='' src='./img/okPro.png' alt=''></div>"+
    												"</div>",
    												//quickClose:true
							});
					var talkingGirlDialog = dialog({
								content: "<div class='fetchSuccess'>" +
														 "<p class='dialog-pos'>向世界传播爱的客服姑娘将在一个工作日内与您取得联系～</br></p>"+
														 "<div class='successFetch'><img width='' src='./img/okPro.png' alt=''></div>"+
													"</div>",
							// quickClose:true
							});
					if (protimes == (99||199||1999)) {
											proWinning.showModal();
											$('.tel').on('focus',function (e) {
																		var self = $(this);
																		self.val('');
																		checkError();
																		checkErrorOk();
																		checkIsInput();
																	});
											$('.tel').on('input',function (e) {
												var self = $(this);
												var phoneNum = Number(self.val());
												var data = {
													phoneNum : phoneNum
												};
												checkErrorOk();
												if (self.val().length==11) {
														self.blur();
													if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phoneNum)) {
															$('.error').removeClass('hide');
													}else{
														$('.okFetch img').on('click',function () {
																$.ajax({
																	'url':'',
																	'type':'POST',
																	'dataType':'json',
																	'data' : data
																	 success:function (res) {
																		if (res.code='0000') {
																			proWinning.remove();
																			talkingGirlDialog.showModal();
																			$('.successFetch img').on('click',function () {
																				talkingGirlDialog.remove();
																			})
																		};
																	}
																})
														})
													};
												};
											})
											$('.okFetch img').on('click',function () {
												var self = $(this);
												var str = '请输入您的电话号码';
												var phoneNum = $('.tel').val();
												var isNum = Number(phoneNum);
												if (!phoneNum) {
													checkError();
													// $('.error').val('').html('您尚未填写手机号码').removeClass('hide');
												}else{
													if (isNum && phoneNum.length!==11) {
													checkError();
													};
													if (str == phoneNum) {
														$('.errorI').removeClass('hide');
													};
												};
											})
					} else {
											proSuccess.showModal();
											$('.okPro').on('click',function () {
												proSuccess.remove();
												window.location.reload();
											})			
					};
				};
			}
		})
	})
})