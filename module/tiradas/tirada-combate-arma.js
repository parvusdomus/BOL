export function tiradaAtaqueDesdeArma (actor, dataset, bonos, ventajas, Atacante_2AO, Atacante_2AD, Atacante_PD, Atacante_DT, Atacante_PO, Atacante_AT)
{
   var numdados = 2;
   var resultado = "";
   var tirada = "";
   var nTiradaSinBonos =0;
   var label = "";
   var textoVentajas ="";
   var valor1=0;
   var valor2=0;
   var nomValor1="";
   var nomValor2="";
   var flavor="";
   var bonoAccion =0;
   var textoAccion="";
   var textoAccion2="";

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
   if (Atacante_2AO){
     bonoAccion-=1;
     textoAccion="<i class=\"fas fa-hands tooltip\" style=\"color:red\"><span class=\"tooltiptext\">Ataque con dos Armas</span></i>";
   }
   if (Atacante_2AD){
     bonoAccion-=1;
     textoAccion="<i class=\"fas fa-hands tooltip\" style=\"color:blue\"><span class=\"tooltiptext\">Ataque con un Arma y Defiende con otra</span></i>";
   }
   if (Atacante_PD){
     bonoAccion-=1;
     textoAccion2="<i class=\"fas fa-shield tooltip\" style=\"color:red\"><span class=\"tooltiptext\">Posición Defensiva</span></i>";
   }
   if (Atacante_DT){
     ui.notifications.warn("En defensa total no se pueden efectuar ataques.");
     return 1;
   }
   if (Atacante_PO){
     bonoAccion+=1;
     textoAccion2="<i class=\"fas fa-fist-raised tooltip\" style=\"color:grey\"><span class=\"tooltiptext\">Posición Ofensiva</span></i>";
   }
   if (Atacante_AT){
     bonoAccion+=2;
     textoAccion2="<i class=\"fas fa-fist-raised tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Ataque Total</span></i><i class=\"fas fa-fist-raised tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Ataque Total</span></i>";
   }
   if (dataset.tipoarma == "CaC"){
     valor1=actor.data.data.CaC;
     valor2=actor.data.data.fuerza;
     nomValor1="CaC";
     nomValor2="Fuerza";
   }
   else if (dataset.tipoarma == "Dist")
   {
     valor1=actor.data.data.distancia;
     valor2=actor.data.data.agilidad;
     nomValor1="Dist";
     nomValor2="Agilidad";
   }
   if (Number (valor1) > 0){
     tirada = tirada.concat ("+", valor1);
   }
   else if (Number (valor1) < 0){
     tirada = tirada.concat (valor1);
   }
   if (Number (valor2) > 0){
     tirada = tirada.concat ("+", valor2);
   }
   else if (Number (valor2) < 0){
     tirada = tirada.concat (valor2);
   }

   if (Number(bonoAccion) > 0){
     tirada = tirada.concat ("+",bonoAccion);
   }
   else if (Number(bonoAccion) < 0){
     tirada = tirada.concat (bonoAccion);
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
     label = dataset.nombrearma ? `ATACANDO CON ${dataset.nombrearma}:  <br>${nomValor1}(${valor1}) + ${nomValor2} (${valor2}) + ${bonos}` : '';
   }
   else if (Number(bonos) < 0){
     nTiradaSinBonos = Number(tiradaDados.total) + Math.abs(Number(bonos));
     label = dataset.nombrearma ? `ATACANDO CON ${dataset.nombrearma}:  <br>${nomValor1}(${valor1}) + ${nomValor2} (${valor2}) ${bonos}` : '';
   }
   else if (Number(bonos) == 0){
     nTiradaSinBonos = Number(tiradaDados.total);
     label = dataset.nombrearma ? `ATACANDO CON ${dataset.nombrearma}:  <br>${nomValor1}(${valor1}) + ${nomValor2} (${valor2})` : '';
   }
   if (Number(valor1) > 0){
     nTiradaSinBonos -= Number(valor1);
   }
   else if (Number(valor1) < 0){
     nTiradaSinBonos += Math.abs(Number(valor1));
   }
   if (Number(valor2) > 0){
     nTiradaSinBonos -= Number(valor2);
   }
   else if (Number(valor2) < 0){
     nTiradaSinBonos += Math.abs(Number(valor2));
   }
   if (Number(bonoAccion) > 0){
     nTiradaSinBonos -= Number(bonoAccion);
   }
   else if (Number(bonoAccion) < 0){
     nTiradaSinBonos += Math.abs(Number(bonoAccion));
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

   flavor = "<b>" + label + textoVentajas + textoAccion + textoAccion2 + resultado + "</b>";

   tiradaDados.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: flavor
   });
}

export function tiradaAtaqueDesdeArmaEnemigos (actor, dataset, bonos, ventajas, Atacante_2AO, Atacante_2AD, Atacante_PD, Atacante_DT, Atacante_PO, Atacante_AT, Atacante_AA, defensor, Defensor_ESQ, Defensor_2AD, Defensor_PD, Defensor_DT, Defensor_PO, Defensor_AT)
{
   var numdados = 2;
   var resultado = "";
   var tirada = "";
   var nTiradaSinBonos =0;
   var label = "";
   var textoVentajas ="";
   var valor1=0;
   var valor2=0;
   var nomValor1="";
   var nomValor2="";
   var flavor="";
   var bonoAccion =0;
   var bonoDefensa =0;
   var textoAccion="";
   var textoAccion2="";
   var textoAccion2_2="";
   var textoAccion3="";
   var textoAccion4="";
   var ArmaduraVal="";
   const Defensor_Actor=canvas.tokens.get(defensor);
   let Defensa=Defensor_Actor.document._actor.data.data.defensa;

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
   if (Atacante_2AO){
     bonoAccion-=1;
     textoAccion="<i class=\"fas fa-hands tooltip\" style=\"color:red\"><span class=\"tooltiptext\">Ataque con dos Armas</span></i>";
   }
   if (Atacante_2AD){
     bonoAccion-=1;
     textoAccion="<i class=\"fas fa-hands tooltip\" style=\"color:blue\"><span class=\"tooltiptext\">Ataque con un Arma y Defiende con otra</span></i>";
   }
   if (Atacante_PD){
     bonoAccion-=1;
     textoAccion2="<i class=\"fas fa-shield tooltip\" style=\"color:red\"><span class=\"tooltiptext\">Posición Defensiva</span></i>";
   }
   if (Atacante_DT){
     ui.notifications.warn("En defensa total no se pueden efectuar ataques.");
     return 1;
   }
   if (Atacante_PO){
     bonoAccion+=1;
     textoAccion2="<i class=\"fas fa-fist-raised tooltip\" style=\"color:grey\"><span class=\"tooltiptext\">Posición Ofensiva</span></i>";
   }
   if (Atacante_AT){
     bonoAccion+=2;
     textoAccion2="<i class=\"fas fa-fist-raised tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Ataque Total</span></i><i class=\"fas fa-fist-raised tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Ataque Total</span></i>";
   }
   if (Atacante_AA){
     const Armadura = Defensor_Actor.document._actor.data.items.find((i) => i.type === "armadura"  && i.data.data.proteccion != 1);
     ArmaduraVal = getProperty(Armadura, 'data.data.proteccion') || 0;
     if (ArmaduraVal == "D6-3"){
       bonoAccion-=1;
       textoAccion2_2="<i class=\"fas fa-sun tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Atravesar Armadura: -1</span></i>";
     }
     if (ArmaduraVal == "D6-2"){
         bonoAccion-=2;
         textoAccion2_2="<i class=\"fas fa-sun tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Atravesar Armadura: -2</span></i>";
     }
     if (ArmaduraVal == "D6-1"){
         bonoAccion-=3;
         textoAccion2_2="<i class=\"fas fa-sun tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Atravesar Armadura: -3</span></i>";
     }
   }
   if (Defensor_ESQ){
     bonoDefensa+=1;
     textoAccion3="<i class=\"fas fa-shield tooltip\" style=\"color:green\"><span class=\"tooltiptext\">Se Protege con un Escudo</span></i>";
   }
   if (Defensor_2AD){
     bonoDefensa+=1;
     textoAccion3="<i class=\"fas fa-hands tooltip\" style=\"color:blue\"><span class=\"tooltiptext\">Ataque con un Arma y Defiende con otra</span></i>";
   }
   if (Defensor_PD){
     bonoDefensa+=1;
     textoAccion4="<i class=\"fas fa-shield tooltip\" style=\"color:grey\"><span class=\"tooltiptext\">Posición Defensiva</span></i>";
   }
   if (Defensor_DT){
     bonoDefensa+=2;
     textoAccion4="<i class=\"fas fa-shield tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Defensa Total</span></i><i class=\"fas fa-shield tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Defensa Total</span></i>";
   }
   if (Defensor_PO){
     bonoDefensa-=1;
     textoAccion4="<i class=\"fas fa-fist-raised tooltip\" style=\"color:grey\"><span class=\"tooltiptext\">Posición Ofensiva</span></i>";
   }
   if (Defensor_AT){
     bonoDefensa-=2;
     textoAccion4="<i class=\"fas fa-fist-raised tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Ataque Total</span></i><i class=\"fas fa-fist-raised tooltip\" style=\"color:black\"><span class=\"tooltiptext\">Ataque Total</span></i>";
   }

   if (dataset.tipoarma == "CaC"){
     valor1=actor.data.data.CaC;
     valor2=actor.data.data.fuerza;
     nomValor1="CaC";
     nomValor2="Fuerza";
   }
   else if (dataset.tipoarma == "Dist")
   {
     valor1=actor.data.data.distancia;
     valor2=actor.data.data.agilidad;
     nomValor1="Dist";
     nomValor2="Agilidad";
   }
   if (Number (valor1) > 0){
     tirada = tirada.concat ("+", valor1);
   }
   else if (Number (valor1) < 0){
     tirada = tirada.concat (valor1);
   }
   if (Number (valor2) > 0){
     tirada = tirada.concat ("+", valor2);
   }
   else if (Number (valor2) < 0){
     tirada = tirada.concat (valor2);
   }

   if (Number(bonoAccion) > 0){
     tirada = tirada.concat ("+",bonoAccion);
   }
   else if (Number(bonoAccion) < 0){
     tirada = tirada.concat (bonoAccion);
   }

   if (Number(Defensa) > 0){
     tirada = tirada.concat ("-",Defensa);
   }
   else if (Number(Defensa) < 0){
     tirada = tirada.concat ("+",Math.abs(Number(Defensa)));
   }

   if (Number(bonoDefensa) > 0){
     tirada = tirada.concat ("-",bonoDefensa);
   }
   else if (Number(bonoDefensa) < 0){
     tirada = tirada.concat ("+",Math.abs(Number(bonoDefensa)));
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
     label = dataset.nombrearma ? `ATACANDO CON ${dataset.nombrearma}:  <br>${nomValor1}(${valor1}) + ${nomValor2} (${valor2}) + ${bonos}` : '';
   }
   else if (Number(bonos) < 0){
     nTiradaSinBonos = Number(tiradaDados.total) + Math.abs(Number(bonos));
     label = dataset.nombrearma ? `ATACANDO CON ${dataset.nombrearma}:  <br>${nomValor1}(${valor1}) + ${nomValor2} (${valor2}) ${bonos}` : '';
   }
   else if (Number(bonos) == 0){
     nTiradaSinBonos = Number(tiradaDados.total);
     label = dataset.nombrearma ? `ATACANDO CON ${dataset.nombrearma}:  <br>${nomValor1}(${valor1}) + ${nomValor2} (${valor2})` : '';
   }
   if (Number(valor1) > 0){
     nTiradaSinBonos -= Number(valor1);
   }
   else if (Number(valor1) < 0){
     nTiradaSinBonos += Math.abs(Number(valor1));
   }
   if (Number(valor2) > 0){
     nTiradaSinBonos -= Number(valor2);
   }
   else if (Number(valor2) < 0){
     nTiradaSinBonos += Math.abs(Number(valor2));
   }
   if (Number(bonoAccion) > 0){
     nTiradaSinBonos -= Number(bonoAccion);
   }
   else if (Number(bonoAccion) < 0){
     nTiradaSinBonos += Math.abs(Number(bonoAccion));
   }

   if (Number(bonoDefensa) > 0){
     nTiradaSinBonos += Number(bonoDefensa);
   }
   else if (Number(bonoDefensa) < 0){
     nTiradaSinBonos -= Math.abs(Number(bonoDefensa));
   }
   if (Number(Defensa) > 0){
     nTiradaSinBonos += Number(Defensa);
   }
   else if (Number(Defensa) < 0){
     nTiradaSinBonos -= Math.abs(Number(Defensa));
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

   flavor = "<b>" + label + textoVentajas + textoAccion + textoAccion2 + textoAccion2_2 + "VS<div>" + Defensor_Actor.name + "</div><div>DEF: "+ Defensa + "</div>" + textoAccion3 + textoAccion4 + resultado + "</b>";

   tiradaDados.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: flavor
   });
}
