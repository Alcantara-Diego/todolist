
class item {

    // o Math serve para não ter a chance de 2 itens terem o mesmo Id quando são chamados pelo localStorage
    static lastId = 0 + Math.random() * 1000;

    constructor(text) {
        this.id = item.lastId++;
        this.text = text;
        this.done = false;
    }
}

export default item;