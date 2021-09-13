export function tiradaArmadura (actor, dataset, bonos)
{
   var tirada = "";
   var label = "";
   if (dataset.proteccion == "1"){
     tirada = tirada.concat ("1");
   }
   else if (dataset.proteccion == "2"){
     tirada = tirada.concat ("2");
   }
   else if (dataset.proteccion == "3"){
     tirada = tirada.concat ("3");
   }
   else if (dataset.proteccion == "D6-3"){
     tirada = tirada.concat ("1d6-3");
   }
   else if (dataset.proteccion == "D6-2"){
     tirada = tirada.concat ("1d6-2");
   }
   else if (dataset.proteccion == "D6-1"){
     tirada = tirada.concat ("1d6-1");
   }

   if (Number(bonos) > 0){
     tirada = tirada.concat ("+",bonos);
   }
   else if (Number(bonos) < 0){
     tirada = tirada.concat (bonos);
   }
   let tiradaDados = new Roll (tirada, actor.data.data);
   tiradaDados.roll();

   if (Number(bonos) > 0){
     label = dataset.nombrearmadura ? `PROTECCIÓN DE ${dataset.nombrearmadura}:  <br>${dataset.proteccion} + ${bonos}` : '';
   }
   else if (Number(bonos) < 0){
     label = dataset.nombrearmadura ? `PROTECCIÓN DE ${dataset.nombrearmadura}:  <br>${dataset.proteccion} ${bonos}` : '';
   }
   else if (Number(bonos) == 0){
     label = dataset.nombrearmadura ? `PROTECCIÓN DE ${dataset.nombrearmadura}:  <br>${dataset.proteccion}` : '';
   }

   let flavor = "<b>" + label + "</b>";

   tiradaDados.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: flavor
   });
}
