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

    // CREAR DESTINOS USUARIO ADMIN
    document.querySelector("#btnCargarDestino").addEventListener("click", crearDestinos);
}

let sistema = new Sistema();

// Hardcodeando un usuario para pruebas
const usuarioPrueba = new Usuarios(
    "0",
    "user",
    "Juan",
    "Pérez",
    "juanperez",
    "clave123",
    "Juan Pérez",
    "1234567890123456",
    "123"
);
sistema.registrarUsuario(usuarioPrueba);

// Hardcodeando un admin para pruebas
const adminPrueba = new Usuarios(
    "1",
    "admin",
    "Jose",
    "Sosa",
    "admin",
    "clave123",
    "Jose Sosa",
    "",
    ""
);
sistema.registrarUsuario(adminPrueba);





//.....................................REGISTRO DE USUARIO.........................................
let idUsuario = 0
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
    document.querySelector("#sectionLogin").style.display = "block"
    document.querySelector("#sectionRegistro").style.display = "block"
    document.querySelector("#btnCerrarSesion").style.display = "none"

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


//.........................DESTINOS..............................


// ...........................................CREAR DESTINOS USUARIO ADMIN.........................................

let idDestinos = 0
function crearDestinos() {
    let nombreDestino = document.querySelector("#inputNombreDestino").value;
    let precioDestino = Number(document.querySelector("#inputPrecioPorNoche").value);
    let cuposDisponibles = Number(document.querySelector("#inputCuposDisponibles").value);
    let imagenDestino = document.querySelector("#cargarImagenDestino");
    let enOferta = document.querySelector("#slcOferta").value;
    let descripcionDestino = document.querySelector("#descripcionDestino").value
    let mensaje = ""

    let datosValidos = sistema.validarCamposCrearDestino(nombreDestino, precioDestino, cuposDisponibles, imagenDestino, enOferta, descripcionDestino)
    let destinoRepetido = sistema.buscarElemento(sistema.destinos, "nombreDestino", nombreDestino);

    if (datosValidos && !destinoRepetido) {
        let nuevoDestino = new Destinos(idDestinos, nombreDestino, precioDestino, cuposDisponibles, imagenDestino, enOferta, descripcionDestino)
        idDestinos++
        sistema.agregarNuevoDestino(nuevoDestino);
        mensaje = "Destino agregado con éxito"
    }else {
        mensaje = "El destino ya existe o los datos no fueron cargados correctamente"
    }
    document.querySelector("#pCrearDestino").innerHTML = mensaje
}