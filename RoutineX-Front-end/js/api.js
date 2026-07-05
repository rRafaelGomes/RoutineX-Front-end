const API = "http://127.0.0.1:5000";

// ==========================
// LOGIN
// ==========================

async function login() {

    const email = document.getElementById("email").value;

    if (email === "") {
        alert("Informe seu e-mail.");
        return;
    }

    const resposta = await fetch(API + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email
        })
    });

    const dados = await resposta.json();

    if (resposta.ok) {

        localStorage.setItem("usuario_id", dados.id);
        localStorage.setItem("usuario_nome", dados.nome);

        mostrarDashboard(dados.nome);

    } else {

        alert(dados.erro);
    }
}

// ==========================
// CADASTRAR USUÁRIO
// ==========================

async function cadastrarUsuario() {

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (nome === "" || email === "") {

        alert("Preencha todos os campos.");
        return;
    }

    const resposta = await fetch(API + "/usuarios", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome: nome,
            email: email
        })
    });

    const dados = await resposta.json();

    alert(dados.mensagem || dados.erro);

    if (resposta.ok) {
        mostrarLogin();
    }
}

// ==========================
// LISTAR HÁBITOS
// ==========================

async function carregarHabitos() {

    const usuario = localStorage.getItem("usuario_id");
    const resposta = await fetch(API + "/habitos?usuario_id=" + usuario);
    const habitos = await resposta.json();
    desenharHabitos(habitos);
}

// ==========================
// CRIAR HÁBITO
// ==========================

async function criarHabito() {

    const nome = document.getElementById("nomeHabito").value;
    const meta = document.getElementById("metaHabito").value;

    await fetch(API + "/habitos", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            usuario_id: localStorage.getItem("usuario_id"),
            nome: nome,
            meta: meta

        })
    });

    fecharFormulario();

    carregarHabitos();

    console.log("CRIAR CLICADO");

}

// ==========================
// EXCLUIR
// ==========================

async function excluirHabito(id) {

    await fetch(API + "/habitos/" + id, {

        method: "DELETE"

    });

    carregarHabitos();

    console.log("CRIAR CLICADO");
}

// ==========================
// EDITAR
// ==========================

async function editarHabito(id) {

    const nome = prompt("Novo nome");
    const meta = prompt("Nova meta");

    if (!nome || !meta) return;

    await fetch(API + "/habitos/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            nome: nome,
            meta: meta
        })
    });

    carregarHabitos();

    console.log("CRIAR CLICADO");
}

// ==========================
// MARCAR HOJE
// ==========================

async function marcarHabito(id) {

    await fetch(API + "/habitos/" + id + "/marcar", {

        method: "PATCH"

    });

    carregarHabitos();
}

// ==========================
// LOGOUT
// ==========================

function logout() {

    localStorage.clear();

    mostrarLogin();
}


