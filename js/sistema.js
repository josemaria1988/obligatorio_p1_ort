class Sistema{
    constructor(){
        this.destinos = [
            new Destinos(0, "París", 1500, 10, "paris.jpg", true, "La ciudad del amor con arquitectura icónica y museos famosos."),
            new Destinos(1, "Tokio", 2000, 8, "tokio.jpg", false, "Una mezcla vibrante de tradición y tecnología moderna."),
            new Destinos(2, "Nueva York", 1800, 12, "nuevayork.jpg", true, "La ciudad que nunca duerme, llena de rascacielos y cultura."),
            new Destinos(3, "Roma", 1400, 15, "roma.jpg", false, "Ciudad eterna, famosa por su historia y monumentos antiguos."),
            new Destinos(4, "Sídney", 1700, 7, "sidney.jpg", true, "Famosa por la Ópera de Sídney y sus hermosas playas."),
            new Destinos(5, "Río de Janeiro", 1300, 20, "riodejaneiro.jpg", false, "Hermosas playas, Carnaval y el Cristo Redentor.")
        ];
        this.usuarios = [
            new Usuarios(0, "admin", "Jose", "Sosa", "admin", "clave123", "Jose Sosa", "", ""),
            new Usuarios(1, "user", "Juan", "Pérez", "juanperez", "clave123", "Juan Pérez", "1234567890123456", "123")
        ];
        this.reservas = [];
    }

    agregarNuevoDestino(destino){
        this.destinos.push(destino);
    }

    agregarReserva(data){
        this.reservas.push(data);
    }

    //METODOS PARA VALIDAR REGISTRO DE USUARIO
    validarCamposVaciosRegistro(pNombre, pApellido, pNombreUsuario, pClave, pNombreCompleto, pTarjetaCredito, pCvc){
        let campoValidos = false;
        if(pNombre !== "" && pApellido !== "" && pNombreUsuario !== "" && pClave !== "" && pNombreCompleto !== "" && pTarjetaCredito !== "" && pCvc !== ""){
            campoValidos = true;
        }
        return campoValidos;
    }

    registrarUsuario(usuario){
        this.usuarios.push(usuario)
    }


    // METODOS PARA BUSCAR ELEMENTOS Y OBTENER OBJETOS

    buscarElemento(arrElementos, propiedad, valorBusqueda) {
        let existe = false
        for (let i = 0; i < arrElementos.length; i++) {
            const elElemento = arrElementos[i]
            if (elElemento[propiedad] === valorBusqueda) {
                existe = true
                break
            }
        }
        return existe
    }

    obtenerObjeto(arrElementos, propiedad, busqueda){
        let objeto = null;
        for (let i = 0; i < arrElementos.length; i++) {
            const unElemento = arrElementos[i];
            if(unElemento[propiedad] === busqueda){
                objeto = unElemento;
                break;
            }
        }
        return objeto;
    }


    // METODOS VALIDAR LOGIN

    validarCamposLogin(pNombre, pClave){
        let campoValidos = false;
        if(pNombre !== "" && pClave !== ""){
            campoValidos = true;
        }
        return campoValidos;
    }

    verificarFormatoPassword(password){
        let passwordValida = false;
        let tieneMayusculas = false;
        let tieneNumeros = false;
        let tieneMinusculas = false
        for(let i = 0; i < password.length; i++){
            
            if(!isNaN(password[i])){
                tieneNumeros = true;
            }
            if(password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90){
                tieneMayusculas = true;
            }
            if(password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122){
                tieneMinusculas = true;
            }
        }
        if(tieneNumeros && tieneMayusculas && password.length > 5){
            passwordValida = true;
        }
        return passwordValida;
    }


    // METODOS PARA VALIDAR DATOS Y CREAR DESTINOS

    validarCamposCrearDestino(nombre, precio, cupos, imagen, oferta, descripcion){
        let validar = false;

        if(nombre !== "" && !isNaN(precio) && precio > 0 && !isNaN(cupos) && cupos>0 && imagen !== "" && oferta !== "" && descripcion !== ""){
            validar = true
        }

        return validar
    }

    // BUSCAR Y SELECCIONAR RESERVAS DEL USUARIO ACTIVO
    obtenerReservas(idUsuario){
        let reservasUsuario = [];
        let usuarioActivo = this.obtenerObjeto(this.usuarios, "id", idUsuario)
        if (usuarioActivo.tipo === "user") {
            for (let i = 0; i < this.reservas.length; i++) {
                let reserva = this.reservas[i];
                if (reserva.idUsuario === idUsuario) {
                    reservasUsuario.push(reserva);
                }
            }
        } else if (usuarioActivo.tipo === "admin") {
            reservasUsuario = [...this.reservas];
        }

        return reservasUsuario
    }
}