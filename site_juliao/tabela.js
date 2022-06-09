// mapear dados do html
const form = document.querySelector('#infos-prod');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;
let usuarioId = Number(sessionStorage.getItem('logado'));

const session = localStorage.getItem("session");

/*checkLogged();

function checkLogged(){
    if(session) {
        sessionStorage.getItem("log", session);
        usuarioId = session;
    }
    if(!usuarioId){
        window.location.href = "index.html"
        return;
    }
}

*/

// salvar no localstorage
const atualizarLocalStorage = (produtos) => { localStorage.setItem('produtos', JSON.stringify(produtos)) }

// recupera os produtos
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos') || '[]');

const salvarProduto = (e) => {
    e.preventDefault()
    console.log('salvando')

    const nome = form.nome.value;
    const preco = Number(form.preco.value);
    const prime = form.prime.checked;

    if (idx == 'novo') {
        const produtos = recuperarLocalStorage();
        // produtos.push({ id: produtos.length + 1, nome, preco, prime });
        let idp = 0;
        for(const pro of produtos){
            if(pro.usuarioId === usuarioId){
                idp = Number(pro.id)
        } 
        };
        produtos.push({ id: idp+=1, nome, preco, prime, usuarioId});

        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();
    } else {
        let produto = ({ id: idx, nome, preco, prime});

        atualizarProduto(idx, produto);
        preencherTabela();
        form.reset();
        idx = 'novo';
    }

}
//preenchimento da tabela com os produtos cadastrados
const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for (const produto of produtos) {
        if(produto.usuarioId === usuarioId){
        tabela.innerHTML += `
            <tr>
                <th scope="row">${produto.id}</th>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.prime ? "Sim" : "Não"}</td>
                <td>
                <i class="fa-solid fa-trash" onclick="removerProduto(${produto.id})"></i>
                <i class="fa-solid fa-pen-to-square" onclick="editarProduto(${produto.id})"/></i>
                    
                </td>
            </tr>
        
        `;
    }
}
}
const removerProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    console.log(produtos[indexProduto]);
    if (indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert('Produto removido')
    preencherTabela();
}



const editarProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id)
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.checked = produtos[indexProduto].prime;
    idx = id;
}

const atualizarProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id);
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos);
}

//eventos
form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarProduto)
document.addEventListener('DOMContentLoaded', preencherTabela);

let sair = document.querySelector('#sair');

sair.addEventListener('click', function(){
    saindo()
});

function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");

    window.location.href = "home.html";
} 

document.queryCommandValue("sair").addEventListener('cick', (evento)=>{
    evento.preventDefault();
    location.href = "home.html";
})
