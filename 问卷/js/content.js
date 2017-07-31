// 日期
var currYear = (new Date()).getFullYear();
var opt = {
  preset: 'date'
};
opt.default = {
  width: 250,
  theme: 'material', //皮肤
  display: 'modal', //显示方式 
  mode: 'scroller', //日期选择模式
  dateFormat: 'yyyy年-mm月-dd日', // 日期格式
  lang: 'zh',
  display: 'bottom',
  showNow: true,
  nowText: "今天",
  stepMinute: 1,
  startYear: currYear - 70, //开始年份
  endYear: currYear + 0 //结束年份
};
var optDateTime = $.extend(opt['date'], opt['default']);

var mySwiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  speed: 600,
});

var li_num = 0; //初始化
var content_box = $("#content-box"); //所有块集合
var li_all = content_box.find("li").length; //集合块的li长度
var div_one = '<div class="swiper-slide">' +'<div class="my-slide">'+ content_box.find("li").eq(li_num).html() + '</div></div>'; //找到li里的第一题并添加class为swiper-slide的
mySwiper.appendSlide(div_one); //显示第一题
// 给每个单选框绑定事件
$("body").on("click", ".answer-content", function () {
  var onSwiper = $(this).parents(".swiper-slide"); //当前点击的块
  var i = mySwiper.activeIndex; //点击的索引
  var swiperIndex = mySwiper.slides.length; //swiper现在的所有swiper-slide
  if (swiperIndex <= li_all) { //当swiper里的题目数目小于等于总题目数的时候才执行下面操作
    if (onSwiper.find("#StartTime").val() != "") { //判断时间是否为空
      if (i === swiperIndex - 1) { //对应索引，如果点击的是当前swiper的最后一道题则根据当前的swiper索引在content_box中获取该索引对应的题目并且append进去
        var div = $('<div class="swiper-slide">'+'<div class="my-slide">' + content_box.find("li").eq(i + 1).html() + '</div></div>'); //在html里找到下一题的li
        mySwiper.appendSlide(div);
        $("#StartTime").mobiscroll(optDateTime).date(optDateTime);
      }
      // 跳转到下一页
      mySwiper.slideNext();
    } else {
      //alert("请选择时间哟")
      layer.msg('请选择出生日期', {
        time: 1500
      });
      return false;
    }
  }
});
// 多选框
function checkboxPage(self) { //参数是this
  var _this = $(self); // 获取点击的对象本身
  var _thisSwiper = _this.parents(".swiper-slide"); //点击的块
  var i = mySwiper.activeIndex; //点击的索引
  var swiperIndex = mySwiper.slides.length; //swiper现在的所有swiper-slide
  // 判断当前slide里面的多选是否有选中的值，没有则return
  var checkbox = _this.parents(".swiper-slide").find("input[type='checkbox']");
  var ifCheck = false;
  $.each(_thisSwiper.find('input:checkbox'), function () {
    if (this.checked) { //如果有多选有一个被选了，则给ifCheck赋值为true
      ifCheck = true;
    }
  });
  if (!ifCheck) { //如果ifCheck等于false
    //alert("还没选择哟");
    layer.msg('还没选择答题', {
      time: 1500
    });
    return false;
  }
  if (swiperIndex <= li_all) { //当swiper里的题目数目小于等于总题目数的时候才执行下面操作
    if (i === swiperIndex - 1) { //对应索引，如果点击的是当前swiper的最后一道题则根据当前的swiper索引在content_box中获取该索引对应的题目并且append进去
      var div = '<div class="swiper-slide">'+'<div class="my-slide">' + content_box.find("li").eq(i + 1).html() + '</div></div>'; //在html里找到下一题的li
      mySwiper.appendSlide(div);
    }
    // 跳转到下一页
    mySwiper.slideNext();
  }
}

function submit() {
  var score = $("input[type='radio'],input[type='checkbox']")
  var count = 0;
  for (var i = 0; i < score.length; i++) {
    if (score[i].checked == true) {
      count += parseInt(score[i].value);
      console.log(count);
    }
  }
  console.log(count)
  if (count <= 20) {
    alert('图一');
    return false;
  }
  if (count <= 40) {
    return false;
  }
  if (count <= 60) {
    alert('图三');
    return false;
  }
  if (count <= 80) {
    alert('图四');
    return false;
  }
  if (count <= 100) {
    alert('图五');
    return false;
  }
  if (count > 100) {
    alert('图六');
    return false;
  }
  if ($('.textarea').val().length < 10) {
    alert('不能超过300字哟')
    return false;
  }
}