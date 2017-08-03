		// 日期
		var currYear = (new Date()).getFullYear();
		var opt = {
			preset: 'date'
		};
		opt.default = {
			width: 250,
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
			var i = item.index(); //索引
			var go_page = typeof ($(this).attr("go-page")) == "undefined" ? 1 : parseInt($(this).attr("go-page")); //gp-page不存在的话默认为1，存在转换成数字
			if (go_page != "undefined") { //之前是否跳过题
				item.nextAll(".item").hide(); //隐藏后面的题
				item.nextAll(".item").find("input").removeAttr("checked") //移除已选的题
			}
			if (item.find("#StartTime").val() == "") { //判断时间是否为空
				layer.msg('请选择出生日期', {
					time: 1500
				});
				return false;
			}
			var nextItem = $(".content").find(".item").eq(i + go_page);
			nextItem.show();
			item.addClass("active");
			scrollToElement(".content", nextItem); //定义滚动题目参数
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
			var nextBtn = item.find(".answer-content"); //找到按钮
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

		// 提交数据
		function submit() {
			var score = $("input[type='radio'],input[type='checkbox']")
			var num = 0;
			for (let i = 0; i < score.length; i++) {
				if (score[i].checked == true) {
					num += parseInt(score[i].value);
					console.log(num);
				}
			}
			if (num <= 30) {
				window.open("1.html")
				return false;
			}
			if (num <= 40) {
				window.open("2.html")
				return false;
			}
			if (num <= 60) {
				window.open("3.html")
				return false;
			}
			if (num <= 80) {
				window.open("4.html")
				return false;
			}
			if (num <= 100) {
				window.open("5.html")
				return false;
			}
			if (num <= 120) {
				window.open("6.html")
				return false;
			}
			if (num > 120) {
				window.open("7.html")
				return false;
			}
		}