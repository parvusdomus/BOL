export function tiradaAtaqueDesdeAtributo (actor, dataset, bonos, ventajas)
{
   var numdados = 2;
   var resultado = "";
   var tirada = "";
   var nTiradaSinBonos =0;
   var label = "";
   var textoVentajas ="";
   if (Number(ventajas) > 0){
     numdados += Math.abs(ventajas);
     tirada = tirada.concat (numdados, "d6kh2");
     textoVentajas="<div style=\"color:green;\">" + "CON " + ventajas + " VENTAJAS" + "</div>";
   }
   else if (Number(ventajas) < 0){
     numdados += Math.abs(ventajas);
     tirada = tirada.concat (numdados, "d6kl2");
     textoVentajas="<div style=\"color:red;\">" + "CON " + Math.abs(ventajas) + " DESVENTAJAS" + "</div>";
   }
   else if (Number(ventajas) == 0){
     tirada = tirada.concat (numdados, "d6");
   }
   if (Number (dataset.valor1) > 0){
     tirada = tirada.concat ("+", dataset.valor1);
   }
   else if (Number (dataset.valor1) < 0){
     tirada = tirada.concat (dataset.valor1);
   }
   if (Number (dataset.valor2) > 0){
     tirada = tirada.concat ("+", dataset.valor2);
   }
   else if (Number (dataset.valor2) < 0){
     tirada = tirada.concat (dataset.valor2);
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
     nTiradaSinBonos = Number(tiradaDados.total) - Number(bonos);
     label = dataset.label1 ? `LANZANDO ${dataset.label1} (${dataset.valor1}) + ${dataset.label2} (${dataset.valor2}) + ${bonos}` : '';
   }
   else if (Number(bonos) < 0){
     nTiradaSinBonos = Number(tiradaDados.total) + Math.abs(Number(bonos));
     label = dataset.label1 ? `LANZANDO ${dataset.label1} (${dataset.valor1}) + ${dataset.label2} (${dataset.valor2}) ${bonos}` : '';
   }
   else if (Number(bonos) == 0){
     nTiradaSinBonos = Number(tiradaDados.total);
     label = dataset.label1 ? `LANZANDO ${dataset.label1} (${dataset.valor1}) +  ${dataset.label2} (${dataset.valor2})` : '';
   }
   if (Number(dataset.valor1) > 0){
     nTiradaSinBonos -= Number(dataset.valor1);
   }
   else if (Number(dataset.valor1) < 0){
     nTiradaSinBonos += Math.abs(Number(dataset.valor1));
   }
   if (Number(dataset.valor2) > 0){
     nTiradaSinBonos -= Number(dataset.valor2);
   }
   else if (Number(dataset.valor2) < 0){
     nTiradaSinBonos += Math.abs(Number(dataset.valor2));
   }
   if (nTiradaSinBonos == 2){
     resultado = "<div style=\"color:red;\">" + "FRACASO AUTOMÁTICO" + "</div>";
   } else if (nTiradaSinBonos == 12)
   {
     resultado = "<div style=\"color:green;\">" + "ÉXITO AUTOMÁTICO" + "</div>";
     if (tiradaDados.total >= 9){
       resultado = "<div style=\"color:green;\">" + "ÉXITO ASOMBROSO" + "</div>";
     }
   } else if (tiradaDados.total >= 9)
   {
     resultado = "<div style=\"color:blue;\">" + "ÉXITO" + "</div>";
   } else
   {
     resultado = "<div style=\"color:grey;\">" + "FRACASO" + "</div>";
   }

   let flavor = "<b>" + label + textoVentajas + resultado + "</b>";

   tiradaDados.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: flavor
   });
}
