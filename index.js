const inputTarefa = document.getElementById('inputTarefa');
const botaoAdicionar = document.getElementById('botaoAdicionar');
const containerTarefas = document.getElementById('tarefas')

const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');
const btnCancelar = document.getElementById('btnCancelar');
const btnSalvar = document.getElementById('btnSalvar');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function abrirPopup() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modalTitulo.value = inputTarefa.value; // leva o que digitou no header
    modalTitulo.focus();
}

function fecharPopup() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modalTitulo.value = '';
    modalDescricao.value = '';
    inputTarefa.value = '';
}

function renderizarTarefas() {
    containerTarefas.innerHTML = '';
    tarefas.forEach((tarefa, index) => {
        containerTarefas.innerHTML += `
        <div class="bg-white p-4 rounded-xl shadow">
                <h3 class="font-bold text-purple-900">${t.titulo}</h3>
                <p class="text-sm text-gray-600 mt-1">${t.descricao || 'Sem descrição'}</p>
                <button onclick="tarefas.splice(${i},1); localStorage.setItem('tarefas', JSON.stringify(tarefas)); renderizar()" class="mt-3 text-xs text-red-600">Excluir</button>
            </div>
        `;
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

botaoAdicionar.addEventListener('click', abrirPopup);
inputTarefa.addEventListener('keydown', e => {
    if(e.key === 'Enter') abrirPopup();
});

btnCancelar.addEventListener('click', fecharPopup);
modal.addEventListener('click', e => {
    if(e.target === modal) fecharPopup();
});

btnSalvar.addEventListener('click', () => {
    if(modalTitulo.value.trim() === '') return alert('Digite um título');
    
    tarefas.unshift({
        titulo: modalTitulo.value,
        descricao: modalDescricao.value
    });
    renderizar();
    fecharPopup();
});

renderizar();