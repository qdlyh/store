		// 日期
		var currYear = (new Date()).getFullYear();
		var opt = {
			preset: 'date'
		};
		opt.default = {
			width: 250,
			height: 100,
			theme: 'material',
			display: 'modal',
			mode: 'scroller',
			dateFormat: 'yyyy年-mm月-dd日',
			lang: 'zh',
			display: 'bottom',
			showNow: true,
			nowText: "今天",
			stepMinute: 1,
			startYear: currYear - 70, //开始年份
			endYear: currYear + 0 //结束年份
		};
		var optDateTime = $.extend(opt['date'], opt['default']);

		//单选或下一题
		$(".answer-content").on("click", function () {
			var item = $(this).parents(".item");
			var i = item.index();
			var go_page = typeof ($(this).attr("go-page")) == "undefined" ? 1 : parseInt($(this).attr("go-page")); //gp-page不存在的话默认为1，存在转换成数字
			if (go_page != "undefined") {
				item.nextAll(".item").hide();
				item.nextAll(".item").removeClass("active")
				item.nextAll(".item").find("input").removeAttr("checked")
			}
			if (item.find("#StartTime").val() == "") {
				layer.style(layer.msg('<span class="warn-time">请选择出生日期</span>'), {
					time: 1500,
					width: '100px',
					height: '100px',
				});
				return false;
			}
			var nextItem = $(".content").find(".item").eq(i + go_page);
			nextItem.show();
			item.addClass("active");
			scrollToElement(".content", nextItem);
			$("#StartTime").mobiscroll(optDateTime).date(optDateTime);
		});

		// 滚动到指定位置
		function scrollToElement(box, item) {
			var content = $(box);
			var scrollTo = item;
			content.animate({
				scrollTop: scrollTo.offset().top + content.scrollTop()
			}, 500);
		}


		// 多选点击
		$(".answer-checkbox").on("click", function () {
			var item = $(this).parents(".item");
			var nextBtn = item.find(".answer-content");
			var ifCheck = false;
			setTimeout(function () {
				$.each(item.find('input:checkbox'), function () {
					if (this.checked) { //多选选中了
						ifCheck = true;
					}
				});
				if (ifCheck) { //ifCheck为true
					nextBtn.text("下一题");
				} else {
					nextBtn.text("没有,或不知道");
				}
			}, 100);
		});


		function submit() {
			var d = new Date();
			d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
			var checkout = $("input[type='radio'],input[type='checkbox']")
			var store = document.cookie;
			var num = 0;
			for (let i = 0; i < checkout.length; i++) {
				if (checkout[i].checked == true) {
					num += parseInt(checkout[i].value);
					//console.log(num);
				}
			}
			if (num <= 40) {
				document.cookie = "dr" + "=" + num + ";" + "expires=" + d.toGMTString();
				window.open("1.html")
				return false;
			}
			if (num <= 60) {
				document.cookie = "dr" + "=" + num + ";" + "expires=" + d.toGMTString();
				window.open("2.html")
				return false;
			}
			if (num <= 80) {
				document.cookie = "dr" + "=" + num + ";" + "expires=" + d.toGMTString();
				window.open("3.html")
				return false;
			}
			if (num <= 100) {
				document.cookie = "dr" + "=" + num + ";" + "expires=" + d.toGMTString();
				window.open("4.html")
				return false;
			}
			if (num <= 110) {
				document.cookie = "dr" + "=" + num + ";" + "expires=" + d.toGMTString();
				window.open("5.html")
				return false;
			}
			if (num <= 120) {
				document.cookie = "dr" + "=" + num + ";" + "expires=" + d.toGMTString();
				window.open("6.html")
				return false;
			}
			if (num <= 130) {
				document.cookie = "dr" + "=" + num + ";" + "expires=" + d.toGMTString();
				window.open("7.html")
				return false;
			}
			if (num <= 140) {
				document.cookie = "dr" + "=" + num + ";" + "expires=" + d.toGMTString();
				window.open("8.html")
				return false;
			}
			if (num > 150) {
				document.cookie = "dr" + "=" + num + ";" + "expires=" + d.toGMTString();
				window.open("9.html")
				return false;
			}
		}

		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i].trim();
				if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
			}
			return false;
		}

		window.onload = function () {
			var user = getCookie("dr");
			if (user != "") {
				//console.log(user)
				if (user <= 40) {
					window.location.href = ("1.html");
					return false;
				}
				if (user <= 60) {
					window.location.href = ("2.html");
					return false;
				}
				if (user <= 80) {
					window.location.href = ("3.html");
					return false;
				}
				if (user <= 100) {
					window.location.href = ("4.html");
					return false;
				}
				if (user <= 110) {
					window.location.href = ("5.html");
					return false;
				}
				if (user <= 120) {
					window.location.href = ("6.html");
					return false;
				}
				if (nuser <= 130) {
					window.location.href = ("7.html");
					return false;
				}
				if (user <= 140) {
					window.location.href = ("8.html");
					return false;
				}
				if (user > 150) {
					window.location.href = ("9.html");
					return false;
				}
			}
		}