document.querySelector('#logar').addEventListener('click', (e)=>{
    e.preventDefault();
    entrar()
})

function entrar(){
    //capturando os dados do login e senha 
    let usuario = document.querySelector('#login').value;
    let senha = document.querySelector('#senha').value;

    //vetor vazio
    let listaUser = [];

//crio um objeto vazio
    let usuarioValido = {
        login: '',
        senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem('usuarios'));

    //vai varrer todos os itens 
    listaUser.forEach(item=> {
        //capturar o usuario
        if(usuario.value === item.login && senha.value === item.senha){
            usuarioValido = {
                id: item.id,
                login: item.login,
                senha: item.senha
            }
        }
        
    })

     if (login === '' || senha === ''){
         alert('deu ruim')
     } else if (login != '' || senha !=''){
         alert('deu bom')
         window.location.href = 'tabela.html'
     }
        
    }

    function saveSession(data){
        if(saveSession){
            localStorage.setItem("session", JSON.stringify ,data);
        }

        sessionStorage.setItem("logado", JSON.stringify(data));
    }