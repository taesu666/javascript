class Customer {
    constructor(name, cost) {
        this.name = name
        this.cost = cost
    }
}
let customer = new Customer('정태수', 6000);

class Staff {
    constructor(name, dep) {
        this.name = name
        this.dep = dep
    }
}
let staff = new Staff('정태호', 'front');


let calculator = {
    math: function () {
        if (customer.cost >= 5000) {
            return '계산완료';
        } else if (customer.cost < 5000) {
            return '잔액부족';
        }
    }
}

let store = {
    customer: customer,
    staff: staff,
    calculator: calculator,
    math: calculator.math(),

    print: function () {
        console.log(`손님정보 : ${this.customer.name}, ${this.customer.cost}`);
        console.log(`직원정보 : ${this.staff.name}, ${this.staff.dep}`);
        console.log(`계산결과 : ${this.math}`);
    }
}

store.print();

