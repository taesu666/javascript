// 붕어빵 만들기

const fish1 = {
    name: '홍길동1',
    age: 21
}

const fishes = [];
fishes.push({
    name: '물고기1',
    age: 1
})

fishes.push({
    name: '물고기2',
    age: 2
})

console.log(`fishes의 칸수 : ${fishes.length}`);
console.log(`첫번째 칸에 있는 물고기 이름 : ${fishes[0].name}`);
console.log(`첫번째 칸에 있는 물고기 이름 : ${fishes[0]['name']}`);

class Fish {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const fish3 = new Fish('물고기3', 3);
const fish4 = new Fish('물고기4', 4);
