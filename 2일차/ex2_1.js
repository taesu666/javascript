// 여러개의 값을 하나의 변수상자에 넣기


let names = ['홍길동1', '홍길동2', '홍길동3'];
console.log(`names 배열 안에 있는 요소들의 개수 : ${names.length}`);
console.log(`names의 첫번째 칸에 들어있는 값은? : ${names[0]}`);

let fishes = [
    {
        name: '물고기1',
        age: 1,
    },
    {
        name: '물고기2',
        age: 2,
    },
]
console.log(`fishes 변수상자에 들어있는 요소의 개수 : ${fishes.length}`);
console.log(`fishes의 첫번째 칸에 들어있는 물고기의 이름은? : ${fishes[0].name}`);

console.log(`names 변수상자의 자료형은? : ${typeof (names)}`);
console.log(`names 변수상자의 첫번째 칸에 들어가 있는 값의 자료형은? : ${typeof (names[0])}`);

let fish1 = {
    name: '물고기1'
}
console.log(`fish1의 자료형은? : ${typeof (fish1)}`);

console.log(`names 변수상자는 배열인가요? : ${Array.isArray(names)}`);
console.log(`fish1 변수상자는 배열인가요? : ${Array.isArray(fish1)}`);

let print = () => {
    console.log(`print 함수 실행됨`);
}
console.log(`print 변수상자의 자료형은? : ${typeof (print)}`);

// 값 추가하기
fishes.push({
    name: '물고기3',
    age: 3
});
console.log(`fishes 변수상자에 들어가있는 칸의 개수 : ${fishes.length}`);

// 각 칸의 값을 하나씩 확인하기
// c 스타일 for문 -> 너무 느림, 권장X
for (let i = 0; i < fishes.length; i++) {
    console.log(`fishes의 ${i}번째 물고기 : ${fishes[i].name}`);
}
console.log(`----------------------------------------`);

let i = 0;
for (let fish of fishes) {
    console.log(`fishes의 ${i}번째 물고기 : ${fish.name}`);
    i += 1;
}
console.log(`----------------------------------------`);

fishes.forEach((value, index) => {
    console.log(`fishes의 ${index}번째 물고기 : ${value.name}`);
})

let house = {
    name: '우리집',
    children: [
        {
            name: '아이1',
            age: 11,
            fishes: [
                {
                    name: '물고기1',
                    age: 1
                }
            ]
        },
        {
            name: '아이2',
            age: 12,
        }
    ]
}
console.log(`----------------------------------------`);

console.log(`집 안에 있는 첫번째 아이가 가지고 있는 첫번째 물고기의 나이는? : ${house.children[0].fishes[0].age}`);

console.log(`fish1 물고기의 이름: ${fish1.name}`);
console.log(`fish1 물고기의 이름: ${fish1['name']}`);

let attrName = 'name'
console.log(`물고기의 이름 : ${fish1[attrName]}`);

console.log(`집 안에 있는 첫번째 아이가 가지고 있는 첫번째 물고기의 나이는? : ${house['children'][0]['fishes'][0]['age']}`);

// 붕어빵 (객체) 안에 들어있는 속성들을 글자로 바꿔주기
// JSON 포멧 (자바스크립트의 객체를 글자로 바뀐 것)
let houseInfo = JSON.stringify(house);
console.log(`house 정보 -> ${houseInfo}`);

let house2 = JSON.parse(houseInfo);
console.log(`house의 이름 : ${house2.name}`);

// 해시테이블 사용하기
let map = new Map();
map.set('강아지', {
    name: '강아지1',
    age: 1
});

map.set('고양이', {
    name: '고양이1',
    age: 2
});

let dog = map.get('강아지');
console.log(`해시맵에서 꺼내온 강아지의 이름 : ${dog.name}`);

let map2 = {}

map2['강아지'] = {
    name:'강아지1',
    age: 1
}

map2['고양이'] = {
    name:'고양이1',
    age: 2
}

let dog2 = map2['강아지'];
console.log(`꺼내온 강아지의 이름 : ${dog2.name}`);