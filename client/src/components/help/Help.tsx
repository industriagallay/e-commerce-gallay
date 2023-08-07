import React, { useState } from "react";
import NavBar2 from "../navbar2/NavBar2";
import { Link } from "react-router-dom";
import "../navbar2/NavBar2.css";
import "./Help.css";

// type CollapseStates = {
//   pregunta1: boolean;
//   pregunta2: boolean;
//   pregunta3: boolean;
//   pregunta4: boolean;
//   pregunta5: boolean;
//   pregunta6: boolean;
//   pregunta7: boolean;
//   pregunta8: boolean;
//   pregunta9: boolean;
// };

const Help: React.FC = () => {
  /*abrir un mensaje a la vez*/
  const [openMessage, setOpenMessage] = useState<string | null>(null);
  const toggleCollapse = (pregunta: string) => {
    setOpenMessage((prevMessage) =>
      prevMessage === pregunta ? null : pregunta
    );
  };

  return (
    <div>
      <NavBar2
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <h1 className="preguntasFrecuentes animate__animated animate__fadeInTopLeft">
        Preguntas Frecuentes
        <p className="parradopreguntasFrecuentes">
          Industria Gallay está a su Servicio ¿En qué podemos Ayudarte?
        </p>
      </h1>

      <section className="container-md section-preguntas">
        <button
          className="learn-more bottonInfo-container "
          onClick={() => toggleCollapse("pregunta1")}
        >
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Realizar un Pedido</span>
        </button>
        {openMessage === "pregunta1" && (
          <div className="collapse show">
            <p className="textoInfo">
              ¿Cómo realizo un pedido? Solo tenés que seleccionar todos los
              productos que deseas adquirir. Seguidamente, en el carrito de
              compras, para conocer el costo del envío colocás tu código postal
              en el recuadro correspondiente, elegís la mensajería de tu
              preferencia y debajo seleccionas la forma de pago. Luego hacés
              clic en el botón COMPRAR y podés acceder como cliente (si ya tenés
              cuenta en Compra Gamer) o crear un cliente nuevo. Por último,
              completás los pasos brindados por el asistente, hasta confirmar la
              compra. Se te asignará un número de pedido y se mostrarán los
              datos del mismo. También enviaremos un mail a tu correo
              electrónico registrado con los detalles del pedido realizado.
            </p>
          </div>
        )}

        <button
          className="learn-more bottonInfo-container "
          onClick={() => toggleCollapse("pregunta2")}
        >
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Precio</span>
        </button>
        {openMessage === "pregunta2" && (
          <div className="collapse show">
            <p className="textoInfo">
              ¿El precio que figura en la web es el precio final? Todos los
              precios en la web incluyen el IVA, y se encuentran expresados en
              pesos argentinos.
            </p>
          </div>
        )}

        <button
          className="learn-more bottonInfo-container "
          onClick={() => toggleCollapse("pregunta3")}
        >
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Formas de Pago</span>
        </button>
        {openMessage === "pregunta3" && (
          <div className="collapse show">
            <p className="textoInfo">
              ¿Cuáles son las formas de pago? Contamos con dos formas de pago: a
              través de depósito/transferencia bancaria, con la cual obtenés el
              precio especial, o bien, a través de los métodos Pago Gamer (Visa
              o MasterCard) o MercadoPago (Tarjetas online, PagoFácil y
              RapiPago) con los cuales podés abonar en cuotas, al precio de
              lista.
            </p>
          </div>
        )}

        <button
          className="learn-more bottonInfo-container "
          onClick={() => toggleCollapse("pregunta4")}
        >
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Depósito T.Bancaria</span>
        </button>
        {openMessage === "pregunta4" && (
          <div className="collapse show">
            <p className="textoInfo">
              ¿Cómo abono a través de depósito/transferencia? Una vez se realiza
              el pedido, te facilitamos los datos del CBU. Debes abonar e
              informar el pago desde nuestra web, antes de la fecha de
              vencimiento de la reserva.
            </p>
          </div>
        )}
        <button
          className="learn-more bottonInfo-container "
          onClick={() => toggleCollapse("pregunta5")}
        >
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Mercadopago</span>
        </button>
        {openMessage === "pregunta5" && (
          <div className="collapse show">
            <p className="textoInfo">
              ¿Cómo puedo abonar a través de MercadoPago? Podés hacerlo de tres
              formas: Con tarjetas online en cuotas (no se puede acceder a
              cuotas sin interés); A través de RapiPago/ PagoFácil (se abona al
              precio de lista, pero no se pueden hacer cuotas, sólo se puede
              abonar en un pago); y realizando una transferencia desde tu cuenta
              de MercadoPago.
            </p>
          </div>
        )}

        <button
          className="learn-more bottonInfo-container "
          onClick={() => toggleCollapse("pregunta6")}
        >
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Envíos</span>
        </button>
        {openMessage === "pregunta6" && (
          <div className="collapse show">
            <p className="textoInfo">
              ¿Cómo gestiono el envío de mi pedido? En primer lugar, para
              conocer el costo del envío, una vez al agregues al carrito tu
              compra, solo debes colocar tu código postal en el recuadro
              correspondiente, seleccionar la mensajería de tu preferencia y
              elegir si deseas el retiro en alguna sucursal o la entrega a
              domicilio. Actualmente realizamos envíos a todo el país través de
              Oca y Andreani; y si te encontrás en CABA o alrededores, podrás
              seleccionar el servicio de Mensajería Privada que es exclusivo de
              Compra Gamer. Tené en cuenta que, para calcular el costo del
              envío, se toman en consideración tanto las dimensiones y peso del
              paquete como la distancia de la localidad de entrega.
            </p>
          </div>
        )}

        <button
          className="learn-more bottonInfo-container "
          onClick={() => toggleCollapse("pregunta7")}
        >
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Facturacíon</span>
        </button>
        {openMessage === "pregunta7" && (
          <div className="collapse show">
            <p className="textoInfo">
              ¿Cómo tramito la factura de mi compra? En todas las compras
              efectuadas en la web, brindamos sin excepción alguna, la factura
              de compra. Una vez que realiza y abona el pedido, enviamos a tu
              dirección de correo electrónico la factura correspondiente. Por
              supuesto, también podés descargarla desde la sección Mi cuenta Mis
              facturas. En caso de que precises factura A, solo debes ingresar
              tu CUIT al cargar el pedido por la web. Tené en cuenta que la
              factura A puede tener percepciones.
            </p>
          </div>
        )}
      </section>
      <section className="container-md">
        <div className="cardregistrarse container-fluid">
          <div className="contentHelp">
            <p className="heading2">¿Cual es tu Consulta?</p>
            <p className="para2">
              Para realizar una consulta es necesario que inicies sesión en tu
              cuenta
            </p>
            <Link to="/signup">
              <button className="btn2">R e g i s t r a r s e</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
