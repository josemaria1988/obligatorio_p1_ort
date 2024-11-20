class Sistema{
    constructor(){
        this.destinos = [ //ID único auto incremental con el prefijo “DEST_ID_x” (ejemplo: DEST_ID_5)
            new Destinos("DEST_ID_0", "París", 1500, 10, "paris.jpg", true, "La ciudad del amor con arquitectura icónica y museos famosos.", "activo"),
            new Destinos("DEST_ID_1", "Tokio", 2000, 8, "tokio.jpg", false, "Una mezcla vibrante de tradición y tecnología moderna.", "activo"),
            new Destinos("DEST_ID_2", "Nueva York", 1800, 12, "nuevayork.jpg", true, "La ciudad que nunca duerme, llena de rascacielos y cultura.", "activo"),
            new Destinos("DEST_ID_3", "Roma", 1400, 15, "roma.jpg", false, "Ciudad eterna, famosa por su historia y monumentos antiguos.", "activo"),
            new Destinos("DEST_ID_4", "Sídney", 1700, 7, "sidney.jpg", true, "Famosa por la Ópera de Sídney y sus hermosas playas.", "activo"),
            new Destinos("DEST_ID_5", "Río de Janeiro", 1300, 20, "riodejaneiro.jpg", false, "Hermosas playas, Carnaval y el Cristo Redentor.", "activo")
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

    modificarEstado(idDestino){
        let destino = this.obtenerObjeto(this.destinos, "id", idDestino);
        if(destino.estado === "activo"){
            destino.estado = "pausado"
        }else{
            destino.estado = "activo"
        }
        return destino
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
            for(let i = 0; i < this.reservas.length; i++){
                let reserva = this.reservas[i]
                    reservasUsuario.push(reserva)
            }
        }

        return reservasUsuario
    }

    // COMO COBRARLE AL USUARIO
    cobrarAlUsuario(usuario, importeTotal, medioDePago) {
        let resultado = [];
        let cobro = false;
        let mensaje = "";
    
        if (medioDePago === "Millas") {
            if (usuario.millas >= importeTotal) {
                // Pago completamente con millas
                usuario.millas -= importeTotal;
                cobro = true;
                mensaje = "Pago realizado completamente con millas.";
            } else if (usuario.millas < importeTotal && usuario.saldoInicial >= (importeTotal - usuario.millas)) {
                // Pago con millas y saldo en efectivo
                let restante = importeTotal - usuario.millas;
                usuario.saldoInicial -= restante;
                usuario.millas = 0; // Todas las millas se utilizan
                cobro = true;
                mensaje = `Pago realizado con millas y efectivo. Millas utilizadas: ${usuario.millas}, saldo restante pagado en efectivo: $${restante}.`;
            } else {
                // Saldo insuficiente
                mensaje = "No se pudo cobrar, saldo insuficiente. Reserva cancelada.";
            }
        } else if (medioDePago === "Efectivo") {
            if (usuario.saldoInicial >= importeTotal) {
                // Pago completamente en efectivo
                usuario.saldoInicial -= importeTotal;
                usuario.millas += importeTotal / 100; // Generar millas
                cobro = true;
                mensaje = "Pago realizado completamente en efectivo.";
            } else {
                // Saldo insuficiente
                mensaje = "No se pudo cobrar, saldo insuficiente. Reserva cancelada.";
            }
        }
    
        resultado.push(cobro, mensaje);
        return resultado;
    }
    
}