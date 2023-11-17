var swiper = new Swiper('.review-silde', {
    slidesPerView: 3,
    grabCursor:true,
    loop:true,
    slidesPerView: 3,      
    spaceBetween: 32,
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },

  });

  var swiper = new Swiper('.swiper.bottom', {
    spaceBetween: 40,
    grabCursor:true,
    nested:true,
    pagination: {
      el: ".pagination",
    },
  });

  var swiper = new Swiper('.process-slide', {
    grabCursor:true,
    slidesPerView:"auto",
    spaceBetween: 32,
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },

  });



  $('.top-btn').bind('click', function() {
    $('html, body').animate({scrollTop: '0'}, 680);
  });


  const tabs = document.querySelector(".sc-faq");
  const tabButtons = document.querySelectorAll(".faq-title .list li a");
  const contents = document.querySelectorAll(".faq-list ul");
  
  tabs.onclick = (e) => {
    const id = e.target.dataset.id;
    if (id) {
      tabButtons.forEach((btn) => {
        btn.classList.remove("on");
      });
      e.target.classList.add("on");
  
      contents.forEach((content) => {
        content.classList.remove("on");
      });
      const element = document.getElementById(id);
      element.classList.add("on");
    }
  };
  
  // 초기에는 첫 번째 클라이언트 탭을 선택 상태로 만듭니다.

  $(".sc-faq .client").addClass("on");
  $(".sc-faq .client-t").addClass("on");
  
  // 클릭한 탭을 활성화하고 해당 탭의 내용을 보이게 합니다.
  $(".sc-faq .list a").click(function (e) {
    e.preventDefault(); // 링크의 기본 동작을 중지합니다.
  
    var tabId = $(this).attr("data-id"); // 클릭한 링크의 data-id 어트리뷰트를 가져옵니다.
  
    // 모든 탭과 내용을 초기화합니다.
    $(".sc-faq .list a").removeClass("on");
    $(".text").removeClass("on");
  
    // 클릭한 탭과 해당 내용을 활성화합니다.
    $(this).addClass("on");
    $("#" + tabId).addClass("on");
    
    // 클라이언트와 파트너 탭 간에 "on" 클래스를 전환합니다.
    if (tabId === "Client") {
      $(".sc-faq .partner").removeClass("on");
    } else if (tabId === "Partner") {
      $(".sc-faq .client").removeClass("on");
    }
  });
  
// 탭 내의 li 제목을 클릭하면 해당 텍스트를 보여줍니다.
$(".faq-list ul li .title").click(function () {
  var text = $(this).siblings(".text"); // 클릭한 li의 형제인 text 요소를 선택합니다.
  
  // 클릭한 li의 text에 on 클래스를 추가하거나 제거합니다.
  text.toggleClass("on");

  // 클릭한 li의 title에 on 클래스를 추가하거나 제거합니다.
  $(this).toggleClass("on");
  
  // 다른 모든 text와 title 요소에서 on 클래스를 제거합니다.
  $(".text").not(text).removeClass("on");
  $(".title").not(this).removeClass("on");
});

$('.sc-projects .icon-menu a').click(function(e){
  e.preventDefault();
  type=$(this).data('sort');
  projectList(type);
})

projectList('all');
function projectList(type) {
  fetch('./assets/data/project.json')
.then(res=>res.json())
.then(json=>{
  data = json.projectList;

  filterData = data.filter(function(parm){
    if(type != 'all'){
      return parm.cate.includes(type);
  
    }else{
      return parm;
    }
  })
let html = ``;
filterData.forEach((element,index) => {
 onlymoBi =`
 <li class="mobile-on">
                        <a href=""> 더 많은 프로젝트 보러가기</a>
                    </li>`
  bannerEl = `
  <li class="more"><a href="" class="m-title">더 많은 프로젝트 보러가기 <img
                                src="https://img.echosting.cafe24.com/api/partner/front/images/icons/list-more-project-arrow.svg"
                                alt=""></a></li>`
                                
    resident = (element.resident)?"상주":"비상주";
    if(index<=4){
       html+=`<li>
    <div class="top">
        <span class="location">${resident}</span><span class="dot">•</span><span class="d-day">마감일 D-${element.dDay}</span>
    </div>
    <a href="" class="c-title">${element.title}</a>
    <p>${element.desc}</p>
    <div class="bottom">
        <img src="https://img.echosting.cafe24.com/api/partner/front/images/icons/search_period.png"
            alt="">
        <span class="date">${element.period}일</span>
    </div>
    </li>`
    }
   
  });
  result=html+bannerEl;
  result=html+onlymoBi;

  $('#projectList').html(result);
  // console.log(json);
})
}
