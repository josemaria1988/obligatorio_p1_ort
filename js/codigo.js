window.addEventListener("load", inicio);

function inicio() {
    //REGISTRO DE USUARIO
    document.querySelector("#btnRegistrarUsuario").addEventListener("click", tomarDatosRegistro);
    //LOGIN DE USUARIO
    document.querySelector("#btnLogin").addEventListener("click", iniciarSesion);
    //CERRAR SESION
    document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSesion);
    ocultarSecciones()
    ocultarBotones()

    //TRANSFORMAMOS LOS LI EN BOTONES
    let botones = document.querySelectorAll(".btnSection");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", mostrarSeccion)
    }

    // OCULTAMOS EL BOTON DE CERRAR SESION
    document.querySelector("#btnCerrarSesion").style.display = "none"

    // CREAR RESERVA


    // CREAR DESTINOS USUARIO ADMIN
    document.querySelector("#btnCargarDestino").addEventListener("click", crearDestinos);

    // MOSTRAR DESTINOS AL USUARIO
    mostrarDestinos()

    // MOSTRAR DESTINOS EN OFERTA
    mostrarDestinosEnOferta()

    //MOSTRAR RESERVAS AL USUARIO
    document.querySelector("#btnSectionInformes").addEventListener("click", mostrarReservas)
}

let sistema = new Sistema();
//.....................................REGISTRO DE USUARIO.........................................
let idUsuario = 2
function tomarDatosRegistro() {
    let nombre = document.querySelector("#txtNombrePersona").value;
    let apellido = document.querySelector("#txtApellido").value;
    let nombreUsuario = document.querySelector("#txtUserNameRegistro").value;
    let contrasenia = document.querySelector("#txtClaveRegistro").value;
    let tarjetaCredito = document.querySelector("#txtTarjetaCredito").value;
    let cvc = document.querySelector("#txtCvc").value;
    let mensaje = ""

    let usuario = "user"
    let camposCompletos = sistema.validarCamposVaciosRegistro(nombre, apellido, contrasenia, nombreUsuario, tarjetaCredito, cvc);
    let usuarioRepetido = sistema.buscarElemento(sistema.usuarios, "nombreDeUsuario", nombreUsuario);
    let claveValida = sistema.verificarFormatoPassword(contrasenia);

    if (camposCompletos && !usuarioRepetido && claveValida) {
        let nuevoUsuario = new Usuarios(idUsuario, usuario, nombre, apellido, nombreUsuario, contrasenia, tarjetaCredito, cvc)
        idUsuario++
        sistema.registrarUsuario(nuevoUsuario)
        mensaje = "Registro Exitoso!"
        document.querySelector("#txtNombrePersona").value = "";
        document.querySelector("#txtApellido").value = "";
        document.querySelector("#txtUserNameRegistro").value = "";
        document.querySelector("#txtClaveRegistro").value = "";
        document.querySelector("#txtTarjetaCredito").value = "";
        document.querySelector("#txtCvc").value = "";
    } else {
        document.querySelector("#txtUserNameRegistro").value = "";
        document.querySelector("#txtClaveRegistro").value = "";
        mensaje = "Error en Registro: revisa los datos ingresados";
    }
    document.querySelector("#pMensajesRegistro").innerHTML = mensaje;

}
//...........................................LOGIN DE USUARIO.............................................
let usuarioActivo = null;
function iniciarSesion() {
    let nombre = document.querySelector("#txtNombreLogin").value;
    let clave = document.querySelector("#txtClaveLogin").value;

    let camposCompletos = sistema.validarCamposLogin(nombre, clave)
    let usuario = sistema.obtenerObjeto(sistema.usuarios, "nombreDeUsuario", nombre);
    if (camposCompletos && usuario) {
        if (clave === usuario.contrasenia) {
            mensaje = "Login exitoso"
            usuarioActivo = usuario
            mostrarMenuOcultandoLoginYRegistro();
        } else {
            mensaje = "contrasenia incorrecta"
        }
    } else {
        mensaje = "usuario no encontrado"
    }

    document.querySelector("#pLogin").innerHTML = mensaje

}

function cerrarSesion() {
    usuarioActivo = null
    document.querySelector("#txtUsuarioActivo").innerHTML = ``
    ocultarBotones();
    ocultarSecciones();
    document.querySelector("#sectionLogin").style.display = "block"
    document.querySelector("#sectionRegistro").style.display = "block"
    document.querySelector("#btnCerrarSesion").style.display = "none"
    document.querySelector("#txtNombreLogin").value = "";
    document.querySelector("#txtClaveLogin").value = "";
    document.querySelector("#pLogin").innerHTML = "";

}


//........................................MANEJO DE INTERFAZ....................................

function mostrarSeccion() {
    ocultarSecciones();
    let idBtn = this.getAttribute("id");
    let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
    document.querySelector("#" + idSeccion).style.display = "block";
}
function ocultarSecciones() {
    let seccion = document.querySelectorAll(".section");
    for (let i = 0; i < seccion.length; i++) {
        seccion[i].style.display = "none";
    }
}
function mostrarBotones(tipo) {
    ocultarBotones();
    let botonesMostrar = document.querySelectorAll("." + tipo);
    for (let i = 0; i < botonesMostrar.length; i++) {
        botonesMostrar[i].style.display = "block";
    }
}
function ocultarBotones() {
    let botonesOcultar = document.querySelectorAll(".btnSection");
    for (let i = 0; i < botonesOcultar.length; i++) {
        botonesOcultar[i].style.display = "none";
    }
}

function mostrarMenuOcultandoLoginYRegistro() {
    mostrarBotones(usuarioActivo.tipo)
    document.querySelector("#sectionViajes").style.display = "block"
    document.querySelector("#sectionLogin").style.display = "none";
    document.querySelector("#sectionRegistro").style.display = "none";
    document.querySelector("#navPrincipal").style.display = "block";
    document.querySelector("#txtUsuarioActivo").style.display = "block";
    document.querySelector("#txtUsuarioActivo").innerHTML = `${usuarioActivo.nombre}`
    document.querySelector("#btnCerrarSesion").style.display = "block"
}


//.........................MOSTRAR TODOS LOS DESTINOS..............................

function mostrarDestinos() {
    document.querySelector("#sectionViajes").innerHTML = "";

    for (let i = 0; i < sistema.destinos.length; i++) {
        let destinoActual = sistema.destinos[i]
        let destinoHTML = document.createElement("article");
        destinoHTML.innerHTML =
            `<h4>${destinoActual.nombreDestino}</h4>
            <img src="img/${destinoActual.imagen}" alt="${destinoActual.nombreDestino}" style="width:150px;">
            <p>Precio por noche: $${destinoActual.precioPorNoche}</p>
            <p>Cupos disponibles: ${destinoActual.cuposDisponibles}</p>
            <p>Oferta: ${destinoActual.estaEnOferta ? "Sí" : "No"}</p>
            <p>${destinoActual.descripcion}</p>
            <label for="fechaViaje">Desde: </label>
            <input type="date"  id="fechaViaje">
            <label for="fechaHasta">Ingrese la cantidad de dias: </label>
            <input type="number" id="cantidadDeDias">
            <label for="cantidadPersonas">Cantidad de personas: </label>
            <input type="number" id="cantidadPersonas">
            <label for="slcMedioDePago">Seleccione un medio de pago: </label>
            <select id="slcMedioDePago">
                <option value="Efectivo">Efectivo</option>
                <option value="Millas">Millas</option>
            </select>
            <input type="button" class="btnReservar" value="Reservar" data-destino="${destinoActual.nombreDestino}">`

        document.querySelector("#sectionViajes").appendChild(destinoHTML);
    }
    let btnsReservar = document.querySelectorAll(".btnReservar");
    for (let i = 0; i < btnsReservar.length; i++) {
        btnsReservar[i].addEventListener("click", reservarDestino);
    }
}

function mostrarDestinosEnOferta() {
    document.querySelector("#sectionOfertas").innerHTML = "";

    for (let i = 0; i < sistema.destinos.length; i++) {
        let destinoActual = sistema.destinos[i]
        if (destinoActual.estaEnOferta) {
            let destinoHTML = document.createElement("article");
            destinoHTML.innerHTML =
                `<h4>${destinoActual.nombreDestino}</h4>
                <img src="/img/${destinoActual.imagen}" alt="${destinoActual.nombreDestino}" style="width:150px;">
                <p>Precio por noche: $${destinoActual.precioPorNoche}</p>
                <p>Cupos disponibles: ${destinoActual.cuposDisponibles}</p>
                <p>Oferta: ${destinoActual.estaEnOferta ? "Sí" : "No"}</p>
                <p>${destinoActual.descripcion}</p>
                <label for="fechaViaje">Desde: </label>
                <input type="date" id="fechaViaje">
              <label for="cantidadDeDias">Hasta: </label>
              <input type="number" id="cantidadDeDias">
               <label for="cantidadPersonas">Cantidad de personas: </label>
               <input type="number" name="" id="cantidadPersonas">
               <label for="slcMedioDePago">Seleccione un medio de pago: </label>
               <select id="slcMedioDePago">
                    <option value="Efectivo">Efectivo</option>
                    <option value="Millas">Millas</option>
               </select>
                <input type="button" class="btnReservar" value="Reservar" data-destino="${destinoActual.nombreDestino}">`
            document.querySelector("#sectionOfertas").appendChild(destinoHTML)
        }
    }

    let btnsReservar = document.querySelectorAll(".btnReservar");
    for (let i = 0; i < btnsReservar.length; i++) {
        btnsReservar[i].addEventListener("click", reservarDestino);
    }
}

// ...........................................CREAR DESTINOS USUARIO ADMIN.........................................

let idDestinos = 6
function crearDestinos() {
    let nombreDestino = document.querySelector("#inputNombreDestino").value;
    let precioDestino = Number(document.querySelector("#inputPrecioPorNoche").value);
    let cuposDisponibles = Number(document.querySelector("#inputCuposDisponibles").value);
    let imagenDestino = document.querySelector("#cargarImagenDestino");
    let enOferta = document.querySelector("#slcOferta").value;
    let descripcionDestino = document.querySelector("#descripcionDestino").value;
    let mensaje = "";

    let datosValidos = sistema.validarCamposCrearDestino(nombreDestino, precioDestino, cuposDisponibles, imagenDestino, enOferta, descripcionDestino)
    let destinoRepetido = sistema.buscarElemento(sistema.destinos, "nombreDestino", nombreDestino);

    if (datosValidos && !destinoRepetido) {
        let nuevoDestino = new Destinos(idDestinos, nombreDestino, precioDestino, cuposDisponibles, imagenDestino, enOferta, descripcionDestino)
        idDestinos++;
        sistema.agregarNuevoDestino(nuevoDestino);
        mensaje = "Destino agregado con éxito"
    } else {
        mensaje = "El destino ya existe o los datos no fueron cargados correctamente"
    }
    document.querySelector("#pCrearDestino").innerHTML = mensaje
}

//.................................RESERVA DE DESTINOS USUARIO....................................
function reservarDestino() {
    let nombreDestino = this.getAttribute("data-destino");
    let objetoReserva = sistema.obtenerObjeto(sistema.destinos, "nombreDestino", nombreDestino);
    let fechaViaje = document.querySelector("#fechaViaje").value;
    console.log(fechaViaje)
    let cantidadDeDias = Number(document.querySelector("#cantidadDeDias").value);
    console.log(cantidadDeDias)
    let cantidadPersonas = Number(document.querySelector("#cantidadPersonas").value);
    console.log(cantidadPersonas)
    let medioDePago = document.querySelector("#slcMedioDePago").value;

    let importeTotal = cantidadPersonas * cantidadDeDias * objetoReserva.precioPorNoche
    let estadoReserva = "pendiente"
    let nuevaReserva = new Reserva(objetoReserva.id, usuarioActivo.id, objetoReserva.nombreDestino, usuarioActivo.nombreDeUsuario, fechaViaje, cantidadPersonas, cantidadDeDias, importeTotal, medioDePago, estadoReserva)
    sistema.agregarReserva(nuevaReserva)
    document.querySelector(`[data-destino="${nombreDestino}"]`).disabled = true;
    document.querySelector(`[data-destino="${nombreDestino}"]`).value = "Ya Reservado";
    alert("Reserva reservada con exito")
}

// ................................MOSTRAR DESTINOS RESERVADOS AL USUARIO............................................
function mostrarReservas() {
    document.querySelector("#sectionInformes").innerHTML = "";
    let reservasDelUsuario = sistema.obtenerReservas(usuarioActivo.id)

    for (let i = 0; i < reservasDelUsuario.length; i++) {
        let reservaActual = reservasDelUsuario[i]

        let reservaHTML = document.createElement("article");
        reservaHTML.innerHTML =
            `<h4>Reservas del Usuario: ${usuarioActivo.nombre} ${usuarioActivo.apellido}</h4>
                <p>Destino: ${reservaActual.nombreDestino}</p>
                <p>Identificacion de reserva: ${reservaActual.idReserva}</p>
                <p>Cantidad de personas: ${reservaActual.cantidadPersonas}</p>
                <p>Fecha de salida: ${reservaActual.fecha}</p>
                <p>Total a pagar: ${reservaActual.importeTotal}</p>
                <p> Estado de la reserva: ${reservaActual.estado}</p>
                <p>Usuario: ${usuarioActivo.nombreDeUsuario}</p>`
        document.querySelector("#sectionInformes").appendChild(reservaHTML)

    }
}