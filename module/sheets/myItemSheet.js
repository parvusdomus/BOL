export default class BOLItemSheet extends ItemSheet{
    get template(){
        return `systems/BOL/templates/sheets/items/hoja-${this.item.data.type}.html`;

    }
}
