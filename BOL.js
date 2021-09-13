import BOLItemSheet from "./module/sheets/myItemSheet.js";
import BOLActorSheet from "./module/sheets/myActorSheet.js";
Hooks.once("init", function(){
    console.log("test | Initializing BOL");

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("BOL", BOLItemSheet, {makeDefault: true});
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("BOL", BOLActorSheet, {makeDefault: true});

});
