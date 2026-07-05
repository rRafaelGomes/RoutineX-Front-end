// ==========================
// LOGIN
// ==========================

function mostrarLogin() {

    document.getElementById("app").innerHTML = `

    <div class="background">
        <div class="login-card">
            <div class="logo">
                <div class="logo-circle"></div>
                <h1>RoutineX</h1>
            </div>

            <h2>Bem-vindo</h2>
            <p>Organize seus hábitos e mantenha sua sequência diária.</p>

            <input
                id="email"
                type="email"
                placeholder="Seu e-mail"
            >

            <button onclick="login()">
                Entrar
            </button>

            <span onclick="mostrarCadastro()">
                Criar conta
            </span>
        </div>
    </div>
    `;
}

// ==========================
// CADASTRO
// ==========================

function mostrarCadastro() {

    document.getElementById("app").innerHTML = `

    <div class="background">
        <div class="login-card">
            <div class="logo">
                <div class="logo-circle"></div>
                <h1>RoutineX</h1>
            </div>

            <h2>Criar conta</h2>
            <p>Cadastre-se para começar.</p>

            <input
                id="nome"
                placeholder="Nome"
            >

            <input
                id="email"
                placeholder="Email"
            >

            <button onclick="cadastrarUsuario()">
                Cadastrar
            </button>

            <span onclick="mostrarLogin()">
                Já possui conta?
            </span>
        </div>
    </div>
    `;
}

// ==========================
// DASHBOARD
// ==========================

function mostrarDashboard(nome = "Usuário") {

    document.getElementById("app").innerHTML = `

    <div class="dashboard-layout">

        <aside class="sidebar">

            <div class="logo">
                <img src="img/RoutineX.png" alt="RoutineX" class="logo-img">
                <h1>RoutineX</h1>
            </div>

            <nav>
                <a class="ativo">🏠 Dashboard</a>
            </nav>

            <button class="logout" onclick="logout()">
                Sair
            </button>
        </aside>

        <section class="conteudo">
            <header class="header-dashboard">

                <div>
                    <h2>Olá, ${nome}</h2>
                    <p>Continue mantendo sua sequência 🔥</p>
                </div>

                <button onclick="abrirFormulario()">
                    + Novo Hábito
                </button>
            </header>

            <div class="estatisticas">
                <div class="info-card">
                    <h3 id="totalHabitos">0</h3>
                    <span>Hábitos</span>
                </div>

                <div class="info-card">
                    <h3 id="sequenciaTotal">0</h3>
                    <span>Dias</span>
                </div>

                <div class="info-card">
                    <h3 id="mediaMeta">0</h3>
                    <span>Meta Média</span>
                </div>
            </div>

            <div id="listaHabitos" class="cards"></div>
            <div id="modal"></div>
        </section>
    </div>
    `;

    carregarHabitos();
}

// ==========================
// MODAL NOVO HÁBITO
// ==========================

function abrirFormulario() {

    document.getElementById("modal").innerHTML = `

    <div class="modal-overlay">
        <div class="modal">
            <h2>Novo Hábito</h2>

            <input
                id="nomeHabito"
                placeholder="Nome do hábito"
            >

            <input
                id="metaHabito"
                type="number"
                placeholder="Meta semanal"
            >

            <div class="modal-buttons">
                <button onclick="criarHabito()">
                    Criar
                </button>

                <button
                    class="cancelar"
                    onclick="fecharFormulario()">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
    `;
}

function fecharFormulario() {

    document.getElementById("modal").innerHTML = "";

}

// ==========================
// CARDS
// ==========================

function desenharHabitos(lista) {

    const div = document.getElementById("listaHabitos");

    if (!div) return;

    if (lista.length === 0) {

        div.innerHTML = `

        <div class="vazio">
            Nenhum hábito cadastrado.
        </div>

        `;

        document.getElementById("totalHabitos").textContent = 0;
        document.getElementById("sequenciaTotal").textContent = 0;
        document.getElementById("mediaMeta").textContent = 0;

        return;
    }

    div.innerHTML = "";

    let sequencia = 0;
    let media = 0;

    lista.forEach(h => {

        sequencia += Number(h.dias_seguidos);
        media += Number(h.meta);

    });

    document.getElementById("totalHabitos").textContent = lista.length;
    document.getElementById("sequenciaTotal").textContent = sequencia;
    document.getElementById("mediaMeta").textContent =
        Math.round(media / lista.length);

    lista.forEach(habito => {

        const progresso = Math.min(
            (habito.dias_seguidos / habito.meta) * 100,
            100
        );

        div.innerHTML += `

        <div class="card-habito">
            <div class="card-topo">
                <div>
                    <h3>💜 ${habito.nome}</h3>
                    <small>Meta semanal</small>
                </div>

                <div class="badge">
                    🔥 ${habito.dias_seguidos}
                </div>
            </div>

            <div class="meta-info">
                <span>${habito.meta} dias</span>
            </div>

            <div class="progresso">
                <div
                    class="barra"
                    style="width:${progresso}%">
                </div>
            </div>

            <div class="acoes">
                <button
                    class="btn-roxo"
                    onclick="marcarHabito(${habito.id})">
                    🔥 Hoje
                </button>

                <button
                    class="btn-icon"
                    onclick="editarHabito(${habito.id})">
                    ✏️
                </button>

                <button
                    class="btn-icon"
                    onclick="excluirHabito(${habito.id})">
                    🗑️
                </button>
            </div>
        </div>
        `;
    });
}


