// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.

      function onYouTubeIframeAPIReady() {  /* 외부에서 가져온 유튜브 라이브러리가 찾아야 할 함수 이므로 이름 바꿀 수 없음 */
        // <div id="player"></div>
       new YT.Player('player', {
          videoId: 'An6LvWQuj_8', /* 어떤 id 값을 가지고 있는 유튜브 영상을 출력할거냐, 최초 저장할 유튜브 영상 ID */
          playerVars : {
            autoplay:true, // 자동 재생 유무
            loop : true, // 반복 재생 유무
            playlist: 'An6LvWQuj_8' // 반복 재생할 유튜브 영상 ID 목록
          },
          events:{
                /* 익명함수의 매개변수로 event: 동영상 플레이어가 onReady 즉, 준비가되면 함수를 실행해주는데 
            그 함수의 인수로 이 동영상이 플레이되는 상황자체를 데이터로써 넘겨주게됨*/
            onReady: function(event){
              event.target.mute()  /* target 지금 재생되고 있는 영상 자체를 의미 , 음소거*/
            }
          }
        })
      }