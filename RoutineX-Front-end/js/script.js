const usuarioId = localStorage.getItem("usuario_id");
const usuarioNome = localStorage.getItem("usuario_nome");

if (usuarioId && usuarioNome) {
    mostrarDashboard(usuarioNome);
} else {
    mostrarLogin();
}


