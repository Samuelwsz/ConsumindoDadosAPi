/*
var consultaCep = fetch("https://viacep.com.br/ws/01001000/json/")
  .then((resposta) => resposta.json())
  .then((r) => {
    if (r.erro) {
      throw Error("Esse cep não existe")
    } else {
      console.log(r)
    }
  })
  .catch((erro) => console.log(erro))
  .finally(mensagem => console.log('Concluido'))*/

async function buscaEndereco(cep) {
  const mensagemErro = document.getElementById("erro")
  mensagemErro.innerHTML = ""
  try {
    const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const consultaCepConvertida = await consultaCep.json()
    if (consultaCepConvertida.erro) {
      throw Error("CEP não existente!")
    }
    const cidade = document.getElementById("cidade")
    const logradouro = document.getElementById("endereco")
    const estado = document.getElementById("estado")
    const bairro = document.getElementById("bairro")

    cidade.value = consultaCepConvertida.localidade
    logradouro.value = consultaCepConvertida.logradouro
    estado.value = consultaCepConvertida.uf
    bairro.value = consultaCepConvertida.bairro

    return consultaCepConvertida
  } catch (erro) {
    mensagemErro.innerHTML = `<p class="error">CEP inválido. Tente novamente!</p>`
  }
}

const cep = document.getElementById("cep")
cep.addEventListener("focusout", () => buscaEndereco(cep.value))

/*
let ceps = ["01001000", "01001001"]
let conjuntoCeps = ceps.map((valores) => buscaEndereco(valores))
Promise.all(conjuntoCeps).then((respostas) => console.log(respostas))*/
