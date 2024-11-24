function listarEventos () {
    const eventos = JSON.parse(localStorage.getItem('eventos'));
    console.log(eventos);

}

function getDetalhesEvento (id) {
    const eventos = JSON.parse(localStorage.getItem('eventos'));
    const evento = eventos.find(evento => evento.id == id);
    console.log(evento);
    return evento;
}

listarEventos();

const evento = getDetalhesEvento(1);

getDadosPerfil(evento.criadorDoEvento);