/*
 * 
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

"use strict";

// Access token for your app
// (copy token from DevX getting started page
// and save it as environment variable into the .env file)
const token = process.env.WHATSAPP_TOKEN;

// Importa las dependendias y configura el servidor
  const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json()); // crea un servidor html virtual

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("Cliente listo"));

// Definición de variables de entrada
let xd=0;
let esCapacitacion = false;
let esEducacion = false;
let esValido = false;
let respuesta;


// Acepta el POST REQUEST 
  app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the Incoming webhook message
  //console.log(JSON.stringify(req.body, null, 2));  
  
  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]&&
      req.body.entry[0].changes[0].value.contacts[0]
    ) {
      let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extrae el numero de teléfono desde la webhook
      let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extrae el mensaje del usuario desde la webhook
      let wamid_id= req.body.entry[0].changes[0].value.contacts[0].profile.name // extrae el nombre de usuario
    
// colocacion de las condiciones que son opciones válidas
if(msg_body=="1" || msg_body=="2" || msg_body=="A" || msg_body=="B" || msg_body=="C" || msg_body=="X"){
  esValido = true;
}else{ // en caso de no encontrar una condicion válida dar respuesta siguiente:
  respuesta ="Lo siento aun no logro entenderte, podrias seleccionar las siguientes opciones \n 1. Capacitacion \n 2. Documentacion"
}  

// Inicio de iteraciones, con mensaje de bienvenida y pedido de opciones
if(xd == 0){
 
    respuesta = "Bienvenido" +" "+ wamid_id + " " + "mi nombre es Finny tu asistente virtual.\n En caso de que necesites algunas recomendaciones sobre finanzas estoy acá para ayudarte.\n El paso es simple,marque:\n 1.Si necesitas consejos e infos sobre finanzas.\n 2.Si necesitas saber los requisitos para abrir tu cuenta de ahorro, solicitar una tarjeta de crédito o algún trámite similar."
}
// Condición para activación de capacitación marcado por la selección de opción 1 
if(msg_body == "1" || esCapacitacion== true ){
    respuesta = "Estas dando un paso importante en las finanzas,escribe una de las siguientes opciones para saber mas sobre: \n A. CUENTAS A LA VISTA \n B. CUENTA CORRIENTE  \n C. TARJETA DE CREDITO \n D. IVA \n E.HISTORIAL CREDITICIO \n X.VOLVER"
    xd = 1
}
 // Condición para activación de requisitos marcado por la selección de opción 1      
if(msg_body == "2"){
    respuesta = "Me encantaría ayudarte con los documentos necesarios. Me podrías indicar cuál es tu pedido? \n A. CUENTA AHORRO A LA VISTA \n B. CUENTA CORRIENTE  \n C. TARJETA DE CREDITO \n X. ATRAS"
    xd = 2
}
 // Inicio de iteracion 2, y condiciones dentro de opciones de capacitación     
if(xd==1){
      if(msg_body == "X"){respuesta = "\n A. CUENTAS A LA VISTA \n B. CUENTA CORRIENTE  \n C. TARJETA DE CREDITO \n D. IVA \n E.HISTORIAL CREDITICIO \n X. VOLVER"}
      if(msg_body == "A"){
            respuesta = "Las cuentas a la vista se utilizan como sistema para mantener dinero a cuidado del banco; no otorgan intereses ni reajustes. Las cuentas a la vista permiten mantener el dinero en el banco para ser utilizado de manera directa mediante una tarjeta de débito. \n Beneficios: \n Tarjeta de Débito Visa sin costo de emisión, de validez nacional e internacional (solo para cuentas en guaraníes). \n Transferencias nacionales e internacionales.. \n Si quiere volver al menu de inicio envie la opcion 'X'"
    }
    if(msg_body == "B"){
        respuesta = "Una cuenta corriente te permitirá ingresar fondos y disponer de ellos de forma inmediata, mediante la emisión de cheques, talonarios, entre otros. Su principal objetivo es la liquidez, y no suele generar intereses. \n  Entre los beneficios sobresalen: \n Linea de Sobregiro Automática. \n Cheques a la Vista y *Pago Diferido (aplican restricciones) . \n Extracción de fondos vía ATM. \n Evita el traslado y tenencia de dinero en efectivo. \n Chequera a domicilio. \n Si quiere volver al menu de inicio envie la opcion 'X' "
    }
    if(msg_body == "C"){
        respuesta = "Las tarjetas de crédito son instrumentos que te permitirán , disponiendo del credito otorgado, adquirir bienes o pagar servicios vendidos o prestados, en establecimientos afiliados ,con eso tenés la posibilidad de disfrutar de beneficios en función al capital manejado.\n Como beneficio para las tarjetas de crédito se puede decir que: \n No hay costo de emisión  \n Podes comprar en cuotas hasta 36 meses. \n También tenes dinero en efectivo por el total del monto en tu cuenta o a través de cajeros automáticos en Paraguay o el exterior. \n No existen cargos ni comisiones por compras en el exterior. \n Contas con Asistencia al Viajero para líneas desde G 5.000.000 y seguro de cancelación de deuda. \n Podes solicitar Adicionales con líneas totalmente personalizables. \n Así mismo podes disfrutar de todos los beneficios de descuentos y cuotas sin intereses en locales adheridos. \n Sumá puntos por cada compra, adelanto o debito automático en nuestro programa de recompensas Botfin puntos. \n Si quiere volver al menu de inicio envie la opcion 'X' "
    }
   if(msg_body == "D"){
            respuesta = "El IVA es el incremento de un porcentaje en el precio de cada artículo que compramos y de cada servicio que recibimos.En cada compra pagamos el precio del bien más el porcentaje de impuestos que se le aplica a su coste.\nEn Paraguay por la venta de bienes se toma el 10% mientras que para productos de la canasta familiar la tasa es del 5%. Si quiere volver al menu de inicio envie la opcion 'X'"
    }
  if(msg_body == "E"){
            respuesta = "El historial crediticio es un informe que lleva el registro de tu comportamiento con todos los créditos que solicitaste. De esta forma, el banco puede observar estos datos y evaluar si eres candidato para otorgarte un crédito. Antes de contraer compromisos financieros, es importante que definas tu capacidad de pago.A grandes rasgos, tus deudas no deberían exceder el 30% de tus ingresos. Considera esto para asegurar un excelente historial crediticio. Además, ten presente los gastos fijos que debes hacer mensualmente. Así, sabrás cuáles son tus límites y si puedes adquirir nuevos compromisos. Si quiere volver al menu de inicio envie la opcion 'X'"
    }
}
    
// Inicio de iteracion 2, y condiciones dentro de opciones de requisitos
if(xd==2){
  if(msg_body=="X"){
  respuesta = "Opciones de requisito: \n A. CUENTA AHORRO A LA VISTA \n B. CUENTA CORRIENTE  \n C. TARJETA DE CREDITO \n X.VOLVER"
  }
  if(msg_body == "A"){
    respuesta = "Requisitos: \n 18 años cumplidos \n Cédula de Identidad Vigente \n Carnet de Radicación Permanente o Certificado de Radicación Permanente (en caso de ser extranjero) \n Comprobante de ingreso: Certificado de trabajo, 3 últimas boletas de IPS, 3 últimas presentaciones de IVA. \n Origen de los fondos (si corresponde)\n Última factura \n emitida de Servicios Básicos Depósito inicial G 500.000 / USD 1.000 \n Si quiere volver al menú de inicio envie la opcion 'X'"
}
if(msg_body == "B"){
    respuesta = " Requisitos: \n 20 años cumplidos. \n CIP vigente o Carnet de Radicación Permanente (en caso de ser extranjero). \n Comprobante de Ingresos. (Recibo de Salarios, Formularios de IVA, Tres últimos recibos de IPS). \n Llenado y firma del Contrato Único de Servicios. \n Última factura emitida de Servicios Básicos. \n Deposito Inicial. \n Ingreso Mínimo G 5.000.000. \n Si quiere volver al menu de inicio envie la opcion 'X'"
}
if(msg_body == "C"){
    respuesta = "Requisitos: \n A partir de 20 años de edad \n Fotocopia de Cédula de Identidad vigente 1 año de antigüedad laboral o demostrar continuidad. \n Comprobante de ingresos: Certificado Laboral, 3 últimas liquidaciones de salario, 3 últimas boletas de IPS o 6 últimas declaraciones de IVA. \n Una factura de servicio público o privado \n Ingreso mínimo del solicitante de G 3.000.000 \n consejos para usar una tarjeta de credito \n Elige la tarjeta de crédito que a ti más te conviene. No existe una tarjeta que sea mejor que las demás en todos los sentidos, lo que significa que la mejor tarjeta dependerá de cuáles son las características más importantes para ti y tu estilo de vida. Algunas de las cosas que tendrás que analizar y determinar su importancia.\n Lo primero que deberías de hacer una vez que recibas tu tarjeta de crédito es informarte sobre las fechas importantes de la misma. Conoce qué significan y en qué día caen estas importantes fechas. \n Una vez que conozcas cuándo pagar, es importante que conozcas cuánto pagar. Lo más recomendable es realizar el pago para no generar intereses, es decir, que seas totalero. \n Si quiere volver al menu de inicio envie la opcion 'X'"
}
}

      axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url:
          "https://graph.facebook.com/v12.0/" +
          phone_number_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: { body:respuesta },
        },
        headers: { "Content-Type": "application/json" },
      });
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
app.get("/webhook", (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
  **/
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
