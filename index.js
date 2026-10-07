let tarefas = [];

let usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
if (!usuario) {
    window.location.href = "/index.html";
}

function buscarTarefas() {
    try {
        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${usuario.id}`)
        .then(response => response.json())
        .then(json => {
            if (json.tipo === "erro") {
                throw json.mensagem;
            }
            tarefas = json.tarefas;
            carregarTarefas(tarefas);
        })
        .catch(error => {
            console.log("Erro:", error);
        });

    } catch (error) {
        console.log("Error:", error.message);
    }
}


buscarTarefas();

function carregarTarefas(listaTarefas){
    let grid = document.getElementById("tarefas");

    if(listaTarefas.length == 0){
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