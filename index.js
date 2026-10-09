const inputTarefa = document.getElementById('inputTarefa');
const botaoAdicionar = document.getElementById('botaoAdicionar');

const containerForm = document.getElementById('containerForm');
const formTarefa = document.getElementById('formTarefa');
const inputTitulo = document.getElementById('inputTitulo');
const inputDescricao = document.getElementById('inputDescricao');
const botaoCancelar = document.getElementById('botaoCancelar');

const containerFormEditar = document.getElementById('containerFormEditar');
const formEditar = document.getElementById('formEditar');
const inputTituloEditar = document.getElementById('inputTituloEditar');
const inputDescricaoEditar = document.getElementById('inputDescricaoEditar');
const botaoCancelarEditar = document.getElementById('botaoCancelarEditar');

let tarefas = [];
let idParaEditar = null;

let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
if (!usuario) window.location.href = "/index.html";

function buscarTarefas() {
    const idDoUsuario = usuario.id || usuario._id;
    fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${idDoUsuario}`)
        .then(r => r.json())
        .then(json => {
            if (json.tipo === "erro") return console.log(json.mensagem);
            tarefas = json.tarefas || json || [];
            carregarTarefas(tarefas);
        });
}
buscarTarefas();

function carregarTarefas(lista) {
    const grid = document.getElementById("tarefas");
    if (!lista || lista.length == 0) {
        grid.innerHTML = "<p class='text-gray-400'>Nenhuma tarefa ainda</p>";
        return;
    }
    grid.innerHTML = '';
    lista.forEach(t => {
        const idReal = t.id || t._id;
        grid.innerHTML += `
        <div class="bg-white p-4 rounded-xl shadow">
            <h3 class="font-bold text-purple-900">${t.titulo}</h3>
            <p class="text-sm text-gray-600 mt-1">${t.descricao || 'Sem descrição'}</p>
            <div class="flex gap-2 mt-3">
                <button onclick="abrirFormEditar('${idReal}')" class="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded hover:bg-purple-200"><box-icon name='edit-alt'></box-icon></button>
                <button onclick="excluirTarefa('${idReal}')" class="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded hover:bg-red-100"><box-icon name='trash'></box-icon></button>
            </div>
        </div>`;
    });
}

function abrirFormCriar() {
    containerForm.classList.remove('hidden');
    containerForm.classList.add('flex');
    inputTitulo.value = inputTarefa.value;
    inputTitulo.focus();
}
function fecharFormCriar() {
    containerForm.classList.add('hidden');
    containerForm.classList.remove('flex');
    inputTitulo.value = '';
    inputDescricao.value = '';
    inputTarefa.value = '';
}

function abrirFormEditar(id) {
    const t = tarefas.find(x => (x.id || x._id) == id);
    if (!t) return;
    idParaEditar = id;
    inputTituloEditar.value = t.titulo;
    inputDescricaoEditar.value = t.descricao || '';
    containerFormEditar.classList.remove('hidden');
    containerFormEditar.classList.add('flex');
}
function fecharFormEditar() {
    containerFormEditar.classList.add('hidden');
    containerFormEditar.classList.remove('flex');
    idParaEditar = null;
}

formTarefa.addEventListener('submit', (e) => {
    e.preventDefault();
    const idDoUsuario = usuario.id || usuario._id;
    fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: idDoUsuario, titulo: inputTitulo.value, descricao: inputDescricao.value })
    }).then(r => r.json()).then(json => {
        if (json.tipo === "erro") return alert(json.mensagem);
        fecharFormCriar();
        buscarTarefas();
    });
});

formEditar.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!idParaEditar) return;
    fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${idParaEditar}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: inputTituloEditar.value, descricao: inputDescricaoEditar.value })
    }).then(r => r.json()).then(() => {
        fecharFormEditar();
        buscarTarefas();
    });
});

function excluirTarefa(id) {
    if (!confirm("Excluir essa tarefa?")) return;
    fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${id}`, { method: 'DELETE' })
        .then(() => buscarTarefas());
}

botaoAdicionar.addEventListener('click', abrirFormCriar);
botaoCancelar.addEventListener('click', fecharFormCriar);
botaoCancelarEditar.addEventListener('click', fecharFormEditar);

containerForm.addEventListener('click', (e) => { if (e.target === containerForm) fecharFormCriar(); });
containerFormEditar.addEventListener('click', (e) => { if (e.target === containerFormEditar) fecharFormEditar(); });