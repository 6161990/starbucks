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
  } else{
      //뱃지 보이기
      //badgeEL.style.display='block';
      gsap.to(badgeEL, .6, {
        opacity: 1,
        display: 'block'
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
