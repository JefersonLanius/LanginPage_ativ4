class Task {
    constructor(nome, descricao, nota){
        this.nome = nome
        this.descricao = descricao
        this.nota = nota

        console.log('entrou 2')
    }
}

class Database {
    constructor(){
        const id = localStorage.getItem('id')
        console.log('entrou')
        if(id === null){
            localStorage.setItem('id', 0)
            console.log('entrou')
        }
    }

    createAva(task) {
        
        const id = getNextId();
        localStorage.setItem(id, JSON.stringify(task))
        localStorage.setItem('id', id)
    }
    removeAva(id) {
        localStorage.removeItem(id)
    }

    searchAva(task) {
        let filteredTasks = Array()

        filteredTasks = this.loadAva()

        if(task !== '') {
            filteredTasks = filteredTasks.filter(t => t.nota === task)
        }

        return filteredTasks
    }

    CalcularMedia(){
        const tasks = Array()
        
        const id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            const task = JSON.parse(localStorage.getItem(i))

            if(task === null){
                continue
            }

            task.id = i
            tasks.push(task)
        }
        let tamanho = tasks.length

        const notasAva = tasks.map(function(tasks) {
            return Number(tasks.nota);
        });
        let soma = 0;
        for (let i = 0; i < notasAva.length; i++) {
             soma += notasAva[i]; 
        }
        return Number(soma / tamanho)
    }


    loadAva() {
        const tasks = Array()
        
        const id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            const task = JSON.parse(localStorage.getItem(i))

            if(task === null){
                continue
            }

            task.id = i
            tasks.push(task)
        }
        return tasks
    }
    
}

const database = new Database()

function loadAva(tasks) {
    const avalicacaoDoUsuario1 = document.getElementById('avalicacaoDoUsuario1')

    console.log(avalicacaoDoUsuario1.innerHTML)
    console.log(avalicacaoDoUsuario1.innerText)

    avalicacaoDoUsuario1.innerHTML = ' ';

    console.log(avalicacaoDoUsuario1.innerHTML)
    console.log(avalicacaoDoUsuario1.innerText)
    

    if(tasks === undefined){
        tasks = database.loadAva()
    }


    tasks.forEach((t) => {
        const nome        = document.getElementById('nome').value
        const descricao        = document.getElementById('descricao').value
        const nota        = document.getElementById('nota').value
        const novaImagem = document.createElement('img');
        const novaImagem2 = document.createElement('img');
        const novaImagem3 = document.createElement('img');
        const novaImagem4 = document.createElement('img');
        const novaImagem5 = document.createElement('img');
        const novaImagem6 = document.createElement('img');

        novaImagem.src = "./img/usuario.png";
        novaImagem2.src = "./img/estrela.png";
        novaImagem3.src = "./img/estrela.png";
        novaImagem4.src = "./img/estrela.png";
        novaImagem5.src = "./img/estrela.png";
        novaImagem6.src = "./img/estrela.png";

        const avaliacao = document.createElement('div')
        const div = document.createElement('div')

        const paragrafo = document.createElement('p');
        const texto = document.createTextNode(`${t.nome}`);
        paragrafo.appendChild(texto)
        paragrafo.className = 'nomeUsuario';
        div.appendChild(paragrafo);

        for(let i =1; i<=t.nota; i++){
            if(i === 1){
            div.appendChild(novaImagem2); 
            } else if(i ===2){
                div.appendChild(novaImagem3);  
            }else if(i ===3){
                div.appendChild(novaImagem4);  
            }else if(i ===4){
                div.appendChild(novaImagem5);  
            }else if(i ===5){
                div.appendChild(novaImagem6);  
            }
        }
    
        const paragrafoava = document.createElement('p');
        const textoava = document.createTextNode(`${t.descricao}`);
        paragrafoava.appendChild(textoava)
        paragrafoava.className = 'descAvaliacao';
        div.appendChild(paragrafoava);  
    
        const btn = document.createElement('button')
        btn.className = 'delete'
        btn.id = t.id
        btn.innerHTML = 'Excluir'
        btn.onclick = () => {
            const id = t.id
            console.log('Deletou')
            database.removeAva(id)

            loadAva()
        }
        div.appendChild (btn);
        avaliacao.className = 'avalicacaoDoUsuario';
        
        
        avaliacao.appendChild (novaImagem);
        avaliacao.appendChild (div);
        
        
        avalicacaoDoUsuario1.appendChild(avaliacao);

        console.log(avalicacaoDoUsuario1.innerHTML)
        console.log(avalicacaoDoUsuario1.innerText)

    })
    const notaMedia1 = document.getElementById('notaMedia');
    let notaMedia = 0;
    notaMedia = database.CalcularMedia()
    console.log(notaMedia)
    console.log(notaMedia)
    notaMedia = notaMedia > 0 ? notaMedia : 0;
    notaMedia1.innerHTML = `${notaMedia.toFixed(1)}/5`
}

function getNextId() {
    const nextId = localStorage.getItem('id')
    return parseInt(nextId) + 1;
}


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('form_contato');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Obrigado por entrar em contato! O quanto antes estaremos retornando sua mensagem.');
        contactForm.reset();
    });
});

function redirectToHome() {
    console.log("Deu certo")
    window.location.href = 'index.html'; 
}
function redirectToForm() {
   window.location.href = 'contato.html';
}
function redirectToAvaliacao() {
    window.location.href = 'avaliacoes.html';
}

function PubAvaliacao(){
    const nome        = document.getElementById('nome').value
    const descricao        = document.getElementById('descricao').value
    const nota        = document.getElementById('nota').value

    const task = new Task(nome, descricao, nota)

    database.createAva(task)
    const id = localStorage.getItem('id')

    const avalicacaoDoUsuario1 = document.getElementById('avalicacaoDoUsuario1')
    
    const novaImagem = document.createElement('img');
    const novaImagem2 = document.createElement('img');
    const novaImagem3 = document.createElement('img');
    const novaImagem4 = document.createElement('img');
    const novaImagem5 = document.createElement('img');
    const novaImagem6 = document.createElement('img');
    const notaMedia1 = document.getElementById('notaMedia');
    novaImagem.src = "./img/usuario.png";
    novaImagem2.src = "./img/estrela.png";
    novaImagem3.src = "./img/estrela.png";
    novaImagem4.src = "./img/estrela.png";
    novaImagem5.src = "./img/estrela.png";
    novaImagem6.src = "./img/estrela.png";

    console.log (nome, descricao,  nota);

    const avaliacao = document.createElement('div')
    const div = document.createElement('div')

    const paragrafo = document.createElement('p');
    const texto = document.createTextNode(`${nome}`);
    paragrafo.appendChild(texto)
    paragrafo.className = 'nomeUsuario';
    div.appendChild(paragrafo);

    for(let i =1; i<=nota; i++){
        if(i === 1){
        div.appendChild(novaImagem2); 
        } else if(i ===2){
            div.appendChild(novaImagem3);  
        }else if(i ===3){
            div.appendChild(novaImagem4);  
        }else if(i ===4){
            div.appendChild(novaImagem5);  
        }else if(i ===5){
            div.appendChild(novaImagem6);  
        }
    }

    const paragrafoava = document.createElement('p');
    const textoava = document.createTextNode(`${descricao}`);
    paragrafoava.appendChild(textoava)
    paragrafoava.className = 'descAvaliacao';
    div.appendChild(paragrafoava);  
    const btn = document.createElement('button')
    btn.className = 'delete'
    btn.id = id
    btn.innerHTML = 'Excluir'
    btn.onclick = () => {
        console.log('Deletou')
        database.removeAva(id)
        loadAva()
    }
   
    div.appendChild (btn);
    avaliacao.className = 'avalicacaoDoUsuario';
    
    
    avaliacao.appendChild (novaImagem);
    avaliacao.appendChild (div);
    
    
    avalicacaoDoUsuario1.appendChild(avaliacao);

    console.log(avalicacaoDoUsuario1.innerHTML)
    console.log(avalicacaoDoUsuario1.innerText)
    let notaMedia = 0;
    notaMedia = database.CalcularMedia()
    notaMedia = notaMedia > 0 ? notaMedia : 0;
    notaMedia1.innerHTML = `${notaMedia.toFixed(1)}/5`
}

function deletar(){
    const notaMedia1 = document.getElementById('notaMedia');
    console.log('Deletou')

    let notaMedia = 0;
    notaMedia = database.CalcularMedia()
    
    notaMedia = notaMedia > 0 ? notaMedia : 0;
    notaMedia1.innerHTML = `${notaMedia.toFixed(1)}/5`
}

function Filtrar(){
    const nota = document.getElementById('Nota').value;
    

    const tasks = database.searchAva(nota)

    loadAva(tasks)
}

function requisitar(url) {
    document.getElementById('body').innerHTML = ''

    let ajax = new XMLHttpRequest()
    ajax.open('GET', url)

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            
            document.getElementById('body').innerHTML = ajax.responseText

            if (document.body.contains(document.getElementById('avaliacoes'))) {
                loadAva();    
            }
        }
        if (ajax.readyState == 4 && ajax.status == 404) {
            document.getElementById('body').innerHTML = 'Requisição finalizada, porém o recurso não foi encontrado. Erro 404.'
        }
    }
    setTimeout(() => {
        ajax.send()
    }, 5)

    
}
document.addEventListener("DOMContentLoaded", () => {
    requisitar('./index.html')
    
})
