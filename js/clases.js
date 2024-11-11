class Usuarios{
    constructor(id, tipoDeUsuario, nombre, apellido, nombreDeUsuario, contrasenia, numeroTarjetaCredito, cvc){
        this.id = id;
        this.tipo = tipoDeUsuario
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreDeUsuario = nombreDeUsuario;
        this.contrasenia = contrasenia;
        this.numeroTarjetaCredito = numeroTarjetaCredito;
        this.cvc = cvc;
        this.saldoInicial = 15000;
    }

}

class Destinos{
    constructor(nombreDestino, precioPorNoche, cuposDisponibles, imagen, estaEnOferta, descripcion){
        this.nombreDestino = nombreDestino;
        this.precioPorNoche = precioPorNoche;
        this.cuposDisponibles = cuposDisponibles;
        this.imagen = imagen;
        this.estaEnOferta = estaEnOferta;
        this.descripcion = descripcion;
    }
}

class Reserva{
    constructor(idReserva, idUsuario, nombreDestino, nombreDeUsuario, importeTotal, estado){
        this.idReserva = idReserva;
        this.idUsuario = idUsuario;
        this.nombreDestino = nombreDestino;
        this.nombreDeUsuario = nombreDeUsuario;
        this.importeTotal = importeTotal;
        this.estado = estado;
    }
}