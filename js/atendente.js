
function carregarAtendentes() {
    let atendentes = JSON.parse(localStorage.getItem('atendentes') || '[]');
    let tabela = document.getElementById("tabela-atendentes").getElementsByTagName("tbody")[0];
    let select = document.getElementById("select-atendente");
    
    tabela.innerHTML = "";
    select.innerHTML = "<option value=''>Selecione um atendente</option>";
    
    atendentes.forEach(atendente => {
    
        let row = tabela.insertRow();
        row.innerHTML = `
            <td>
                <span class="nome-display">${atendente.nome}</span>
                <input type="text" class="form-control nome-edit" style="display: none" value="${atendente.nome}">
            </td>
            <td>
                <button class="btn btn-sm btn-warning editar-btn" onclick="editarAtendente('${atendente.id}')">Editar</button>
                <button class="btn btn-sm btn-success salvar-btn" style="display: none" onclick="salvarEdicao('${atendente.id}')">Salvar</button>
                <button class="btn btn-sm btn-danger" onclick="excluirAtendente('${atendente.id}')">Excluir</button>
            </td>`;
            
      
        let option = document.createElement("option");
        option.value = atendente.id;
        option.textContent = atendente.nome;
        select.appendChild(option);
    });
}

function cadastrarAtendente() {
    let nome = document.getElementById("nome-novo-atendente").value.trim();
    if (!nome) {
        alert("Por favor, digite o nome do atendente.");
        return;
    }

    let atendentes = JSON.parse(localStorage.getItem('atendentes') || '[]');
    let novoAtendente = {
        id: Date.now().toString(),
        nome: nome
    };
    
    atendentes.push(novoAtendente);
    localStorage.setItem('atendentes', JSON.stringify(atendentes));
    
    document.getElementById("nome-novo-atendente").value = '';
    carregarAtendentes();
}

function editarAtendente(id) {
    let row = document.querySelector(`[onclick="editarAtendente('${id}')"]`).closest('tr');
    row.querySelector('.nome-display').style.display = 'none';
    row.querySelector('.nome-edit').style.display = 'block';
    row.querySelector('.editar-btn').style.display = 'none';
    row.querySelector('.salvar-btn').style.display = 'inline-block';
}

function salvarEdicao(id) {
    let row = document.querySelector(`[onclick="salvarEdicao('${id}')"]`).closest('tr');
    let novoNome = row.querySelector('.nome-edit').value.trim();
    
    if (!novoNome) {
        alert("O nome não pode ficar em branco.");
        return;
    }

    let atendentes = JSON.parse(localStorage.getItem('atendentes') || '[]');
    let atendente = atendentes.find(a => a.id === id);
    atendente.nome = novoNome;
    
    localStorage.setItem('atendentes', JSON.stringify(atendentes));
    carregarAtendentes();
}

function excluirAtendente(id) {
    if (!confirm("Tem certeza que deseja excluir este atendente?")) {
        return;
    }

    let atendentes = JSON.parse(localStorage.getItem('atendentes') || '[]');
    atendentes = atendentes.filter(a => a.id !== id);
    localStorage.setItem('atendentes', JSON.stringify(atendentes));
    
    carregarAtendentes();
}

function entrarAtendimento() {
    let select = document.getElementById("select-atendente");
    let atendenteId = select.value;
    
    if (!atendenteId) {
        alert("Por favor, selecione um atendente.");
        return;
    }

    let atendentes = JSON.parse(localStorage.getItem('atendentes') || '[]');
    let atendente = atendentes.find(a => a.id === atendenteId);
    
    document.getElementById("area-atendimento").style.display = "block";
    carregarClientes();
    carregarEmAtendimento();
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
        let atendenteId = document.getElementById("select-atendente").value;
        let atendentes = JSON.parse(localStorage.getItem('atendentes') || '[]');
        let atendente = atendentes.find(a => a.id === atendenteId);
        
        let emAtendimento = JSON.parse(localStorage.getItem('emAtendimento') || '[]');
        emAtendimento.push({
            ...cliente,
            inicioAtendimento: new Date().getTime(),
            atendente: atendente.nome
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

window.onload = () => {
    carregarAtendentes();
};

setInterval(() => {
    if (document.getElementById("area-atendimento").style.display !== "none") {
        carregarClientes();
        carregarEmAtendimento();
    }
}, 60000);
