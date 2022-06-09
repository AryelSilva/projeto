document.querySelector('#cadastro').addEventListener('click', (w) =>{
    w.preventDefault();
    let email = document.querySelector('#login').value;
    let senha = document.querySelector('#senha').value;

    salvar(email, senha);
});


function salvar(e, s){
    // verifica se tem dados no localstorage, senao, cria um evento vazio
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    // criando objeto
    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s
    }
    // jogando o objeto usuario dentro do vetor
    db.push(usuario);
    // salva no localstorage agora um vetor que pode receber varios objetos 
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'home.html';

}