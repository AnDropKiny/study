"use strict";

class MyDick {
    #dickCum = 1;
    constructor(long, width, amount) {
        this.long = long;
        this.width = width;
        this.amount = amount;
    }

    get dickAmount() {
        return this.amount;
    }
    set dickAmount(num) {
        this.amount = num;
    }

    showDick() {
        console.log(`Твой член имеет размер ${this.long}см, ширину ${this.width}см, 
        он выебал ${this.amount} баб ${this.#dickCum}`);
    }
}

let bigDick = new MyDick(19, 6, 50);

bigDick.showDick();

