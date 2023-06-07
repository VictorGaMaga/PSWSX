const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sCpf = document.querySelector('#m-cpf');
const sNascimento = document.querySelector('#m-nascimento');
const sTelefone = document.querySelector('#m-telefone');
const btnSalvar = document.querySelector('#btnSalvar');

let itens = [];
let requisicaoEditar = null;

function openModal(edit = false, index = 0) {
  requisicaoEditar = edit;
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.classList.contains('modal-container')) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    sNome.value = itens[index].nome;
    sFuncao.value = itens[index].funcao;
    sCpf.value = itens[index].cpf;
    sNascimento.value = itens[index].nascimento;
    sTelefone.value = itens[index].telefone;
    sNome.dataset.id = itens[index].id;
  } else {
    sNome.value = '';
    sFuncao.value = '';
    sCpf.value = '';
    sNascimento.value = '';
    sTelefone.value = '';
    sNome.removeAttribute('data-id');
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  const itemId = index;
  
  const formdata = new FormData()
  formdata.append('id', itemId); 
/* console.log(index);
return; */
  fetch('http://localhost/PSWSX/delete.php', {
    method: 'POST',
    body: formdata
  })
    .then(response => response.json())
    .then(result => {
      if (result.status === 'success') {
        loadItems();
      } else {
        console.error(result.message);
      }
    })
    .catch(error => {
      console.error('Ocorreu um erro na solicitação:', error);
    });
}

function updateItem() {
  const id = sNome.dataset.id;
  const nome = sNome.value.trim();
  const funcao = sFuncao.value.trim();
  const cpf = sCpf.value.trim();
  const nascimento = sNascimento.value.trim();
  const telefone = sTelefone.value.trim();

  if (id && nome && funcao && cpf && nascimento && telefone) {
    const data = {
      id: id,
      nome: nome,
      funcao: funcao,
      cpf: cpf,
      nascimento: nascimento,
      telefone: telefone
    };

    const formdata = new FormData()
    formdata.append('id', id); 
    formdata.append('nome', nome);  
    formdata.append('funcao', funcao);
    formdata.append('cpf', cpf);
    formdata.append('nascimento', nascimento);
    formdata.append('telefone', telefone);

    fetch('http://localhost/PSWSX/atualizar.php', {
      method: 'POST',
      body: formdata
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          loadItems();
          closeModal();
        } else {
          console.error(result.message);
        }
      })
      .catch(error => {
        console.log('Ocorreu um erro na solicitação:', error);
      });
  } else {
    alert('Preencha todos os campos!');
  }
}

function insertItem() {
  const nome = sNome.value.trim();
  const funcao = sFuncao.value.trim();
  const cpf = sCpf.value.trim();
  const nascimento = sNascimento.value.trim();
  const telefone = sTelefone.value.trim();

  if (nome && funcao && cpf && nascimento && telefone) {
    const data = {
      nome: nome,
      funcao: funcao,
      cpf: cpf,
      nascimento: nascimento,
      telefone: telefone
    };

    const formdata = new FormData()
    formdata.append('nome', nome);  
    formdata.append('funcao', funcao);
    formdata.append('cpf', cpf);
    formdata.append('nascimento', nascimento);
    formdata.append('telefone', telefone);

    fetch('http://localhost/PSWSX/insert.php', {
      method: 'POST',
      body: formdata
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          loadItems();
          closeModal();
        } else {
          console.error(result.message);
        }
      })
      .catch(error => {
        console.error('Ocorreu um erro na solicitação:', error);
      });
  } else {
    alert('Preencha todos os campos!');
  }
}

function closeModal() {
  modal.classList.remove('active');
}

function pesquisar() {
  loadItems();
}

function loadItems() {
  var valor = document.getElementById('textNome').value;
  tbody.innerHTML = '';
  fetch('http://localhost/PSWSX/Select.php?valor='+valor)
    .then(response => response.json())
    .then(data => {
      itens = data.itens;
      for (let i = 0; i < itens.length; i++) {
        const row = document.createElement('tr');

        const cellNome = document.createElement('td');
        cellNome.textContent = itens[i].nome;

        const cellFuncao = document.createElement('td');
        cellFuncao.textContent = itens[i].funcao;

        const cellCpf = document.createElement('td');
        cellCpf.textContent = itens[i].cpf;

        const cellNascimento = document.createElement('td');
        cellNascimento.textContent = itens[i].nascimento;

        const cellTelefone = document.createElement('td');
        cellTelefone.textContent = itens[i].telefone;

        const cellAcoes = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editItem(i));

        //const deleteButton = document.createElement('button');
        //deleteButton.textContent = 'Excluir';
        //deleteButton.addEventListener('click', () => deleteItem(i));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => deleteItem(itens[i].id));



        cellAcoes.appendChild(editButton);
        cellAcoes.appendChild(deleteButton);

        row.appendChild(cellNome);
        row.appendChild(cellFuncao);
        row.appendChild(cellCpf);
        row.appendChild(cellNascimento);
        row.appendChild(cellTelefone);
        row.appendChild(cellAcoes);

        tbody.appendChild(row);
      }
    })
    .catch(error => {
      console.error('Ocorreu um erro ao carregar os itens:', error);
    });
}

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
//console.log(requisicaoEditar);
  if(requisicaoEditar){
    updateItem();
  } else{
    insertItem()
  }
});

//loadItems();