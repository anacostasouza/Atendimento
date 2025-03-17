
function carregarRelatorio() {
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos') || '[]');
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
            <td>${atendimento.atendente}</td>`;
    });
}

window.onload = carregarRelatorio;
