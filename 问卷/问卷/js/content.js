/* 日期 */
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
$("#StartTime").mobiscroll(optDateTime).date(optDateTime);
var requestDate = $("#StartTime").val();
if (requestDate != "") {
    requestDate = new Date(requestDate);
    $("#StartTime").scroller('setDate', requestDate, true);
}

/* swiper */
var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    speed: 600,
});

$("input[type='radio'],.answer-content-next").click(function () {
    var radio = $('input[type="radio"]:checked').val();
    if (radio != null) {
        mySwiper.slideNext();
    } 
})

$('.answer-submit').click(function () {
    var score = $("input[type='radio'],input[type='checkbox']")
    var num = 0;
    for (let i = 0; i < score.length; i++) {
        if (score[i].checked == true) {
            num += parseInt(score[i].value);
            console.log(num);
        }
    }
    if (num <= 20) {
        console.log(num);
        alert('图一');
        return false;
    } else if (num <= 40) {
        console.log(num);
        alert('图二');
        return false;
    } else if (num <= 60) {
        console.log(num);
        alert('图三');
        return false;
    } else if (num <= 80) {
        console.log(num);
        alert('图四');
        return false;
    } else if (num >= 100) {
        console.log(num);
        alert('图五');
        return false;
    }
})