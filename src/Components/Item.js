
class item {

    // o Math serve para não ter a chance de 2 itens terem o mesmo Id quando são chamados pelo localStorage
    static lastId = 0 + Math.random() * 1000;

    constructor(text, habit, priority, day, month, year) {
        this.id = item.lastId++;
        this.text = text;
        this.done = false;
        this.habit = habit;
        this.priority = priority;
        this.day = day;
        this.month = month;
        this.year = year;
    }
}

export default item;