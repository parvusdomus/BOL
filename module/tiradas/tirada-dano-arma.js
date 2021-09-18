export function tiradaDanoDesdeArma (actor, dataset, bonos, Atacante_2AO, Atacante_GP, Atacante_AC)
{
   var tirada = "";
   var label = "";
   var opcion1 ="";
   var opcion2 ="";
   var opcion3 ="";
   var bonoTotal=bonos;
   var bonodanoarmaValor=0;
   var danoFinalArma = dataset.danoarma;
   console.log ("DATASET TIRADA ATAQUE ARMA");
   console.log (dataset);
   console.log ("Atacante_2AO, Atacante_GP, Atacante_AC");
   console.log (Atacante_2AO, Atacante_GP, Atacante_AC);
   if (Atacante_2AO){
     if (dataset.danoarma == "1"){
       tirada = tirada.concat ("1");
       ui.notifications.warn("El ataque con dos armas sólo se puede usar con armas ligeras y medias.");
     }
     else if (dataset.danoarma == "1D3"){
       tirada = tirada.concat ("1d3");
       ui.notifications.warn("El ataque con dos armas sólo se puede usar con armas ligeras y medias.");
     }
     else if (dataset.danoarma == "1D6B"){
       opcion1 ="<div>Ataque con dos armas</div>"
       tirada = tirada.concat ("1d6");
       danoFinalArma ="1D6B -> 1D6";
     }
     else if (dataset.danoarma == "1D6"){
       opcion1 ="<div>Ataque con dos armas</div>"
       tirada = tirada.concat ("2d6kh");
       danoFinalArma ="1D6 -> 1D6A"
     }
     else if (dataset.danoarma == "1D6A"){
       tirada = tirada.concat ("2d6kh");
       ui.notifications.warn("El ataque con dos armas sólo se puede usar con armas ligeras y medias.");
     }

   }
   else {
     if (dataset.danoarma == "1"){
       tirada = tirada.concat ("1");
     }
     else if (dataset.danoarma == "1D3"){
       tirada = tirada.concat ("1d3");
     }
     else if (dataset.danoarma == "1D6B"){
       tirada = tirada.concat ("2d6kl");
     }
     else if (dataset.danoarma == "1D6"){
       tirada = tirada.concat ("1d6");
     }
     else if (dataset.danoarma == "1D6A"){
       tirada = tirada.concat ("2d6kh");
     }
   }

   if (dataset.bonodanoarma == "FUE"){
     bonodanoarmaValor = actor.data.data.fuerza;
     if (actor.data.data.fuerza > 0){
       tirada = tirada.concat ("+", bonodanoarmaValor);
     } else if (actor.data.data.fuerza < 0){
       tirada = tirada.concat (bonodanoarmaValor);
     }
   }
   else if (dataset.bonodanoarma == "MITAD"){
     bonodanoarmaValor = Math.floor(Number(actor.data.data.fuerza)/2);
     if (actor.data.data.fuerza > 0){
       tirada = tirada.concat ("+", bonodanoarmaValor);
     } else if (actor.data.data.fuerza < 0){
       tirada = tirada.concat (bonodanoarmaValor);
     }
   }
   if (Atacante_GP){
     bonoTotal += 6;
     opcion2 ="<div>Corte violento / Golpe aplastante</div>"
   }

   if (Atacante_AC){
     opcion3 ="<div>Asesino de chusma</div>"
   }

   if (Number(bonoTotal) > 0){
     tirada = tirada.concat ("+",bonoTotal);
   }
   else if (Number(bonoTotal) < 0){
     tirada = tirada.concat (bonoTotal);
   }
   let tiradaDados = new Roll (tirada, actor.data.data);
   tiradaDados.roll();

   if (Number(bonoTotal) > 0){
     label = dataset.nombrearma ? `DAÑO DE ${dataset.nombrearma}:  <br>${danoFinalArma} + ${dataset.bonodanoarma} (${bonodanoarmaValor}) + ${bonos}` : '';
   }
   else if (Number(bonoTotal) < 0){
     label = dataset.nombrearma ? `DAÑO DE ${dataset.nombrearma}:  <br>${danoFinalArma} + ${dataset.bonodanoarma} (${bonodanoarmaValor}) ${bonos}` : '';
   }
   else if (Number(bonoTotal) == 0){
     label = dataset.nombrearma ? `DAÑO DE ${dataset.nombrearma}:  <br>${danoFinalArma} + ${dataset.bonodanoarma} (${bonodanoarmaValor})` : '';
   }

   let flavor = "<b>" + label + opcion1 + opcion2 + opcion3 + "</b>";

   tiradaDados.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: flavor
   });
}

export function tiradaDanoDesdeArmaEnemigos (actor, dataset, bonos, Atacante_2AO, Atacante_GP, Atacante_AC, Atacante_AA, defensor)
{
   var tirada = "";
   var label = "";
   var opcion1 ="";
   var opcion2 ="";
   var opcion3 ="";
   var opcion4 ="";
   var opcion5 ="";
   var opcion6 ="";
   var bonoTotal=bonos;
   var bonodanoarmaValor=0;
   var danoFinalArma = dataset.danoarma;
   console.log ("DATASET TIRADA ATAQUE ARMA CON ENEMIGOS");
   console.log (dataset);
   console.log ("Atacante_2AO, Atacante_GP, Atacante_AC, Atacante_AA, Defensor");
   console.log (Atacante_2AO, Atacante_GP, Atacante_AC, Atacante_AA, defensor);
   const Defensor_Actor=canvas.tokens.get(defensor);
   let armadura_equipada_defensor = Defensor_Actor.document._actor.data.items.find((i) => i.type === "armadura"  && i.data.data.proteccion != 1);
   let casco_equipado_defensor = Defensor_Actor.document._actor.data.items.find((i) => i.type === "armadura"  && i.data.data.proteccion == 1);
   console.log ("ARMADURA EQUIPADA");
   console.log (armadura_equipada_defensor);
   console.log ("NOMBRE ARMADURA");
   console.log (armadura_equipada_defensor.data.name);
   console.log ("PROTECCION ARMADURA");
   console.log (armadura_equipada_defensor.data.data.proteccion);
   console.log ("CASCO EQUIPADO");
   console.log (armadura_equipada_defensor);
   console.log ("NOMBRE CASCO");
   console.log (casco_equipado_defensor.data.name);
   console.log ("PROTECCION CASCO");
   console.log (casco_equipado_defensor.data.data.proteccion);
   if (Atacante_2AO){
     if (dataset.danoarma == "1"){
       tirada = tirada.concat ("1");
       ui.notifications.warn("El ataque con dos armas sólo se puede usar con armas ligeras y medias.");
     }
     else if (dataset.danoarma == "1D3"){
       tirada = tirada.concat ("1d3");
       ui.notifications.warn("El ataque con dos armas sólo se puede usar con armas ligeras y medias.");
     }
     else if (dataset.danoarma == "1D6B"){
       opcion1 ="<div>Ataque con dos armas</div>"
       tirada = tirada.concat ("1d6");
       danoFinalArma ="1D6B -> 1D6";
     }
     else if (dataset.danoarma == "1D6"){
       opcion1 ="<div>Ataque con dos armas</div>"
       tirada = tirada.concat ("2d6kh");
       danoFinalArma ="1D6 -> 1D6A"
     }
     else if (dataset.danoarma == "1D6A"){
       tirada = tirada.concat ("2d6kh");
       ui.notifications.warn("El ataque con dos armas sólo se puede usar con armas ligeras y medias.");
     }

   }
   else {
     if (dataset.danoarma == "1"){
       tirada = tirada.concat ("1");
     }
     else if (dataset.danoarma == "1D3"){
       tirada = tirada.concat ("1d3");
     }
     else if (dataset.danoarma == "1D6B"){
       tirada = tirada.concat ("2d6kl");
     }
     else if (dataset.danoarma == "1D6"){
       tirada = tirada.concat ("1d6");
     }
     else if (dataset.danoarma == "1D6A"){
       tirada = tirada.concat ("2d6kh");
     }
   }

   if (dataset.bonodanoarma == "FUE"){
     bonodanoarmaValor = actor.data.data.fuerza;
     if (actor.data.data.fuerza > 0){
       tirada = tirada.concat ("+", bonodanoarmaValor);
     } else if (actor.data.data.fuerza < 0){
       tirada = tirada.concat (bonodanoarmaValor);
     }
   }
   else if (dataset.bonodanoarma == "MITAD"){
     bonodanoarmaValor = Math.floor(Number(actor.data.data.fuerza)/2);
     if (actor.data.data.fuerza > 0){
       tirada = tirada.concat ("+", bonodanoarmaValor);
     } else if (actor.data.data.fuerza < 0){
       tirada = tirada.concat (bonodanoarmaValor);
     }
   }
   if (Atacante_GP){
     bonoTotal += 6;
     opcion2 ="<div>Corte violento / Golpe aplastante</div>";
   }

   if (Atacante_AC){
     opcion3 ="<div>Asesino de chusma</div>";
   }

   if (Number(bonoTotal) > 0){
     tirada = tirada.concat ("+",bonoTotal);
   }
   else if (Number(bonoTotal) < 0){
     tirada = tirada.concat (bonoTotal);
   }

   if (Atacante_AA){
     opcion4="<div>Atravesar Armadura</div>";
   }
   else {
     if (armadura_equipada_defensor.data.data.proteccion == "D6-3"){
       tirada = tirada.concat ("-(1d6-3)");
       opcion5 = "Armadura: D6-3";
     }
     else if (armadura_equipada_defensor.data.data.proteccion == "D6-2"){
       tirada = tirada.concat ("-(1d6-2)");
       opcion5 = "Armadura: D6-2";
     }
     else if (armadura_equipada_defensor.data.data.proteccion == "D6-1"){
       tirada = tirada.concat ("-(1d6-1)");
       opcion5 = "Armadura: D6-1";
     }
   }
   if (casco_equipado_defensor){
     tirada = tirada.concat ("-1");
     opcion6 = "Casco Equipado";
   }

   let tiradaDados = new Roll (tirada, actor.data.data);
   tiradaDados.roll();

   if (Number(bonoTotal) > 0){
     label = dataset.nombrearma ? `DAÑO DE ${dataset.nombrearma}:  <br>${danoFinalArma} + ${dataset.bonodanoarma} (${bonodanoarmaValor}) + ${bonos}` : '';
   }
   else if (Number(bonoTotal) < 0){
     label = dataset.nombrearma ? `DAÑO DE ${dataset.nombrearma}:  <br>${danoFinalArma} + ${dataset.bonodanoarma} (${bonodanoarmaValor}) ${bonos}` : '';
   }
   else if (Number(bonoTotal) == 0){
     label = dataset.nombrearma ? `DAÑO DE ${dataset.nombrearma}:  <br>${danoFinalArma} + ${dataset.bonodanoarma} (${bonodanoarmaValor})` : '';
   }

   let flavor = "<b>" + label + opcion1 + opcion2 + opcion3 + opcion4 + "<div>VS</div>" + "<div>" + Defensor_Actor.name + "</div>" + opcion5 + " " + opcion6 + "</b>";

   tiradaDados.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: flavor
   });
}
