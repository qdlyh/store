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

  /* ================================swiper========================================= */
  var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    speed: 600,
    onSlideChangeEnd: function(swiper){
      var currentSlide = $("#swiper_wrapper").find(".swiper-slide").eq(swiper.activeIndex);
      if(typeof(currentSlide.attr("done")) == "undefined"){
        swiper.lockSwipeToNext();
      }else{
        swiper.unlockSwipeToNext();
      }
    }
  });

  mySwiper.lockSwipeToNext();

  $(".answer-content").click(function () {
    // 解锁
    mySwiper.unlockSwipeToNext();
    var currentSlide = $(this).parents('.swiper-slide');
    if(typeof(currentSlide.attr("done")) == "undefined"){
      currentSlide.attr("done",true);
    }
    mySwiper.slideNext();
  });


/*var app = document.getElementById('app');
app .addEventListener('touchstart',function(e){
   //touchstart:触摸开始的一瞬间，这里的e包含的触摸一瞬间所触摸的元素的信息
   console.log('触摸开始')
 });  */
/* $(".answer-content").click(function () {
    app.addEventListener('touchmove', function (e) {
        //touchmove:触摸进行时，这里的e包含的触摸的元素信息
        console.log('触摸进行')

         var radio = $('input[type="radio"]:checked').length;
         console.log(radio)
         $(radio).each(function(){
           //console.log($(this))
           var index = $(this).parents('.swiper-slide').index();
           console.log(index) 

    })
  }) */

/* app.addEventListener('touchend', function (e) {
    //touchend:触摸结束的一瞬间，这里的e没有多大的作用
    console.log('触摸结束')
  }); */

/* $(".answer-content").click(function () {
    var currentSlide = $(".swiper-wrapper").find(".swiper-slide").eq(index);
    var radio = currentSlide.find("input[type='radio']:checked");
    if (currentSlide.radio.val()!= '') {
        mySwiper.slideNext();
    } else {
        mySwiper.lockSwipeToNext();
    }
})
*/


/* var radio = $('input[type="radio"]:checked');
  $('.swiper-slide').each(function(){
      //console.log(radio)
    //console.log($(this))
    var index = $(this).index();
    console.log(index)
  
}) 
})*/
/*  $(".answer-content-next").click(function () {
     var radio = $('input[type="radio"]:checked');
      //console.log(radio)
      $(radio).each(function(){
        //console.log($(this))
         index = $(this).parents('.swiper-slide').index();
          console.log(index)
        if (index.radio!=0) {
            console.log('跳')
             mySwiper.slideNext();
        }else {
            console.log('不跳')
            mySwiper.lockSwipeToNext();
        }
    })
  })   */

/*  $(".answer-content").click(function () {
    var index = mySwiper.activeIndex//索引
    //console.log(mySwiper.activeIndex) 
        var radio = $('input[type="radio"]:checked');
          //var radio = $("input[type='radio']").is(":checked")
            if (radio!='') {
                //console.log('下一题')
                mySwiper.slideNext();
                 console.log(index)
            } else {
                console.log('锁定')
                mySwiper.lockSwipeToNext();
            }
        
          }) */

/*          $(".answer-content").click(function () {   //点击input
   var xs = mySwiper.activeIndex//索引
    //console.log(mySwiper.activeIndex) 
        var radio = $('input[type="radio"]:checked'); //input
         
            if (xs.radio!='') {
                console.log('下一题')
                mySwiper.slideNext();
                 console.log(xs)
                 return false;
            } else {
                console.log('锁定不能下一题')
                mySwiper.lockSwipeToNext();
                return false;
            }
        
          })  */
/*  $(".answer-content").click(function () {
     var radio = $(this).closest('.swiper-slide').find('input');
     if (radio.is(':checked')) {
         console.log('下跳')
          mySwiper.slideNext();
     } else {
          console.log('锁定')
            mySwiper.lockSwipeToNext();
        } 
      }) */


/* $(".answer-content").click(function () {
    var radio = $('input[type="radio"]:checked');
    console.log(radio)
    $('.answer-wrap').each(function () {
        //console.log($(this))
        var index = $(this).parents('.swiper-slide').index();
        console.log(index)
        if (index) {
            if (radio!='') {
                console.log('跳')
                mySwiper.slideNext();
            } else {
                console.log('不跳')
                mySwiper.lockSwipeToNext();
            }
        }

    })
  }) */

/* $(".answer-content").click(function () {
     var radio = $('input[type="radio"]:checked');
      //console.log(radio)
      $('.swiper-slide').each(function(){
          //console.log(this)
             $(this).parents(".swiper-slide").index()
      //var index =  $('.swiper-slide').index(this)
          console.log(index)
      })
      
    }) */

/* $(".answer-content-next").click(function () {
    var slide = $('.swiper-slide');
    var radio = $('input[type="radio"]:checked');
    for (let i = 0; i < slide.length; i++) {
       
            //console.log(slide.text())
            console.log(slide[i])
        }
  
      }) */
/*$(".answer-content-next").click(function () {
    var slide = $('.swiper-slide');
    var radio = $('input[type="radio"]:checked');
    for (let i = 0; i < slide.length; i++) {
        for (let x = 0; i < radio.length; i++) {
            //console.log(slide.text())
            console.log(radio)
            if (radio[x] != null) {
                mySwiper.slideNext();
            } else {
                mySwiper.lockSwipeToNext();
            }
        }
        }
    
    
     var radio = $('input[type="radio"]:checked');
      if (radio != null) {
        mySwiper.slideNext();
   }
 }) */
/*  $(".answer-content").click(function () {
      var radio = $('input[type="radio"]:checked').length;
       if (radio !='') {
                console.log(false)
              mySwiper.slideNext();
            } else {    
                console.log(true)  
             // mySwiper.params. noSwiping=false  
      }
    })  */

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
      } else if (num <= 100) {
        console.log(num);
        alert('图五');
        return false;
      }
    })