
function entrarAtendimento() {
    let nomeAtendente = document.getElementById("nome-atendente").value;
    if (nomeAtendente.trim() === "") {
        alert("Por favor, digite seu nome para entrar no atendimento.");
        return;
    }
    carregarClientes();
}

function carregarClientes() {
    let tabela = document.getElementById("tabela-clientes").getElementsByTagName("tbody")[0];
    tabela.innerHTML = "";

    let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

    clientes.forEach(cliente => {
        let tempoEspera = Math.floor((new Date().getTime() - cliente.tempoInicio) / 60000);
        let newRow = tabela.insertRow();
        newRow.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.servico}</td>
            <td>${cliente.prioridade}</td>
            <td>${tempoEspera} min</td>
            <td><button class='btn btn-success' onclick='chamarCliente("${cliente.nome}")'>Chamar</button></td>`;    
    });
}

function chamarCliente(nome) {
    if (confirm(`Chamar cliente ${nome}?`)) {
        let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
        let cliente = clientes.find(c => c.nome === nome);
        
        let emAtendimento = JSON.parse(localStorage.getItem('emAtendimento') || '[]');
        emAtendimento.push({
            ...cliente,
            inicioAtendimento: new Date().getTime(),
            atendente: document.getElementById("nome-atendente").value
        });
        localStorage.setItem('emAtendimento', JSON.stringify(emAtendimento));
        
        clientes = clientes.filter(c => c.nome !== nome);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        
        carregarClientes();
        carregarEmAtendimento();
    }
}

function finalizarAtendimento(nome) {
    if (confirm(`Finalizar atendimento de ${nome}?`)) {
        let emAtendimento = JSON.parse(localStorage.getItem('emAtendimento') || '[]');
        let atendimento = emAtendimento.find(a => a.nome === nome);
        
        let atendimentos = JSON.parse(localStorage.getItem('atendimentos') || '[]');
        atendimentos.push({
            ...atendimento,
            tempoFim: new Date().getTime()
        });
        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
        
        emAtendimento = emAtendimento.filter(a => a.nome !== nome);
        localStorage.setItem('emAtendimento', JSON.stringify(emAtendimento));
        
        carregarEmAtendimento();
    }
}

function carregarEmAtendimento() {
    let tabela = document.getElementById("tabela-em-atendimento").getElementsByTagName("tbody")[0];
    tabela.innerHTML = "";

    let emAtendimento = JSON.parse(localStorage.getItem('emAtendimento') || '[]');

    emAtendimento.forEach(atendimento => {
        let tempoAtendimento = Math.floor((new Date().getTime() - atendimento.inicioAtendimento) / 60000);
        let newRow = tabela.insertRow();
        newRow.innerHTML = `
            <td>${atendimento.nome}</td>
            <td>${atendimento.servico}</td>
            <td>${atendimento.atendente}</td>
            <td>${tempoAtendimento} min</td>
            <td><button class='btn btn-danger' onclick='finalizarAtendimento("${atendimento.nome}")'>Finalizar</button></td>`;
    });
}

setInterval(() => {
    carregarClientes();
    carregarEmAtendimento();
}, 60000);

window.onload = () => {
    carregarClientes();
    carregarEmAtendimento();
};
