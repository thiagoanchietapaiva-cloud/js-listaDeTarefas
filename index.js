const inputTarefa = document.getElementById('inputTarefa');
const botaoAdicionar = document.getElementById('botaoAdicionar');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');
const botaoCancelar = document.getElementById('botaoCancelar');
const botaoSalvar = document.getElementById('botaoSalvar');

let tarefas = [];

let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
if (!usuario) {
    window.location.href = "/index.html";
}

function buscarTarefas() {
    const idDoUsuario = usuario.id || usuario._id;

    fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${idDoUsuario}`)
        .then(response => response.json())
        .then(json => {
            console.log("O que veio da API ao buscar:", json);
            if (json.tipo === "erro") {
                console.log(json.mensagem);
                return;
            }
            tarefas = json.tarefas || json || [];
            carregarTarefas(tarefas);
        })
        .catch(error => {
            console.log("Erro:", error);
        });
}

buscarTarefas();

function carregarTarefas(listaTarefas) {
    let grid = document.getElementById("tarefas");

    if (!listaTarefas || listaTarefas.length == 0) {
        grid.innerHTML = "<p class='text-gray-400'>Nenhuma tarefa ainda</p>";
        return;
    }

    grid.innerHTML = '';
    listaTarefas.forEach((tarefa) => {
        grid.innerHTML += `
        <div class="bg-white p-4 rounded-xl shadow">
            <h3 class="font-bold text-purple-900">${tarefa.titulo}</h3>
            <p class="text-sm text-gray-600 mt-1">${tarefa.descricao || 'Sem descrição'}</p>
            <button onclick="excluirTarefa('${tarefa.id}')" class="mt-3 text-xs text-red-600 font-bold">Excluir</button>
        </div>
        `;
    });
}

function abrirPopup() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modalTitulo.value = inputTarefa.value;
    modalTitulo.focus();
}

function fecharPopup() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modalTitulo.value = '';
    modalDescricao.value = '';
    inputTarefa.value = '';
}

function salvarTarefa() {
    if (modalTitulo.value.trim() === '') {
        alert('Digite um título');
        return;
    }

    const idDoUsuario = usuario.id || usuario._id;

    fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            usuario_id: idDoUsuario,
            titulo: modalTitulo.value,
            descricao: modalDescricao.value
        })
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (json.tipo === "erro") {
                alert(json.mensagem);
                return;
            }
            fecharPopup();
            buscarTarefas();
        })
        .catch(error => {
            alert("Erro ao salvar: " + error);
        });
}
function excluirTarefa(id) {
    if (!confirm("Excluir essa tarefa?")) return;

    fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(json => {
            buscarTarefas();
        })
        .catch(error => {
            alert("Erro ao excluir: " + error);
        });
}


botaoSalvar.addEventListener('click', salvarTarefa);
botaoAdicionar.addEventListener('click', abrirPopup);
botaoCancelar.addEventListener('click', fecharPopup);
modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharPopup();
});
