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