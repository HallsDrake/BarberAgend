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
    html += 'Por favor, insira um valor válido';
    html += '</div>';

    document.getElementById('error').innerHTML = html;
}

//Função para limpar os erros na tela

function limparErro() {
    document.getElementById('error').innerHTML = "";
}

//Função para criar um lembrete
function criarLembrete() {
    var conteudoTextArea = document.getElementById("texto").value;
    if (!textoValido(conteudoTextArea)) {
        mostraErro();
        return;
    }

    limparErro();


    //Criar as variaveis para setar a data que o lembrete foi feito
    var referencia = new Date();
    var id = referencia.getTime();
    var data = referencia.toLocaleDateString();
    var texto = conteudoTextArea;

    //JSON =  notação de objetos JS
    var lembrete = {
        "id": id,
        "data": data,
        "texto": texto
    };
    comprovarLembrete(lembrete);

    document.getElementById("texto").value = "";
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
                this.style.backgroundColor = "red";
                lembretesSelecionados.push(this.id);
            } else {
                this.style.backgroundColor = "green";
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
    html += '<small>' + lembrete.data + '</small>';
    html += '</div>';
    html += '<div class="col-6 text-right">';
    html += '</div>';
    html += '</div>';
    html += '<br>';
    html += '<div class="row">';
    html += '<div class="col-12">';
    html += lembrete.texto;
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

    document.getElementById("buttonSave").onclick = criarLembrete;
    document.getElementById("buttonDelete").onclick = deletarLembrete;

    mostrarLembrete();
    selecionarLembrete();
});