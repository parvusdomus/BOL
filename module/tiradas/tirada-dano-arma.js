export function tiradaDanoDesdeArma (actor, dataset, bonos)
{
   var tirada = "";
   var label = "";
   var bonodanoarmaValor=0;
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
   if (Number(bonos) > 0){
     tirada = tirada.concat ("+",bonos);
   }
   else if (Number(bonos) < 0){
     tirada = tirada.concat (bonos);
   }
   let tiradaDados = new Roll (tirada, actor.data.data);
   tiradaDados.roll();

   if (Number(bonos) > 0){
     label = dataset.nombrearma ? `DAÑO DE ${dataset.nombrearma}:  <br>${dataset.danoarma} + ${dataset.bonodanoarma} (${bonodanoarmaValor}) + ${bonos}` : '';
   }
   else if (Number(bonos) < 0){
     label = dataset.nombrearma ? `DAÑO DE ${dataset.nombrearma}:  <br>${dataset.danoarma} + ${dataset.bonodanoarma} (${bonodanoarmaValor}) ${bonos}` : '';
   }
   else if (Number(bonos) == 0){
     label = dataset.nombrearma ? `DAÑO DE ${dataset.nombrearma}:  <br>${dataset.danoarma} + ${dataset.bonodanoarma} (${bonodanoarmaValor})` : '';
   }

   let flavor = "<b>" + label + "</b>";

   tiradaDados.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: flavor
   });
}
