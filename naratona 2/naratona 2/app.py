from flask import Flask, render_template, jsonify, request

app = Flask(__name__)


@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/calcular", methods=["POST"])
def calcular():
    dados = request.json

    # Dados da publicação
    assunto = dados.get("assunto", "").strip()
    interesse_assunto = dados.get("interesseAssunto", "").strip()

    # Sinais de interação
    curtidas = int(dados.get("curtidas", 0))
    comentarios = int(dados.get("comentarios", 0))
    compartilhamentos = int(dados.get("compartilhamentos", 0))
    visualizacao = int(dados.get("visualizacao", 0))
    interesse = int(dados.get("interesse", 0))

    # Pontuação de cada sinal
    pontos_curtidas = curtidas * 1
    pontos_comentarios = comentarios * 3
    pontos_compartilhamentos = compartilhamentos * 4
    pontos_visualizacao = visualizacao * 2
    pontos_interesse = interesse * 5

    # Verifica se o assunto combina com o interesse
    pontos_assunto = 0
    assunto_combina = False

    if assunto and interesse_assunto:
        if assunto.lower() == interesse_assunto.lower():
            pontos_assunto = 30
            assunto_combina = True

    # Pontuação total
    pontuacao = (
        pontos_curtidas
        + pontos_comentarios
        + pontos_compartilhamentos
        + pontos_visualizacao
        + pontos_interesse
        + pontos_assunto
    )

    # Classificação
    if pontuacao >= 80:
        classificacao = "Muito relevante"
        explicacao = (
            "Nesta simulação, a publicação recebeu muitos sinais positivos "
            "e combina com o interesse do usuário. Por isso, teria uma "
            "pontuação alta."
        )

    elif pontuacao >= 50:
        classificacao = "Relevante"
        explicacao = (
            "A publicação possui vários sinais de interesse. "
            "O sistema poderia dar mais prioridade a esse conteúdo."
        )

    elif pontuacao >= 25:
        classificacao = "Interesse moderado"
        explicacao = (
            "A publicação possui alguns sinais de interesse, "
            "mas sua pontuação ainda é moderada."
        )

    else:
        classificacao = "Baixa relevância"
        explicacao = (
            "Nesta simulação, existem poucos sinais indicando "
            "que o usuário teria interesse nesse conteúdo."
        )

    return jsonify({
        "pontuacao": pontuacao,
        "classificacao": classificacao,
        "explicacao": explicacao,

        "assunto": assunto,
        "interesseAssunto": interesse_assunto,
        "assuntoCombina": assunto_combina,

        "detalhes": {
            "curtidas": pontos_curtidas,
            "comentarios": pontos_comentarios,
            "compartilhamentos": pontos_compartilhamentos,
            "visualizacao": pontos_visualizacao,
            "interesse": pontos_interesse,
            "assunto": pontos_assunto
        }
    })


if __name__ == "__main__":
    app.run(debug=True)