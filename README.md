# README

## i. 팀원 정보 및 업무 분담 내역

|            | 수민             | 도균        |
| ---------- | ---------------- | ----------- |
| 담당       | 백엔드           | 프론트엔드  |
| 주사용언어 | python           | javascript  |
| 프레임워크 | django           | vue.js      |
| 주 역할    | 모델링, api 요청 | 디자인, css |

> 주 역할은 이와 같이 분담하였으나, 이외엔 유연하게 상황에 따라 역할을 나누어 프로젝트를 진행하였습니다.



##  ii. 목표 서비스 구현 및 실제 구현 정도

| 목표                                  | 구현여부 |
| ------------------------------------- | -------- |
| 명세에 기반한 기본 사용자 인증과 CRUD | ⭕        |
| Movie 정보 받아오기                   | ⭕        |
| 외부 API로 직접 검색                  | ⭕        |
| 사용자 취향 수집                      | ⭕        |
| 사용자 취향을 통한 영화 추천          | ⭕        |
| 사용자 간의 구독 시스템               | ⭕        |
| 구독정보를 활용한 영화 추천           | ❌        |
| 구독자 수를 반영하여 회원 등급만들기  | ❌        |
| API를 이용한 예매시스템               | ❌        |
| 예매시스템을 위한 위치정보 받아오기   | ❌        |
| 챗봇 기능                             | ❌        |

> 기본 시스템과 이를 기반으로한 추천 알고리즘과 추가적인 기능은 문제 없이 구현되었으나, 이외 외부 API를 활용한 기능은 비용 문제와, 시간적 문제로 구현하지 못하였습니다.





##  iii. 데이터베이스 모델링(ERD) 

![DB_modeling(erdcloud)](README.assets/DB_modeling(erdcloud).png)

Community

> Review와 Comment를 Crud 하는 App

- 각 review와 comment는 하나의 리뷰에 여러 댓글을 작성할 수 있는 1:N 관계를 이루고 있습니다.
- user와 review, user와 comment도 각 한 명의 유저가 여러개의 글과 댓글을 작성할 수 있는 1:N 관계를 이루고 있습니다.



Accounts

> Signup 과 Login 등 인증정보와 사용자의 구독정보, 위시리스트 등 사용자 App

- User는 django에서 기본 제공되는 AbstractUser를 상속받고 있습니다.
- 각각 User들간 자유롭게 subscribe 하는 M:N 관계를 이루고 있습니다.
- User와 Wish 는 1:N관계로, 한 명의 유저는 취향에 맞게 wish movie를 저장할 수 있습니다.
- 영화를 추가하기 때문에, user와 movie 모델을 wish를 중개로하는 M:N관계로 구성하여 영화는 여러 유저의 wish 가 될 수 있고, 유저는 여러 영화를 wish하게 만들고자 하였으나, movie에 tmdb에 요청되는 값 외에 field가 추가되는 경우 loaddata 가 실패되는 문제가 계속해서 발생하여 wish의 title과 num 정보를 각 string, int로 직접 받아오도록 하였습니다. 



Movies

> Now_playing , Popular, UpComing 등 카테고리별 movie 정보

- 각 카테고리의 Movie는 독자적인 모델입니다.
- 다만 genre는 외부 api에서 int 형태로 id 값을 받아오기 때문에 genre의 name 을 확인하도록 각 영화와 M:N 관계를 이루고 있습니다.



## iv. 필수 기능에 대한 설명 



### Community : 리뷰 및 댓글 app

- Review 
  - 인증된 사용자는 리뷰를 작성할 수 있고, 다른 사용자의 리뷰를 확인할 수 있습니다.
  - 인증된 사용자와 리뷰의 작성자가 동일하다면, 리뷰를 수정하고 삭제할 수 있습니다.
  - 리뷰는 10개 단위로 페이지네이션되어 확인할 수 있습니다.
  - review에서 직접 작성자의 프로필에 접근할 수 있습니다.
  - review에서 영화명을 클릭할 경우, 각 영화명을 TMDB의 API로 접근하여, 해당 영화의 detail 페이지로 넘어갈 수 있습니다.
- Comment
  - 인증된 사용자는 각 리뷰에 대해 댓글을 작성할 수 있으며, 각 리뷰별로 다른 사용자들의 댓글을 볼 수 있습니다.
  - 인증된 사용자와 댓글 작성자가 동일하다면, 댓글을 수정하고 삭제할 수 있습니다.
  - comment에서 직접 작성자의 프로필에 접근할 수 있습니다.



### Accounts : 사용자 정보 app

- Signup
  - 회원가입 기능입니다.
- login / out
  - jwt 토큰을 받아 로그인 할 수 있습니다.
- Wish
  - 사용자는 원하는 영화를 wish 리스트에 넣을 수 있습니다. wish될 경우 해당 영화의 title 정보와 num 정보가 넘어옵니다. num은 tmdb에서 활용되는 movie의 고유 id 입니다.
  - wish는 crud 로직과 유사하게 작동하여, get과 post는 각각 읽기와 wish 추가 요청을 보내며, delete 는 보낼 경우 wish 를 삭제할 수 있습니다.
- profile
  - 유저 id를 요청보낼 경우, 프로필페이지에 접근하여, user가 wish한 영화, 작성한 review와 comment를 확인할 수 있으며, 클릭할 경우 각 영화 detail과 review detail 페이지로 연결됩니다.
- subscribe
  - 구독기능을 추가하여, 원하는 유저의 프로필에서 구독을 추가하고 구독자 수를 확인할 수 있습니다.
  - 구독을 활용한 로직은 시간부족으로 추가되지 못했습니다.



### Movie : 영화 app

- MovieList : Now_playing, Popular, Up_Coming
  - 무비리스트 페이지에서는 각 현재 상영중, 인기, 개봉예정인 영화를 확인할 수 있습니다.
  - 각 영화의 데이터는 tmdb 를 통해 json 형식으로 받아와 db에 fixture로 loaddata 하였습니다.
  - carousel 을 활용하여, 영화정보를  확인할 수 있으며, 자동으로 페이지가 넘어가나 마우스 hover되며 멈추고 해당 이미지 자체를 드래그를 통해 넘겨서 볼 수 있습니다.
  - 영화의 이미지를 클릭하면 modal 형식으로 영화의 이미지를 크게 볼 수 있으며 해당 영화의 tmdb 에서의 평점과 wish 추가/삭제 기능을 할 수 있고, 영화제목 클릭시 detail 페이지로 넘어갈 수 있습니다. 
- Movie Detail
  - 영화의 상세페이지를 보여주며, 해당 영화명에 대한 리뷰 작성내역을 한눈에 확인할 수 있습니다.
  - 해당 페이지에서 유저는 영화를 wish 리스트에 추가하고, 삭제할 수 있으며, 외부 api로 검색을 요청할 수 있습니다.
  - movie detail은 영화의 제목을 직접 tmdb 에 요청을 보내 보여주기 때문에, fixture에 저장되지 않은 영화 정보도 확인할 수 있습니다.
  - 영화 제목인 간단하여 해당 제목을 포함한 영화 정보가 많을 경우에는 정확히 영화명이 일치하는 영화를 우선적으로 받아오게 됩니다. 일치하는 영화가 없다면 응답 데이터 중 0번째 인덱스를 보여주며, 응답데이터가 없을 경우 "존재하지 않는 영화입니다." 를 띄우게 됩니다.
- Recommend
  - 사용자가 추가한 Wish를 기반으로 영화를 추천합니다.
  - 사용자가 movielist에 들어가게 되면, 가장 상단에 사용자에게 영화를 추천합니다.
  - 로직은 wish 되어있는 영화 중 랜덤으로 하나의 영화 정보를 선정한 후, 해당 영화 정보를 tmdb에 similar 페이지로 송신합니다. 수신된 데이터는 랜덤으로 선택됩니다.
  - 수신된 데이터가 없다면(similar movie를 찾을 수 없다면) wish에서 선택된 영화를 추천영화 선정하여, tmdb의 movie detail 페이지로 요청을 보내 데이터를 받습니다.
  - 수신된 데이터는 랜덤으로 선택되어, 정보를 받고, 해당 정보 중 pk 정보를 다시 tmdb 서버의 video url로 송신하여 영상 key를 받아옵니다.
  - youtube url에 해당 key를 넣어, 영화 추천 페이지는 트레일러 영상과 함께 제공됩니다.
  - wish 영화가 없는 유저의 경우, 개발자들이 선택한 영화의 similar 영화가 랜덤으로 제공됩니다.



## v. 기타(느낀점)

수민

첫 프로젝트를 완성하며, 기업에서 프로젝트 경험을 요구하는 이유를 알 수 있었습니다. 직접 장기 프로젝트에 참가하여 역할을 나누고 협업을 하며, 백엔드와 프론트엔드의 역할에 대해 이해할 수 있었고, 저에게 좀 더 맞는 역할이 무엇인지 분명히 할 수 있었습니다. 2학기에 있을 프로젝트가 두렵기도 하고 조금은 기대되기도 합니다. 이번 기회를 통해 좀 더 개발자의 길에 한 걸음 가까워졌다고 생각합니다.

도균

vue와 디자인 및 css를 주로 구현했는데, vue의 경우 vuex를 쓰지 않고 구현하려다보니 데이터를 주고 받는 데에 좀 어려움을 느꼈습니다. 또한 장고의 경우 현재의 사용자를 `request.user`로 알 수 있었으나 vue의 경우는 처음에 방법을 알지 못해 profile 페이지 구현이 힘들었습니다. jwt토큰 디코딩 방법을 찾아서 해결할 수 있었으나 더 나은 방법이 있을 것 같다는 생각에 아쉬움이 남았습니다. vue의 경우 css와 연동되어 static 폴더에있는 이미지를 불러온다거나, 에니메이션 효과, 특히 Lifecycle  hook을 사용하는 것이 낯설었습니다. 아직 vue에 대한 이해가 확실하지 않은 상태로 구현하려다보니, 어떨 때 훅을 사용하고 함수를 호출해야하는지 어려웠습니다. 

이번 프로젝트를 통해서 혼자 찾아보고 해결하는 과정에서 정말 많은 공부가 된 것 같아서 2학기 프로젝트가 너무 기대되었습니다. 부족한 부분을 프로젝트로 채우는 것 같아서 앞으로도 다양한 프로젝트를 해보고싶습니다.