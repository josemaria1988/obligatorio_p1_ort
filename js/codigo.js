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
}

let sistema = new Sistema();

// Hardcodeando un usuario para pruebas
const usuarioPrueba = new Usuarios(
    "0",
    "Juan",
    "Pérez",
    "juanperez",
    "clave123",
    "Juan Pérez",
    "1234567890123456",
    "123"
);
sistema.registrarUsuario(usuarioPrueba);





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
    console.log(tipo);
    
    let botonesMostrar = document.querySelectorAll("." + tipo);
    console.log(botonesMostrar);
    
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
    document.querySelector("#sectionLogin").style.display = "none";
    document.querySelector("#sectionRegistro").style.display = "none";
    document.querySelector("#navPrincipal").style.display = "block";
    document.querySelector("#txtUsuarioActivo").style.display = "block";
    document.querySelector("#txtUsuarioActivo").innerHTML = `${usuarioActivo.nombre}`
}


//.........................DESTINOS..............................


