const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');
/*  const searchInputEl = document.querySelector('.search input'); 
    이 코드는 이미 1번라인에서 querySelector로 찾은 .search를 다시 찾는 것이므로,
    2번 라인처럼 .search를 찾아서 담아놓은 searchEl.변수로 querySelector(input) 한다.
    => 이미 찾은 요소 안에 있는 요소는 찾아놓은 요소에서 시작해서 최적화로 찾도록.
    여기서 document는 html문서를 말함.
*/

//search라는 div 요소 아무곳을 클릭하면 input이 focus 된다. (아이콘을 눌러도)
searchEl.addEventListener('click', function(){
  //Logic...
  searchInputEl.focus();
});

//input에 focusing이 되면 search에 focused라는 클래스가, input에는 지정 속성이 추가됨.
searchInputEl.addEventListener('focus', function(){
  //searchEl라는 요소에 classList라는 객체 추가한 뒤, add라는 메소드 추가
  //=> 어떤 요소에 클래스 정보를 담고 있는 객체에서 어떤 내용을 추가하겠다.
  searchEl.classList.add('focused');
  //setAttribute; html의 엘리먼트 속성을 지정할 때 쓰임(속성이름, 속성값)
  searchInputEl.setAttribute('placeholder','통합검색');
});

//blur가 되면 지정했던 클래스와, 속성을 제거해주어야함.
searchInputEl.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder','');
});


const badgeEL = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function(){
  console.log(window.scrollY); // scrollY ; 화면이 스크롤 될 때마다 Y 속성이 갱신됨. 위로부터 몇 픽셀 지점에 위치하는지 파악할 수 있음
  if(window.scrollY > 500){ 
      //뱃지 숨기기 
      /*badgeEL.style.display='none'; -> 방법 1 . 자연스럽지 않음 
        자바 스크립트에서 사용할 수 있는 라이브러리 gsap cdn 추가
        gsap.to(요소, 지속시간, 옵션(객체데이터의 형태, css속성을 사용할 수 있음, 문자는''사용));  */
      gsap.to(badgeEL, .6, {  //방법 2. 
        opacity: 0, // opacity 속성처럼 값을 숫자로 입력하는 속성들은, 전환효과 등을 통해 요소의 전/ 후 상태를 중간 숫자의 값으로 자연스럽게 만들어 줄 수 있지만, display 속성처럼 값이 숫자가 아닌 속성은 전/후 상태의 중간값이 존재하지 않기때문에, 자연스러운 전환효과를 적용할 수 없음
        display: 'none' /* (사용자에게 보이지 않을 뿐 실제 그 자리에 계속 존재하기때문에 없애줘야함) */
      });
      //ScrollToPlugin 버튼 보이기
      gsap.to('#to-top',.2, { 
        x:0
      });
  } else{
      //뱃지 보이기
      //badgeEL.style.display='block';
      gsap.to(badgeEL, .6, {
        opacity: 1,
        display: 'block'
      });
      //ScrollToPlugin 버튼 숨기기
      gsap.to(toTopEl, .2, { /* 47번라인 처럼 아이디('#to-top')를 직접 선언해도되고, 그걸 담은 변수를 가져와도 되고 */
        x:100
      });
  }
},300)); 
//300 : 0.3초 , 스크롤 이벤트를 해서 함수를 실행할때 0.3초 단위로 부하를 줘서 함수가 우르르르 실행되지않게함(일정시간에 1번씩만 실행되도록 제한을 걺).=> _.throttle
//_.throttle(함수, 시간)

/* 원래는 아래와 같았음
  window.addEventListener('scroll', function(){
  console.log('scrolling!');
  화면을 스크롤할때마다 함수가 실행됨. but, 사이트에 들어가는 내용이 많으면 많아질수록 프로젝트는 위험해짐
  버벅이는 현상이 생길 수 있음. 실행되는 함수의 수를 외부에서 가져올 수 있는 자바스크립트 라이브러리를 사용(lodash cdn) 
});*/
 // window : 브라우저의 하나의 탭(걍 하나의 창(화면)), window 객체는 브라우저가가지고 있는 여러가지 명령을 들고 있음  

// toTopEl 33번 라인에 선언됨.
toTopEl.addEventListener('click',function(){ /* 버튼을 클릭하면 맨 상단으로 scrollTo */
  gsap.to(window, .7,{
    scrollTo: 0
  });
});

 const fadeEls = document.querySelectorAll('.visual .fade-in');
 fadeEls.forEach(function (fadeEl, index) { 
   /* fade-in이라는 클래스를 가지고 있는 요소들을 하나씩 순차적으로 
   함수에서 쓸 수 있게 data로 내어줌. 그것을 통상적으로 'fadeEl'단수형태로 이름지어 쓸 수 있음 */
   // gsap.to(요소, 지속시간, 옵션);
   gsap.to(fadeEl, 1, {
    delay: (index + 1 ) * .7, //[0]0.7 , [1]1.4 , [2]2.1, [3] 2.7
    opacity : 1
   });
 });

//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', /* 디폴트는 horizental */
  autoplay: true,
  loop: true 
});
new Swiper('.promotion .swiper-container',{
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBeteen: 10, // 슬라이드 사이 여백 
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true ,
  autoplay: {
    delay : 5000 //5초에 한번씩 딜레이
  },
  pagination : {
    el: '.promotion .swiper-pagination', // 페이지 요소 선택자 ; 실제로 페이지 번호를 사용하는 그 요소로 사용하겠다.
    clickable : true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container',{
  autoplay:true,
  loop:true,
  spaceBeteen: 30,
  slidesPerView: 5, /* 하나의 화면에 몇개의 슬라이드를 보여줄거냐 */
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; /* 언제든지 값이 바뀔 수 있는 let ; True*/
promotionToggleBtn.addEventListener('click',function(){
  isHidePromotion = ! isHidePromotion /* 반대의 값이 된다면 */
  if(isHidePromotion){
    //숨김처리!
    promotionEl.classList.add('hide');
  }else{
    //보임처리
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션);
  gsap.to(selector, random(1.5, 2.5), {
    y: size, //y축으로
    repeat: -1, //반복해서
    yoyo: true, //왔던 자리로 돌아가기
    ease: Power1.easeInOut,
    delay: random(0, delay)
  });
}
floatingObject('.floating1', 1,15);
floatingObject('.floating2', .5,15);
floatingObject('.floating3', 1.5,20);


/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy')
//요소들 반복 처리 
spyEls.forEach(function (spyEl) {
  new ScrollMagic  
    .Scene({ /* Scene().특정한 요소를 감시하는 옵션 */
      triggerElement:spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 
      //뷰포트가 시작하는 부분 0 , 끝나는 부분 1,내가 감시하고 있는 요소가 뷰포트의 어떤 지점에서 감시되었다는 것을 판단할 것인가
    })
    .setClassToggle(spyEl,'show') // setClassToggle ; 어떤 클래스를 넣었다 뺐다(요소와 클래스이름 )
    .addTo(new ScrollMagic.Controller()); // addTo; ScrollMagic가 필요한 컨트롤러라는 라이브러리를 추가한다
})


const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //2021
/* 현재 날짜의 연도가 숫자데이터로 반환됨 */

/* textContent 값을 알아내거나, 지정할 수 있음 */
