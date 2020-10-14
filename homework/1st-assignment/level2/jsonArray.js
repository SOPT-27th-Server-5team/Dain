const serverMembers = [{
    name: "최다인",
    live: "양재",
    age: "23",
    hobby: "카페가기",
    part: "Server",
    status: "YB",
    gender: "여"
},
{
    name: "김수현",
    live: "강남",
    age: "24",
    hobby: "맛집탐방",
    part: "Server",
    status: "OB",
    gender: "여"
},
{
    name: "윤가영",
    live: "한성대입구",
    age: "21",
    hobby: "영화보기",
    part: "Server",
    status: "YB",
    gender: "여"
},
{
    name: "최예진",
    live: "오목교",
    age: "23",
    hobby: "음악감상",
    part: "Server",
    status: "YB",
    gender: "여"
},
{
    name: "이진호",
    live: "안산",
    age: "27",
    hobby: "독서하기",
    part: "Server",
    status: "YB",
    gender: "남"
},
{
    name: "최정균",
    live: "수유",
    age: "25",
    hobby: "산책하기",
    part: "Server",
    status: "OB",
    gender: "남"
}
]

const getMemberList = (members) => {
    members.filter(member => {
        console.log(member);
    })
}
getMemberList(serverMembers);