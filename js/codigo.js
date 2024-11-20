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

    // MOSTRAR ADMINISTRAR DESTINOS
    mostrarAdministrarDestinos()

    //MOSTRAR RESERVAS AL USUARIO
    document.querySelector("#btnSectionInformes").addEventListener("click", mostrarReservas);

    //MOSTRAR RESERVAS AL ADMIN
    document.querySelector("#btnSectionGestionarReservas").addEventListener("click", gestionarReservas);
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

function mostrarMenuOcultandoLoginYRegistro(){
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
        let idDestinoFinal = `DEST_ID_${idDestinos}`
        let nuevoDestino = new Destinos(idDestinoFinal, nombreDestino, precioDestino, cuposDisponibles, imagenDestino, enOferta, descripcionDestino)
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
    let cantidadDeDias = Number(document.querySelector("#cantidadDeDias").value);
    let cantidadPersonas = Number(document.querySelector("#cantidadPersonas").value);
    let medioDePago = document.querySelector("#slcMedioDePago").value;

    if(fechaViaje !== "" && !isNaN(cantidadDeDias) && !isNaN(cantidadPersonas)){
        let importeTotal = cantidadPersonas * cantidadDeDias * objetoReserva.precioPorNoche
        console.log(objetoReserva.precioPorNoche);
        console.log(importeTotal);
        console.log(cantidadDeDias);
        let estadoReserva = "pendiente"
        let nuevaReserva = new Reserva(objetoReserva.id, usuarioActivo.id, objetoReserva.nombreDestino, usuarioActivo.nombreDeUsuario, fechaViaje, cantidadPersonas, cantidadDeDias, importeTotal, medioDePago, estadoReserva)
        sistema.agregarReserva(nuevaReserva);
        document.querySelector(`[data-destino="${nombreDestino}"]`).value = "Ya Reservado";
        document.querySelector(`[data-destino="${nombreDestino}"]`).disabled = "true";
        document.querySelector(`[data-destino="${nombreDestino}"]`).style.cursor = "default";
        document.querySelector(`[data-destino="${nombreDestino}"]`).style.backgroundcolor = "none";
        alert("Reserva reservada con exito");
    }else{
        alert("Ingrese los datos solicitados para la reserva");
    }

}

// ................................MOSTRAR DESTINOS RESERVADOS AL USUARIO............................................
function mostrarReservas() {
    document.querySelector("#sectionInformes").innerHTML = "";
    let reservasDelUsuario = sistema.obtenerReservas(usuarioActivo.id)

    for (let i = 0; i < reservasDelUsuario.length; i++) {
        let reservaActual = reservasDelUsuario[i]

        let reservaHTML = document.createElement("article");
        reservaHTML.innerHTML =
            `<h4>Reservas del Usuario: ${reservaActual.nombreDeUsuario}</h4>
                <p>Destino: ${reservaActual.nombreDestino}</p>
                <p>Cantidad de personas: ${reservaActual.cantidadPersonas}</p>
                <p>Fecha de salida: ${reservaActual.fecha}</p>
                <p>Total a pagar: ${reservaActual.importeTotal}</p>
                <p> Estado de la reserva: ${reservaActual.estado}</p>`
        document.querySelector("#sectionInformes").appendChild(reservaHTML)

    }
}

// ..................... GESTIONAR LAS RESERVAS DE LOS USUARIOS...............................

function gestionarReservas() {
    let reservasDelUsuario = sistema.obtenerReservas(usuarioActivo.id)

    for (let i = 0; i < reservasDelUsuario.length; i++) {
        let reservaActual = reservasDelUsuario[i];

        if (reservaActual.estado === "confirmada") {
            document.querySelector("#tablaConfirmadas tbody").innerHTML += `
            <tr>
                <td>${reservaActual.nombreDeUsuario}</td>
                <td>${reservaActual.nombreDestino}</td>
                <td>${reservaActual.cantidadPersonas}</td>
                <td>${reservaActual.fecha}</td>
                <td>${reservaActual.importeTotal}</td>
                <td>${reservaActual.estado}</td>
            </tr>
            `
        }else if(reservaActual.estado === "pendiente"){
            document.querySelector("#tablaPendientes tbody").innerHTML += `
            <tr>
                <td>${reservaActual.nombreDeUsuario}</td>
                <td>${reservaActual.nombreDestino}</td>
                <td>${reservaActual.cantidadPersonas}</td>
                <td>${reservaActual.fecha}</td>
                <td>${reservaActual.importeTotal}</td>
                <td>${reservaActual.estado}</td>
                <td><input type="button" class="btnProcesar" data-confirmar="${reservaActual.idReserva}" value="Procesar"></td>
            </tr>
            `
        }else if (reservaActual.estado === "cancelada") {
            document.querySelector("#tablaCanceladas tbody").innerHTML += `
            <tr>
                <td>${reservaActual.nombreDeUsuario}</td>
                <td>${reservaActual.nombreDestino}</td>
                <td>${reservaActual.cantidadPersonas}</td>
                <td>${reservaActual.fecha}</td>
                <td>${reservaActual.importeTotal}</td>
                <td>${reservaActual.estado}</td>
            </tr>`

    }

    let btnsProcesar = document.querySelectorAll(".btnProcesar");
    for (let i = 0; i < btnsProcesar.length; i++) {
        btnsProcesar[i].addEventListener("click", confirmarReserva);
    }
}
}

// ...............................CONFIRMAR RESERVA............................................

function confirmarReserva() {
    document.querySelector("#tablaConfirmadas tbody").innerHTML = "";
    document.querySelector("#tablaPendientes tbody").innerHTML = "";
    document.querySelector("#tablaCanceladas tbody").innerHTML = "";

    let idReserva = this.getAttribute("data-confirmar")
    let reserva = sistema.obtenerObjeto(sistema.reservas, "idReserva", idReserva);
    let usuario = sistema.obtenerObjeto(sistema.usuarios, "id", reserva.idUsuario)
    let destino = sistema.obtenerObjeto(sistema.destinos, "nombreDestino", reserva.nombreDestino)

    if (reserva.cantidadPersonas > destino.cuposDisponibles) {
        alert("No hay suficientes cupos disponibles para confirmar la reserva.");
        reserva.estado = "cancelada"
        gestionarReservas()
        return;
    }

    let resultado = sistema.cobrarAlUsuario(usuario, reserva.importeTotal, reserva.medioDePago)
    if (resultado[0] === true) {
        destino.cuposDisponibles -= reserva.cantidadPersonas;
        reserva.estado = "confirmada";
        alert("Reserva confirmada exitosamente.\n" + resultado[1]);
    }else {
        alert(resultado[1])
        reserva.estado = "cancelada"
    }

    gestionarReservas()
}

// ...............................ADMINISTRAR DESTINOS............................................}

function mostrarAdministrarDestinos(){
    let destinos = sistema.destinos;

    console.log(destinos);
    
    for(let i = 0; i < sistema.destinos.length; i++){
        console.log("Se ejecutó la función mostrarAdministrarDestinos");
        let destinoActual = destinos[i];

        document.querySelector("#tablaAdministrarDestinos tbody").innerHTML += `
            <tr>
                <td>${destinoActual.nombreDestino}</td>
                <td class="cuposDisponiblesTd">
                    ${destinoActual.cuposDisponibles} <input type="button" class="btnModificarCupos" value="Modificar">
                </td>
                <td>${destinoActual.estaEnOferta ? "Sí" : "No"}</td>
                <td>${destinoActual.estado}</td>
                <td>
                    <input type="button" class="btnModificarDestinos" value="${destinoActual.estado === "activo" ? "Pausar" : "Activar"}">
                </td>
            </tr>
            `
    }
    
    let btnsModificarDestinos = document.querySelectorAll(".btnModificarDestinos")
    for(let i = 0; i < btnsModificarDestinos.length; i++){
        btnsModificarDestinos[i].addEventListener("click", sistema.cambiarEstado);
    }
    
    let btnsModificarCupos = document.querySelectorAll(".btnModificarCupos")
    for(let i = 0; i < btnsModificarCupos.length; i++){
        btnsModificarCupos[i].addEventListener("click", modificarCupos);
    }
}

function modificarEstado(){
  console.log("llego")// acá quiero que si el destino tiene "estado" = activo, lo modifique a pausado y viceversa con un else pero aún no sé cómo hacerlo
}

function modificarCupos(){
    let celdas = document.querySelectorAll(".cuposDisponiblesTd");
    for(let i = 0; i < celdas.length;i++){
        let input = document.createElement("input");
        // acá creo el input de texto donde se ingresan los cupos, se crea para todas las celdas de la columna cupos
        input.type = "text";
        input.placeholder = "cantidad";

        celdas[i].appendChild(input);

        let btnConfirmar = document.createElement("input");
        btnConfirmar.type = "button";
        btnConfirmar.value = "Confirmar";
        btnConfirmar.class = "btnConfirmarCupos";
        
        celdas[i].appendChild(btnConfirmar);
    }

    let btnsModificarCupos = document.querySelectorAll(".btnModificarCupos");
    for(let i = 0; i < btnsModificarCupos.length; i++){
        btnsModificarCupos[i].disabled = true;
    }

    let btnsConfirmarCupos = document.querySelectorAll(".btnConfirmarCupos")
    for(let i=0; i < btnsConfirmarCupos.length; i++){
        btnsConfirmarCupos[i].addEventListener("click", sistema.cambiarEstado);
    }
    
}