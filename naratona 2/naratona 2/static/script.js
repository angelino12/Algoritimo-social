async function calcularAlgoritmo() {

    const assunto = document.getElementById("assunto").value.trim();

    const interesseAssunto =
        document.getElementById("interesseAssunto").value;

    const curtidas =
        Number(document.getElementById("curtidas").value);

    const comentarios =
        Number(document.getElementById("comentarios").value);

    const compartilhamentos =
        Number(document.getElementById("compartilhamentos").value);

    const visualizacao =
        Number(document.getElementById("visualizacao").value);

    const interesse =
        Number(document.getElementById("interesse").value);


    // Verifica se o usuário colocou um assunto

    if (assunto === "") {

        alert("Escreva seu assunto!");

        document.getElementById("assunto").focus();

        return;
    }


    // Impede números negativos

    if (
        curtidas < 0 ||
        comentarios < 0 ||
        compartilhamentos < 0 ||
        visualizacao < 0 ||
        interesse < 0
    ) {

        alert("Os valores não podem ser negativos!");

        return;
    }


    // Envia os dados para o Python

    const resposta = await fetch("/calcular", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            assunto: assunto,

            interesseAssunto: interesseAssunto,

            curtidas: curtidas,

            comentarios: comentarios,

            compartilhamentos: compartilhamentos,

            visualizacao: visualizacao,


        })

    });


    const resultado = await resposta.json();


    // Esconde a tela inicial

    document
        .getElementById("resultadoInicial")
        .classList.add("hidden");


    // Mostra resultado

    document
        .getElementById("resultadoFinal")
        .classList.remove("hidden");


    // Pontuação

    document.getElementById("pontuacao").textContent =
        resultado.pontuacao;


    // Classificação

    document.getElementById("classificacao").textContent =
        resultado.classificacao;


    // Explicação

    document.getElementById("explicacao").textContent =
        resultado.explicacao;


    // Assuntos

    document.getElementById("resultadoAssunto").textContent =
        resultado.assunto;


    document.getElementById("resultadoInteresse").textContent =
        resultado.interesseAssunto;


    // Correspondência

    const correspondencia =
        document.getElementById("correspondencia");


    if (resultado.assuntoCombina) {

        correspondencia.innerHTML =
            "✅ <strong>Os assuntos combinam!</strong> Nesta simulação, isso adicionou <strong>+30 pontos</strong>.";

        correspondencia.style.color = "#00e5ff";

    } else {

        correspondencia.innerHTML =
            "❌ <strong>Os assuntos não combinam.</strong> Nesta simulação, não foram adicionados pontos de correspondência.";

        correspondencia.style.color = "#aeb7c6";
    }


    // Detalhes da pontuação

    document.getElementById("pCurtidas").textContent =
        "+" + resultado.detalhes.curtidas;


    document.getElementById("pComentarios").textContent =
        "+" + resultado.detalhes.comentarios;


    document.getElementById("pCompartilhamentos").textContent =
        "+" + resultado.detalhes.compartilhamentos;


    document.getElementById("pVisualizacao").textContent =
        "+" + resultado.detalhes.visualizacao;


    document.getElementById("pInteresse").textContent =
        "+" + resultado.detalhes.interesse;


    document.getElementById("pAssunto").textContent =
        "+" + resultado.detalhes.assunto;

}
document.getElementById("executar").addEventListener("click", () => {
    // código para executar o algoritmo
});