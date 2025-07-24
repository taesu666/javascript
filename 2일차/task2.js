
window.addEventListener('DOMContentLoaded', () => {
    console.log(`DOMContentLoaded 이벤트 호출됨`);
    // 현재시간 표시하기
    let time = document.querySelector('#time');
    setInterval(() => {

        let curTime = moment().format('YYYY-MM-DD HH:mm:ss');
        time.innerHTML = `<p>${curTime}</p>`;

    }, 1000)
})

function math() {

    // 입력한 값 가져오기
    let adultNum = document.querySelector('#adultNum');
    let childNum = document.querySelector('#childNum');
    let adultOnePrice = document.querySelector('#adultOnePrice');
    let childOnePrice = document.querySelector('#childOnePrice');
    let adultOneNightPrice = document.querySelector('#adultOneNightPrice')
    let childOneNightPrice = document.querySelector('#childOneNightPrice')
    let image = document.querySelector('#image');

    let hour = moment().hour();



    // 각각의 가격 총합
    let adultTotalPrice = Number(adultNum.value) * Number(adultOnePrice.value);
    let childTotalPrice = Number(childNum.value) * Number(childOnePrice.value);

    let adultTotalNightPrice = Number(adultNum.value) * Number(adultOneNightPrice.value);
    let childTotalNightPrice = Number(adultNum.value) * Number(childOneNightPrice.value);


    // 총인원
    let totalNum = Number(adultNum.value) + Number(childNum.value)

    // 라디오 값 받아오기
    let radio = document.getElementsByName('fiveNum');
    let selected = Array.from(radio).find(elem => elem.checked);

    // 입력 값 숫자 확인
    if (isNaN(adultTotalPrice) || isNaN(childTotalPrice)) {
        alert(`사용자가 입력한 값이 숫자가 아닙니다`);
        totalPrice.innerHTML = ``;
        image.src = 'images/sad.png';
        return;
    }

    if (selected.value == 'no') {
        if (totalNum >= 5) {
            alert(`5명이상이니 단체할인을 받으세요!`);
            return;
        } else
            if (hour >= 18) {
                totalPrice.innerHTML = `${adultTotalNightPrice + childTotalNightPrice} 원`;
            } else {
                totalPrice.innerHTML = `${adultTotalPrice + childTotalPrice} 원`;
            }
    } else if (selected.value == 'yes') {
        if (totalNum < 5) {
            alert(`단체할인을 받을수 없습니다!`);
            image.src = 'images/sad.png';
            return;
        } else
            if (hour >= 18) {
                totalPrice.innerHTML = `${(adultTotalNightPrice + childTotalNightPrice) * 0.8} 원`;
            }
            else {
                totalPrice.innerHTML = `${(adultTotalPrice + childTotalPrice) * 0.8} 원`;
            }
    }
    image.src = 'images/smile.png';
}


function startEvent() {
    let eventPersonNum = document.querySelector(`#eventPersonNum`);
    let result = document.querySelector(`#result`);
    var eventNum = []; 
    let personNum = Number(eventPersonNum.value);

    for (var i = 0; i < 6; i++) {
        
        var num = Math.floor(Math.random() * personNum) + 1;

        for (var j in eventNum) {
            while (num == eventNum[j]) { //현재 새로나온 숫자가 기존 숫자와 같으면
                num = Math.floor(Math.random() * personNum) + 1;
            }
        }
         eventNum.push(num)
    }
    result.innerHTML = `${eventNum}`;
}