// 함수상자 만들기
function print() {
    console.log(`print 함수 실행됨`);
}

print();

// 함수상자를 1급 객체로 다루기 : 함수상자를 변수상자에 할당 가능
const print2 = function () {
    console.log(`print2 함수 실행됨`);
}

// 화살표 함수 만들기
const print3 = () => {
    console.log(`print3 함수 실행됨`);
}

// 콜백 함수 사용하기
function add(a, b) {
    return a + b;
}

const output1 = add(10,10);
console.log(`더하기 결과 : ${output1}`);

const add2 = (a, b, callback) => {
    const result = a + b;
    callback (result);
}

add2(10, 10, (output) => {
    console.log(`콜백 함수 안에서 더하기 결과 : ${output}`);
})