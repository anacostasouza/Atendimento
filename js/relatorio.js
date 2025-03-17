
function formatarData(timestamp) {
    const data = new Date(timestamp);
    return data.toLocaleDateString('pt-BR');
}

function carregarAtendentes() {
    let atendentes = JSON.parse(localStorage.getItem('atendentes') || '[]');
    let select = document.getElementById("select-atendente");
    
    select.innerHTML = "<option value=''>Todos</option>";
    atendentes.forEach(atendente => {
        let option = document.createElement("option");
        option.value = atendente.nome;
        option.textContent = atendente.nome;
        select.appendChild(option);
    });
}

function calcularEstatisticas(atendimentos) {
    const total = atendimentos.length;
    let somaTempos = 0;

    atendimentos.forEach(atendimento => {
        const tempoTotal = (atendimento.tempoFim - atendimento.tempoInicio) / 60000; 
        somaTempos += tempoTotal;
    });

    const media = total > 0 ? (somaTempos / total).toFixed(1) : 0;

    document.getElementById('media-tempo').textContent = media;
    document.getElementById('total-atendimentos').textContent = total;
}

function filtrarAtendimentos() {
    const dataInicial = document.getElementById('data-inicial').value;
    const dataFinal = document.getElementById('data-final').value;
    const atendenteSelected = document.getElementById('select-atendente').value;
    
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos') || '[]');
    
    if (dataInicial) {
        const timestampInicial = new Date(dataInicial).getTime();
        atendimentos = atendimentos.filter(a => a.tempoFim >= timestampInicial);
    }
    
    if (dataFinal) {
        const timestampFinal = new Date(dataFinal).setHours(23, 59, 59, 999);
        atendimentos = atendimentos.filter(a => a.tempoFim <= timestampFinal);
    }

    if (atendenteSelected) {
        atendimentos = atendimentos.filter(a => a.atendente === atendenteSelected);
    }
    
    calcularEstatisticas(atendimentos);
    exibirAtendimentos(atendimentos);
}

function limparFiltros() {
    document.getElementById('data-inicial').value = '';
    document.getElementById('data-final').value = '';
    document.getElementById('select-atendente').value = '';
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
    calcularEstatisticas(atendimentos);
    exibirAtendimentos(atendimentos);
}

window.onload = () => {
    carregarAtendentes();
    carregarRelatorio();
};
