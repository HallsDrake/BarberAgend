var lembretesSelecionados = [];

//Função para deletar os lembretes
function deletarLembrete() {
    //Verifica se há algum selecionado ou não
    if (lembretesSelecionados.length > 0) {
        var lembretesExistentes = localStorage.getItem("lembretes");
        if (lembretesExistentes != null || lembretesExistentes != "") {
            var lembretesRecuperados = JSON.parse(lembretesExistentes);
            for (var i = 0; i < lembretesSelecionados.length; i++) {
                for (var j = 0; j < lembretesSelecionados.length; j++) {
                    if (lembretesSelecionados[i] == lembretesRecuperados[j].id) {
                        lembretesRecuperados[j].id = -1;
                    }
                }
            }
            var lembreteTemporario = [];
            for (var i = 0; i < lembretesRecuperados.length; i++) {
                if (lembretesRecuperados[i].id != -1) {
                    lembreteTemporario.push(lembretesRecuperados[i]);
                }
            }

            //Deleta efetivamente do LocalStoarege
            if (lembreteTemporario.length == 0) {
                localStorage.setItem("lembretes", "");
            } else {
                salvarLembretes(lembreteTemporario);
            }

            mostrarLembrete();
            selecionarLembrete();
        }
    }
}

//Função para verificar se há texto digitado. 
function textoValido(texto) {
    if (texto == null || texto == "" || texto.lenght < 1) {
        return false;
    } else {
        return true;
    }
}

//Função para exibir os erros

function mostraErro() {
    var html = "";
    html += '<div class="alert alert-danger" role="alert">';
    html += 'Por favor, preencha todos os campos';
    html += '</div>';

    document.getElementById('error').innerHTML = html;
}

//Função para limpar os erros na tela

function limparErro() {
    document.getElementById('error').innerHTML = "";
}

//Função para criar um lembrete
function criarLembrete() {
    var conteudoNome = document.getElementById("nome").value,
        conteudoTelefone = document.getElementById("telefone").value,
        conteudoData = document.getElementById("data").value,
        conteudoServico = document.getElementById("servico").value;

    if (!textoValido(conteudoNome) || !textoValido(conteudoData) || !textoValido(conteudoServico) || !textoValido(conteudoTelefone)) {
        mostraErro();
        return;
    }

    limparErro();


    //Criar as variaveis para setar o lembrete que foi criado
    var referencia = new Date();
    var id = referencia.getTime();
    var dataAtual = referencia.toLocaleDateString();
    var nome = conteudoNome;
    var telefone = conteudoTelefone;
    var data = conteudoData;
    var servico = conteudoServico;

    //JSON =  notação de objetos JS
    var lembrete = {
        "id": id,
        "dataAtual": dataAtual,
        "nome": nome,
        "telefone": telefone,
        "data": data,
        "servico": servico
    };
    comprovarLembrete(lembrete);

    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("data").value = "";
    document.getElementById("servico").value = "";

}

//função para Validar lembrete
function lembreteValido(lembretesExistentes) {
    if (lembretesExistentes == null || lembretesExistentes == "" || lembretesExistentes == "undefined" || typeof lembretesExistentes == "") {
        return false;
    } else {
        return true;
    }
}

// Função para comprovar se existe lembretes

function comprovarLembrete(lembrete) {
    var lembretesExistentes = localStorage.getItem("lembretes");
    if (!lembreteValido(lembretesExistentes)) {
        var lembretes = [];
        lembretes.push(lembrete);

        salvarLembretes(lembretes);

    } else {
        var lembretesRecuperados = JSON.parse(lembretesExistentes);

        lembretesRecuperados.push(lembrete);
        salvarLembretes(lembretesRecuperados);
    }

    mostrarLembrete();
}

//Função para selecionar o que deletar
function selecionarLembrete() {
    var lembretes = document.getElementsByClassName("lembrete");
    for (var i = 0; i < lembretes.length; i++) {
        document.getElementById(lembretes[i].id).onclick = function(e) {
            e.stopPropagation();

            if (lembretesSelecionados.indexOf(this.id) == -1) {
                this.style.backgroundColor = "#FF6347";
                lembretesSelecionados.push(this.id);
            } else {
                this.style.backgroundColor = "#fff";
                for (var b = 0; b < lembretesSelecionados.length; b++) {
                    if (lembretesSelecionados[b] == this.id) {
                        lembretesSelecionados[b] = 0;
                    }
                }
            }

            var lembreteTemporario = [];
            for (var j = 0; j < lembretesSelecionados.length; j++) {
                if (lembretesSelecionados[j] != 0) {
                    lembreteTemporario.push(lembretesSelecionados[j]);
                }
            }
            lembretesSelecionados = lembreteTemporario;
        };
    }
}

//Função para salvar lembretes
function salvarLembretes(lembretes) {
    var lembretesJSON = JSON.stringify(lembretes);
    localStorage.setItem("lembretes", lembretesJSON);
}

//Funçao para exibição dos itens

function mostrarLembrete() {
    var html = "";

    var lembretesExistentes = localStorage.getItem("lembretes");
    if (!lembreteValido(lembretesExistentes)) {
        html = "Não existe nenhum lembrete a ser mostrado";
        document.getElementById("lembretes").innerHTML = html;
    } else {
        var lembretesRecuperados = JSON.parse(lembretesExistentes);

        for (var i = 0; i < lembretesRecuperados.length; i++) {
            html += formatarLembrete(lembretesRecuperados[i]);
        }
        document.getElementById("lembretes").innerHTML = html;
    }
}

//Função para exibição os lembretes
function formatarLembrete(lembrete) {
    var html = "";
    html += '<div class="lembrete" id=' + lembrete.id + '>';
    html += '<div class="row">';
    html += '<div class="col-6 text-left">';
    html += '<big>' + lembrete.dataAtual + '</big>';
    html += '</div>';
    html += '</div>';
    html += '<br>';
    html += '<div class="row">';
    html += '<div class="col-12">';
    html += 'Cliente: ' + lembrete.nome;
    html += '<br>';
    html += 'Telefone: ' + lembrete.telefone;
    html += '<br>';
    html += 'Data: ' + lembrete.data;
    html += '<br>';
    html += 'Serviço: ' + lembrete.servico;
    html += '<br>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<br>';

    return html;
}

//Verificar se a DOM do código está operando 100%
document.addEventListener('DOMContentLoaded', function() {
    console.log("Tudo certo");
    //mostraErro();

    document.getElementById("salvar").onclick = criarLembrete;
    document.getElementById("deletar").onclick = deletarLembrete;

    mostrarLembrete();
    selecionarLembrete();
});