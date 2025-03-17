
function cadastrarCliente() {
    let nome = document.getElementById("nome-cliente").value.trim();
    if (!nome) {
        alert('Por favor, preencha o nome do cliente');
        return;
    }
    let servico = document.getElementById("tipo-servico").value;
    let prioridade = document.getElementById("prioridade").value;
    let tempoInicio = new Date().getTime();

    let cliente = { nome, servico, prioridade, tempoInicio };
    let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    atualizarTabela();
    document.getElementById("nome-cliente").value = '';
}

function atualizarTabela() {
    let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    let tabela = document.getElementById("tabela-fila").getElementsByTagName("tbody")[0];
    tabela.innerHTML = '';
    
    clientes.forEach(cliente => {
        let tempoEspera = Math.floor((new Date().getTime() - cliente.tempoInicio) / 60000);
        let newRow = tabela.insertRow();
        if (cliente.prioridade === 'Alta') {
            newRow.style.backgroundColor = '#ffcdd2';
        }
        newRow.innerHTML = `
            <td>${cliente.nome}</td>
            <td class="tempo-espera" data-inicio="${cliente.tempoInicio}">${tempoEspera} min</td>
            <td>${cliente.servico}</td>
            <td>${cliente.prioridade}</td>
        `;
    });
}

function atualizarTempos() {
    atualizarTabela();
}

setInterval(atualizarTempos, 60000);
window.onload = atualizarTabela;
