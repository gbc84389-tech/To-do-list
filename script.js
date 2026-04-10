const buttonadd = document.getElementById("buttonadd");

//Exibe tudo quando a pagina e carregada
window.addEventListener("load", () => {
    let tarefas = JSON.parse(localStorage.getItem("Tarefas")) || [];
    tarefas.forEach(tarefa => {
        CriarElementoTarefa(tarefa);
    });
})

buttonadd.addEventListener("click", () => {
    console.log("clicou");
    let tarefa = document.getElementById("inputtarefa").value;
    //pega o input do usuario
    let tarefas = JSON.parse(localStorage.getItem("Tarefas")) || [];
    //acessa o local storage com o nome Tarefas
    tarefas.push(tarefa);
    //"empurra a entrada do usuario pra dentro do array JSON"
    localStorage.setItem("Tarefas", JSON.stringify(tarefas));
    //setItem coloca o item dentro do local storage Tarefas
    alert("Tarefa adicionada com sucesso");
    document.getElementById("inputtarefa").value = "";
    CriarElementoTarefa(tarefa);
})

function CriarElementoTarefa(tarefa) {
    ///////////////////Criar o elemento na lista/////////////////////
    const lista = document.getElementById("lista");

    //cria o container de cada tarefa
    const containertarefa = document.createElement("div");
    containertarefa.classList.add("container-tarefa");

    //cria a checkbox
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.classList.add("input-checkbox");

    //cria o span da tarefa
    const span = document.createElement("span");
    span.classList.add("span-tarefa");
    span.textContent = tarefa;

    //cria o botao editar
    const buttonEditar = document.createElement("button");
    buttonEditar.classList.add("button-editar-tarefa");
    buttonEditar.textContent = "Editar";

    //cria o botao excluir
    const buttonExcluir = document.createElement("button");
    buttonExcluir.classList.add("button-excluir-tarefa");
    buttonExcluir.textContent = "Excluir";

    //funcao do botao editar
    buttonEditar.addEventListener("click", ()=> {
        //pede uma edicao de texto pro usuario o mostrando em forma de prompt
        let novoTexto = prompt("Edite a tarefa: ", span.textContent);
        //se cumprir os requisitos ele adiciona o novo texto na string
        if(novoTexto !== null && novoTexto.trim() !== ""){
            let tarefa = JSON.parse(localStorage.getItem("Tarefas")) || [];

            let index = tarefa.indexOf(span.textContent);

            if(index !== -1) {
                tarefa[index] = novoTexto;
            }

            localStorage.setItem("Tarefas", JSON.stringify(tarefa));

            span.textContent = novoTexto;
        }
    })

    //funcao do botao excluir
    buttonExcluir.addEventListener("click", ()=> {
        //remove a tarefa da tela, no caso apaga a div mas ainda nao do localstorage
        containertarefa.remove();
        //acessa o localstora
        let tarefas = JSON.parse(localStorage.getItem("Tarefas")) || [];
        //filter percorre o local storage ate um valor t, se for igual, ele apaga do localstorage
        //trim remove espacos desnecessarios de palavras
        tarefas = tarefas.filter(t => t.trim() !== span.textContent.trim());
        //retorna o localstorage Tarefas com as strings nos locais
        localStorage.setItem("Tarefas", JSON.stringify(tarefas));
        //mostra um alerta de tarefa excluida
        alert("Tarefa excluida com sucesso");
    })
    
    //adiciona todos os elementos na tarefa
    containertarefa.appendChild(checkbox);
    containertarefa.appendChild(span);
    containertarefa.appendChild(buttonEditar);
    containertarefa.appendChild(buttonExcluir);
    //adiciona eles no container da lista
    lista.appendChild(containertarefa);
}