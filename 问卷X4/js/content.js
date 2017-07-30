
// 日期插件
var currYear = (new Date()).getFullYear();
var opt = {
    preset: 'date'
};
opt.default = {
    width: 200,
    theme: 'material', //皮肤
    display: 'modal', //显示方式 
    mode: 'scroller', //日期选择模式
    dateFormat: 'yyyy年-mm月-dd日', // 日期格式
    lang: 'zh',
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

var num = 0;
var formWrapper = $("#question_wrapper");   //所有块集合
var allLi = formWrapper.find("li").length;   //集合块的li长度
//console.log(allLi)
var html = '<div class="swiper-slide">' + formWrapper.find("li").eq(num).html() + '</div>'; //找到当前对应的li
mySwiper.appendSlide('<div class="swiper-slide">' + html + '</div>');  //添加li

$("body").on("click", ".answer-content", function () {
    var i = mySwiper.activeIndex;//点击的索引 
    //console.log(i)
    var swiperIndex = mySwiper.slides.length;//swiper现在的所有slide
    //console.log(swiperIndex)
    if (swiperIndex <= allLi) { // 如果点的这个是最后一个

        if (i === swiperIndex - 1) { //点击索引等于所有slide-1对应到索引的值
            var div = '<div class="swiper-slide">' + formWrapper.find("li").eq(i + 1).html() + '</div>';//当前索引下的li+1
            mySwiper.appendSlide(div);//插入div
            $("#StartTime").mobiscroll(optDateTime).date(optDateTime); //添加点击的时间
        }
        mySwiper.slideNext();
    }
});

function subForm() {
    var score = $("input[type='radio'],input[type='checkbox']")
    var count = 0;
    for (let i = 0; i < score.length; i++) {
        if (score[i].checked == true) {
            count += parseInt(score[i].value);
            console.log(count);
        }
    }
    console.log(count)
    if (count <= 20) {
        alert('图一');
        return false;
    } else if (count <= 40) {
        return false;
    } else if (count <= 60) {
        alert('图三');
        return false;
    } else if (count <= 80) {
        alert('图四');
        return false;
    } else if (count <= 100) {
        alert('图五');
        return false;
    } else if (count > 100) {
        alert('图六');
        return false;
    }

}
