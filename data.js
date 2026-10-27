// 이 파일만 수정하면 됩니다. 사진은 images/ 폴더에 넣고 파일명만 적으세요. (사진이 없으면 이름 첫 글자로 표시됨)
const PHONE = {
  battery: 95,   // 상단 배터리 숫자 (0~100)
  wallpaper: "images/wallpaper.jpg",   // 예: "images/wallpaper.jpg"
  // owner/contacts 선택 항목: display(표시 이름), category(회색 한 줄), bio, link, followers, following, postsCount(생략하면 실제 게시물 수),
  // highlights: [{ title: "제목", image: "images/hl1.jpg" }]
  owner: { name: "민여주", handle: "yeoju_id", photo: "", display: "민여주", category: "", bio: "소개글을 입력하세요", link: "", followers: "1429만", following: 11,
    highlights: [{ title: "하이라이트", image: "" }] },

  contacts: [
    { name: "김도영", handle: "do0_ye0", photo: "images/doyoung.jpg", display: "김도영", followers: "589만", following: 7, bio: "대한민국 센티넬 가이드 협회\n연구팀장 제 1 연구실 팀장" },
    { name: "정재현", handle: "_jeongjaehyun", photo: "images/jaehyun.jpg", followers: "781만", following: 10 },
    { name: "김정우", handle: "sugaringcandy", photo: "images/jungwoo.jpg", followers: "681만", following: 98, bio: "짱짱우" },
    { name: "이해찬", handle: "haechanahceah", photo: "images/haechan.jpg", followers: "513만", following: 10, bio: "🐻" },
    { name: "이제노", handle: "leejen_o_423", photo: "images/jeno.jpg", followers: "712만", following: 31 },
    { name: "박지성", handle: "the__and.y", photo: "images/jisung.jpg", followers: "509만", following: 7, bio: "EZzz 😴" },
    { name: "나재민", handle: "na.jaemin0813", photo: "images/jaemin.jpg", followers: "849만", following: 1, bio: "누나🥰" },
    { name: "김주연", handle: "zoo_yet", photo: "images/zooyeon.jpg", followers: "49만", following: 7, bio: "센터 1팀 팀장" },
    { name: "황인준", handle: "yellow_3to3", photo: "images/injun.jpg", followers: "121", following: 87, bio: "@korea_sentinel.guide_center" },
    { name: "송시현", handle: "sihyeon_45", photo: "images/sihyeon.jpg", followers: "21만", following: 7, bio: "1팀 가이드" },
    { name: "서태윤", handle: "tt_yun_12", photo: "images/taeyun.jpg", followers: "87", following: 72, bio: "Good Luck" }
  ],

  // with = 인스타 ID. from: "me"(오른쪽 노란 말풍선) / "them"(왼쪽)
  chats: [
    { with: "do0_ye0", messages: [
      { from: "them", text: "(대화 내용을 입력하세요)", time: "오후 12:00" },
      { from: "me",   text: "(내 답장을 입력하세요)",   time: "오후 12:01" }
    ]},
    { with: "_jeongjaehyun", messages: [
      { from: "them", text: "(대화 내용을 입력하세요)", time: "오전 9:30" }
    ]},
    { with: "sugaringcandy", messages: [
      { from: "me", text: "(대화 내용을 입력하세요)", time: "어제" }
    ]}
  ],

  // user = 인스타 ID, images = 사진 경로 배열(2장 이상이면 넘겨보기), music = 음악(선택), video: true = 릴스 아이콘
  // commentsList: [{ user: "인스타ID", text: "댓글" }] 로 댓글 추가
  // likes / comments / reposts / shares 는 숫자 또는 "1.1만" 같은 문자열
  posts: [
    { user: "do0_ye0", images: ["images/doyoung-post3.jpg"], music: "", caption: "여주랑", likes: 7350, comments: 64, reposts: 22, shares: 148, date: "2026년 9월 5일" },
    { user: "do0_ye0", images: ["images/doyoung-post2-1.jpg", "images/doyoung-post2-2.jpg", "images/doyoung-post2-3.jpg"], music: "", caption: "산책", likes: 6124, comments: 88, reposts: 31, shares: 205, date: "2026년 7월 19일" },
    { user: "do0_ye0", images: ["images/doyoung-post1.jpg"], music: "", caption: "첫사랑", likes: 8421, comments: 126, reposts: 54, shares: 312, date: "2025년 5월 19일",
      commentsList: [ { user: "na.jaemin0813", text: "누나🥰🥺" } ] },
    { user: "yeoju_id", images: ["", "", ""], music: "", caption: "캡션을 입력하세요", likes: 12, comments: 3, reposts: 0, shares: 1, date: "10월 26일" },
    { user: "yeoju_id", images: [""], caption: "두 번째 게시물", likes: 7, comments: 0, reposts: 0, shares: 0, date: "10월 20일", video: true }
  ],

  // 인스타 DM: with = 인스타 ID, from "me"(오른쪽 파란색) / "them"(왼쪽). 없으면 빈 대화창이 열림
  dms: [
    { with: "do0_ye0", messages: [
      { from: "them", text: "(DM 내용을 입력하세요)", time: "오후 12:00" },
      { from: "me",   text: "(내 답장을 입력하세요)", time: "오후 12:01" }
    ]}
  ],

  // 사진첩: image = 사진 경로(없으면 회색 칸)
  photos: [
    { image: "" }, { image: "" }, { image: "" },
    { image: "" }, { image: "" }, { image: "" }
  ],

  // 캘린더: date = "YYYY-MM-DD"(하루만) 또는 "MM-DD"(매년 반복)
  events: [
    { date: "02-01", title: "도영잉 생일" },
    { date: "02-05", title: "🐹🐣생일" },
    { date: "02-14", title: "재현이 생일" },
    { date: "02-19", title: "짱짱우 생일" },
    { date: "02-19", title: "태윤이 생일" },
    { date: "03-23", title: "황비서 생일" },
    { date: "04-23", title: "젠뭉이 생일" },
    { date: "06-06", title: "쪼푸 생일" },
    { date: "08-13", title: "사랑하는 재민이❤️ 생일" },
    { date: "09-21", title: "시현이 생일" },
    { date: "11-04", title: "김주연 생일" },

    { date: "2026-01-14", end: "2026-01-15", title: "지성이랑 담양 온천 여행" },
    { date: "2026-02-07", title: "도영이랑 데이트(본가방문)" },
    { date: "2026-02-19", title: "다같이 본가 가는 날" },
    { date: "2026-02-28", end: "2026-03-02", title: "정우 도쿄 여행" },
    { date: "2026-03-21", end: "2026-03-23", title: "재현이랑 마카오 여행" },
    { date: "2026-03-27", time: "오전 10:00", title: "센터장 면담" },
    { date: "2026-04-01", time: "오전 10:00", title: "센터장 면담" },
    { date: "2026-04-25", end: "2026-04-27", title: "제노랑 가오슝 여행" },
    { date: "2026-05-05", title: "보육원, 어린이 병동 방문" },
    { date: "2026-05-21", time: "오후 1:00", title: "한국대학교 강의" },
    { date: "2026-06-06", end: "2026-06-07", title: "쪼푸 제주도 호캉스" },
    { date: "2026-07-10", title: "국제 센티넬 가이드 협회 회담" },
    { date: "2026-07-25", title: "본가 방문" },
    { date: "2026-08-03", end: "2026-08-07", title: "여름 휴가" },
    { date: "2026-08-15", end: "2026-08-16", title: "재민이 오사카 여행" },

    { date: "2026-01-05", time: "오전 10:00", title: "센터 전체 임원 회의" },
    { date: "2026-01-05", time: "오후 4:00", title: "국제 협회 줌 회의" },
    { date: "2026-01-06", time: "오후 3:00", title: "인터뷰" },
    { date: "2026-01-23", title: "특식 나오는 날!!" },
    { date: "2026-02-10", title: "엄마 병원 검사 전화하기" },
    { date: "2026-02-12", title: "1팀 예산안 검토" },
    { date: "2026-02-12", time: "오후 2:00", title: "모교 방문" },
    { date: "2026-03-06", title: "보그 인터뷰" },
    { date: "2026-03-18", time: "오후 1:00", title: "모교 강연" },
    { date: "2026-05-07", time: "오전 11:00", title: "한국 고등학교 직업 특강" },
    { date: "2026-06-02", time: "오전 10:00", title: "전체 회의" },
    { date: "2026-06-05", time: "오전 10:00", title: "가이드 전체 회의" },

    { date: "2026-04-11", title: "재현이 백화점 데이트" },
    { date: "2026-04-13", time: "오후 12:00", title: "김의원" },
    { date: "2026-05-31", title: "지성 호캉스" },
    { date: "2026-07-06", title: "센티넬 가이드 희생자 추모 행사" },
    { date: "2026-09-18", time: "오전 10:00", title: "미국 줌 회의" },
    { date: "2026-09-19", title: "김주연 백화점" },
    { date: "2026-10-04", title: "정우 데이트" },
    { date: "2026-10-08", time: "오전 10:00", title: "센티넬 가이드 통합 회의" },
    { date: "2026-10-17", title: "해찬 김치찜" },
    { date: "2026-10-18", title: "도영이 강릉 당일치기" },
    { date: "2026-10-20", time: "오전 9:00", title: "훈련생 면담" },
    { date: "2026-11-01", title: "김주연 백화점 ㅡㅡ" },
    { date: "2026-11-06", title: "비서팀 회식" },
    { date: "2026-11-16", time: "오전 10:00", title: "서정대학교 강연" },
    { date: "2026-11-19", time: "오후 12:00", title: "센터장 점심" },
    { date: "2026-11-24", title: "제노 재민 데이트" },
    { date: "2026-12-04", title: "중국 센터 줌 회의" },
    { date: "2026-12-13", title: "재민 목걸이" },
    { date: "2026-12-25", title: "크리스마스" },
    { date: "2026-12-28", title: "연말 전체 회식" },
    { date: "2026-09-05", title: "도영이랑 맥주 데이트" }
  ],

  // 전화 기록: type = "in"(수신) / "out"(발신) / "missed"(부재중)
  calls: [
    { with: "do0_ye0", type: "in", time: "오후 12:00" },
    { with: "_jeongjaehyun", type: "missed", time: "오전 9:30" },
    { with: "sugaringcandy", type: "out", time: "어제" }
  ],

  // 메시지(문자): 카톡과 같은 형식
  sms: [
    { with: "haechanahceah", messages: [
      { from: "them", text: "(문자 내용을 입력하세요)", time: "오후 2:00" },
      { from: "me",   text: "(내 답장을 입력하세요)",   time: "오후 2:01" }
    ]}
  ],

  // 사파리: favorites 항목을 누르면 title/body가 페이지로 표시됨
  safari: {
    favorites: [
      { name: "네이버", url: "naver.com", title: "페이지 제목", body: "내용을 입력하세요." },
      { name: "유튜브", url: "youtube.com", title: "페이지 제목", body: "내용을 입력하세요." }
    ],
    history: [
      { title: "최근 방문 페이지", url: "example.com", body: "내용을 입력하세요." }
    ]
  },

  // 유튜브 뮤직: nowPlaying = 하단에 떠 있는 재생 중인 곡, music = 빠른 선곡(앨범 표지 cover 경로, duration 초)
  nowPlaying: { title: "재생 중인 곡 제목", artist: "아티스트", cover: "", duration: 200, url: "https://youtu.be/VYwPuzisCVg?si=rVLlhQ57bF_Ne6rd" },
  musicMode: "audio", // "audio" = 앨범 사진만 보이고 소리만 재생 / "video" = 영상 표시
  musicMore: "images/music/more.jpg",
  music: [
    { title: "A Million Dreams", artist: "Ziv Zaifman, Hugh Jackman, Michelle Williams", video: "VtF26WVCBgE", likes: "", comments: "", cover: "images/music/dreams.jpg", duration: 200 },
    { title: "사랑이 할 수 있는 일이 아직 있을까", video: "4YBNqNPjVM0", artist: "RADWIMPS", cover: "images/music/radwimps.jpg", duration: 200 },
    { title: "Drive", video: "7IGbp7gwTDU", artist: "미연", cover: "images/music/drive.jpg", duration: 200 },
    { title: "월령", video: "Yc7F58wlH_Y", artist: "심규선", cover: "images/music/wolryeong.jpg", duration: 200 },
    { title: "같은 시간 같은 자리", video: "NOieK5hNXMo", artist: "NCT DREAM", cover: "images/music/sametime.jpg", duration: 200 },
    { title: "Universe", video: "QxM4fbTEvFY", artist: "민현", cover: "images/music/universe.jpg", duration: 200 },
    { title: "Love wins all", video: "h-XrgiZiQgw", artist: "아이유(IU)", cover: "images/music/lovewins.jpg", duration: 200 },
    { title: "Keeping Your Head Up", video: "R-ASjmA79u8", artist: "Birdy", cover: "images/music/keeping.jpg", duration: 200 }
  ],

  notes: [
    { title: "메모 제목", body: "메모 내용을 입력하세요." }
  ]
};
