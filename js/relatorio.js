
function formatarData(timestamp) {
    const data = new Date(timestamp);
    return data.toLocaleDateString('pt-BR');
}

function filtrarAtendimentos() {
    const dataInicial = document.getElementById('data-inicial').value;
    const dataFinal = document.getElementById('data-final').value;
    
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos') || '[]');
    
    if (dataInicial) {
        const timestampInicial = new Date(dataInicial).getTime();
        atendimentos = atendimentos.filter(a => a.tempoFim >= timestampInicial);
    }
    
    if (dataFinal) {
        const timestampFinal = new Date(dataFinal).setHours(23, 59, 59, 999);
        atendimentos = atendimentos.filter(a => a.tempoFim <= timestampFinal);
    }
    
    exibirAtendimentos(atendimentos);
}

function limparFiltros() {
    document.getElementById('data-inicial').value = '';
    document.getElementById('data-final').value = '';
    carregarRelatorio();
}

function exibirAtendimentos(atendimentos) {
    let tabela = document.getElementById("tabela-fila").getElementsByTagName("tbody")[0];
    tabela.innerHTML = '';
    
    atendimentos.forEach(atendimento => {
        let tempoTotal = Math.floor((atendimento.tempoFim - atendimento.tempoInicio) / 60000);
        let newRow = tabela.insertRow();
        newRow.innerHTML = `
            <td>${atendimento.nome}</td>
            <td>${atendimento.servico}</td>
            <td>${atendimento.prioridade}</td>
            <td>${tempoTotal} min</td>
            <td>${atendimento.atendente}</td>
            <td>${formatarData(atendimento.tempoFim)}</td>`;
    });
}

function carregarRelatorio() {
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos') || '[]');
    exibirAtendimentos(atendimentos);
}

window.onload = carregarRelatorio;
