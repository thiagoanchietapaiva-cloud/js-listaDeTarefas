// const inputTarefa = document.getElementById('inputTarefa');
// const botaoAdicionar = document.getElementById('botaoAdicionar');
// const containerTarefas = document.getElementById('tarefas');

// const modal = document.getElementById('modal');
// const modalTitulo = document.getElementById('modalTitulo');
// const modalDescricao = document.getElementById('modalDescricao');
// const botaoCancelar = document.getElementById('botaoCancelar');
// const botaoSalvar = document.getElementById('botaoSalvar');

// let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// function abrirPopup() {
//     modal.classList.remove('hidden');
//     modal.classList.add('flex');
//     modalTitulo.value = inputTarefa.value;
//     modalTitulo.focus();
// }

// function fecharPopup() {
//     modal.classList.add('hidden');
//     modal.classList.remove('flex');
//     modalTitulo.value = '';
//     modalDescricao.value = '';
//     inputTarefa.value = '';
// }

// function renderizar() {
//     containerTarefas.innerHTML = '';
//     tarefas.forEach((tarefa, index) => {
//         containerTarefas.innerHTML += `
//         <div class="bg-white p-4 rounded-xl shadow">
//                 <h3 class="font-bold text-purple-900">${tarefa.titulo}</h3>
//                 <p class="text-sm text-gray-600 mt-1">${tarefa.descricao || 'Sem descrição'}</p>
//                 <button onclick="excluirTarefa(${index})" class="mt-3 text-xs text-red-600">Excluir</button>
//             </div>
//         `;
//     });
//     localStorage.setItem('tarefas', JSON.stringify(tarefas));
// }

// function excluirTarefa(index) {
//     tarefas.splice(index, 1);
//     renderizar();
// }

// botaoAdicionar.addEventListener('click', abrirPopup);
// inputTarefa.addEventListener('keydown', e => {
//     if(e.key === 'Enter') abrirPopup();
// });

// botaoCancelar.addEventListener('click', fecharPopup);
// modal.addEventListener('click', e => {
//     if(e.target === modal) fecharPopup();
// });

// botaoSalvar.addEventListener('click', () => {
//     if(modalTitulo.value.trim() === '') return alert('Digite um título');
    
//     tarefas.unshift({
//         titulo: modalTitulo.value,
//         descricao: modalDescricao.value
//     });
//     renderizar();
//     fecharPopup();
// });

// renderizar();