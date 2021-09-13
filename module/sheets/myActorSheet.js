import {tiradaAtributo} from "../tiradas/tirada-atributo.js";
import {tiradaAtaqueDesdeAtributo} from "../tiradas/tirada-combate.js";
import {tiradaAtaqueDesdeArma} from "../tiradas/tirada-combate-arma.js";
import {tiradaDanoDesdeArma} from "../tiradas/tirada-dano-arma.js";
import {tiradaArmadura} from "../tiradas/tirada-armadura.js";
import {tiradaConjuro} from "../tiradas/tirada-conjuro.js";

export default class BOLActorSheet extends ActorSheet{
    get template(){
        return `systems/BOL/templates/sheets/actors/hoja-${this.actor.data.type}.html`;

    }

    getData() {
      const data = super.getData().data;
      data.dtypes = ["String", "Number", "Boolean"];
      if (this.actor.data.type == 'heroe' || this.actor.data.type == 'chusma' || this.actor.data.type == 'maton' || this.actor.data.type == 'villano') {
        this._prepareCharacterItems(data);
      }
      return data;
    }

    _prepareCharacterItems(sheetData) {
      const actorData = sheetData;

      // Inicializo arrays para meter los objetos por tipo.
      //"arma", "armadura", "escudo", "oficio", "objeto", "ventaja", "desventaja", "conjuro"
       const Armas = [];
       const Armaduras = [];
       const Escudos = [];
       const Oficios = [];
       const Objetos = [];
       const Ventajas = [];
       const Desventajas = [];
       const Conjuros = [];
       // Ordena los objetos por tipo y los mete en el array correspondiente
      for (let i of sheetData.items) {
        let item = i.data;
        i.img = i.img || DEFAULT_TOKEN;
        if (i.type === 'arma') {
          Armas.push(i);
        }
        else if (i.type === 'armadura') {
          Armaduras.push(i);
        }
         else if (i.type === "escudo") {
           Escudos.push(i);
         }
         else if (i.type === "oficio") {
           Oficios.push(i);
         }
         else if (i.type === "objeto") {
           Objetos.push(i);
         }
         else if (i.type === "ventaja") {
           Ventajas.push(i);
         }
         else if (i.type === "desventaja") {
           Desventajas.push(i);
         }
         else if (i.type === "conjuro") {
           Conjuros.push(i);
         }
      }

      //Asigno cada array al actordata
      actorData.Armas = Armas;
      actorData.Armaduras = Armaduras;
      actorData.Escudos = Escudos;
      actorData.Oficios = Oficios;
      actorData.Objetos = Objetos;
      actorData.Ventajas = Ventajas;
      actorData.Desventajas = Desventajas;
      actorData.Conjuros = Conjuros;
    }

    //Anado los escuchadores de eventos para que funcionen los clicks
    activateListeners(html) {
      super.activateListeners(html);

      // Si la hoja no es editable me salgo
      if (!this.options.editable) return;

      // Añadir Objeto
      html.find('.item-create').click(this._onItemCreate.bind(this));

      // Editar objetos
      html.find('.item-edit').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        item.sheet.render(true);
      });

      // Borrar objetos
      html.find('.item-delete').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        const objeto_a_borrar = this.actor.items.get(li.data("itemId"));
        objeto_a_borrar.delete();
        this.render(false);
        li.slideUp(200, () => this.render(false));
      });

      html.find('.tiradaAtributo').click(this._onTiradaAtributo.bind(this));
      html.find('.tiradaAtaqueAtributo').click(this._onTiradaAtaqueAtributo.bind(this));
      html.find('.tiradaAtaqueArma').click(this._onTiradaAtaqueArma.bind(this));
      html.find('.tiradaDanoArma').click(this._onTiradaDanoArma.bind(this));
      html.find('.tiradaConjuro').click(this._onTiradaConjuro.bind(this));
      html.find('.tiradaArmadura').click(this._onTiradaArmadura.bind(this));


    }

    //Funcion de añadir objetos
    _onItemCreate(event) {
      event.preventDefault();
      const header = event.currentTarget;
      // Get the type of item to create.
      const type = header.dataset.type;
      // Grab any data associated with this control.
      const data = duplicate(header.dataset);
      // Initialize a default name.
      const name = `${type.capitalize()}`;
      // Prepare the item object.
      const itemData = {
        name: name,
        type: type,
        data: data
      };
      // Remove the type from the dataset since it's in the itemData.type prop.
      delete itemData.data["type"];

      // Finally, create the item!
  //     return this.actor.createOwnedItem(itemData);
         return Item.create(itemData, {parent: this.actor});
    }

    _onTiradaAtributo(event) {
      console.log("TIRADA DE ATRIBUTO")
      const element = event.currentTarget;
      const dataset = element.dataset;
      let dialogContent = `
  	            <div class="flexcol">
                     <div>Bonos (Profesión u otros): <input id="bonos" value="0" size=2  data-dtype="Number"></div>
  		               <div>Ventaja/Desventaja (Total): <input id="ventajas" value="0" size=2  data-dtype="Number"></div>
  		        </div>`;
      let d = new Dialog({
        title: `Nueva tirada de ${dataset.label}`,
        content: dialogContent,
        buttons: {
           Lanzar: {
              icon: '<i class="fas fa-check"></i>',
              label: "Lanzar",
              callback: () => {
                 tiradaAtributo (this.actor, dataset, document.getElementById("bonos").value, document.getElementById("ventajas").value);
              }
  		 }
           },
        render: html => console.log("Register interactivity in the rendered dialog"),
        close: html => console.log("This always is logged no matter which option is chosen")
      });
      d.render(true);
    }

    _onTiradaAtaqueAtributo(event) {
      console.log("TIRADA DE ATAQUE DESDE ATRIBUTO")
      const element = event.currentTarget;
      const dataset = element.dataset;
      let dialogContent = `
  	            <div class="flexcol">
                     <div>Bonos (Profesión u otros): <input id="bonos" value="0" size=2  data-dtype="Number"></div>
  		               <div>Ventaja/Desventaja (Total): <input id="ventajas" value="0" size=2  data-dtype="Number"></div>
  		        </div>`;
      let d = new Dialog({
        title: `Nueva Tirada de ${dataset.label1}`,
        content: dialogContent,
        buttons: {
           Lanzar: {
              icon: '<i class="fas fa-check"></i>',
              label: "Lanzar",
              callback: () => {
                 tiradaAtaqueDesdeAtributo (this.actor, dataset, document.getElementById("bonos").value, document.getElementById("ventajas").value);
              }
  		 }
           },
        render: html => console.log("Register interactivity in the rendered dialog"),
        close: html => console.log("This always is logged no matter which option is chosen")
      });
      d.render(true);

    }

    _onTiradaAtaqueArma(event) {
      console.log("TIRADA DE ATAQUE DESDE ARMA")
      const element = event.currentTarget;
      const dataset = element.dataset;
      let dialogContent = `
                <div class="flexcol">
                     <div>Bonos (Profesión u otros): <input id="bonos" value="0" size=2 data-dtype="Number"></div>
                     <div>Ventaja/Desventaja (Total): <input id="ventajas" value="0" size=2 data-dtype="Number"></div>
              </div>`;
      let d = new Dialog({
        title: `Nueva Tirada de Ataque con ${dataset.nombrearma} (${dataset.tipoarma})`,
        content: dialogContent,
        buttons: {
           Lanzar: {
              icon: '<i class="fas fa-hand-rock"></i>',
              label: "Atacar",
              callback: () => {
                 tiradaAtaqueDesdeArma (this.actor, dataset, document.getElementById("bonos").value, document.getElementById("ventajas").value);
              }
       }
           },
        render: html => console.log("Register interactivity in the rendered dialog"),
        close: html => console.log("This always is logged no matter which option is chosen")
      });
      d.render(true);

    }
    _onTiradaDanoArma(event) {
      console.log("TIRADA DE DAÑO DESDE ARMA")
      const element = event.currentTarget;
      const dataset = element.dataset;
      let dialogContent = `
                <div class="flexcol">
                     <div>Bonos (Profesión u otros): <input id="bonos" value="0" size=2 data-dtype="Number"></div>
              </div>`;
      let d = new Dialog({
        title: `Nueva Tirada de Daño con ${dataset.nombrearma}`,
        content: dialogContent,
        buttons: {
           Lanzar: {
              icon: '<i class="fas fa-heartbeat"></i>',
              label: "Dañar",
              callback: () => {
                 tiradaDanoDesdeArma (this.actor, dataset, document.getElementById("bonos").value);
              }
       }
           },
        render: html => console.log("Register interactivity in the rendered dialog"),
        close: html => console.log("This always is logged no matter which option is chosen")
      });
      d.render(true);

    }
    _onTiradaConjuro(event) {
      console.log("TIRADA DE CONJURO")
      const element = event.currentTarget;
      const dataset = element.dataset;
      let dialogContent = `
  	            <div class="flexcol">
                     <div>Bonos (Profesión u otros): <input id="bonos" value="0" size=2  data-dtype="Number"></div>
  		               <div>Ventaja/Desventaja (Total): <input id="ventajas" value="0" size=2  data-dtype="Number"></div>
  		        </div>`;
      let d = new Dialog({
        title: `Nueva tirada de ${dataset.nombreconjuro}`,
        content: dialogContent,
        buttons: {
           Lanzar: {
              icon: '<i class="fas fa-meteor"></i>',
              label: "Conjurar",
              callback: () => {
                 tiradaConjuro (this.actor, dataset, document.getElementById("bonos").value, document.getElementById("ventajas").value);
              }
  		 }
           },
        render: html => console.log("Register interactivity in the rendered dialog"),
        close: html => console.log("This always is logged no matter which option is chosen")
      });
      d.render(true);
    }

    _onTiradaArmadura(event) {
      console.log("TIRADA DE ARMADURA")
      const element = event.currentTarget;
      const dataset = element.dataset;
      let dialogContent = `
                <div class="flexcol">
                     <div>Bonos (Profesión u otros): <input id="bonos" value="0" size=2 data-dtype="Number"></div>
              </div>`;
      let d = new Dialog({
        title: `Nueva Tirada de Armadura con ${dataset.nombrearmadura}`,
        content: dialogContent,
        buttons: {
           Lanzar: {
              icon: '<i class="fas fa-shield-alt"></i>',
              label: "Proteger",
              callback: () => {
                 tiradaArmadura (this.actor, dataset, document.getElementById("bonos").value);
              }
       }
           },
        render: html => console.log("Register interactivity in the rendered dialog"),
        close: html => console.log("This always is logged no matter which option is chosen")
      });
      d.render(true);
    }


}
