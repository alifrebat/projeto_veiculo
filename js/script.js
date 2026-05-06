//PEGANDO ELEMENTOS DO DOM
const formVeiculos = document.querySelector('#form-veiculos')
const divListarVeiculo = document.querySelector('#div-veiculo')
const btnEnviar = document.querySelector('#btn-enviar')
const btnLimpar = document.querySelector('#btn-limpar')

//ARRAY VEICULOS
veiculos = []

//CAPTURANDO O EVENTO DO SUBMIT
formVeiculos.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const objFrmVeiculo = new FormData(formVeiculos)

    const idsession = sessionStorage.getItem('idSessionVeiculo') === null ? 0 : sessionStorage.getItem('idSessionVeiculo')

    veiculo = {
        idVeiculo: idsession,
        modelo: objFrmVeiculo.get('modelo'),
        marca: objFrmVeiculo.get('marca'),
        placa: objFrmVeiculo.get('placa'),
        ano: objFrmVeiculo.get('ano'),
        valor: objFrmVeiculo.get('valor'),
        tipoCombustivel: objFrmVeiculo.get('tpCombustivel')
    }

    cadastroVeiculo(veiculo)

    formVeiculos.reset()

})

//CAPTURANDO O EVENTO RESET
formVeiculos.addEventListener('reset', () => {
    sessionStorage.removeItem('idSessionVeiculo')
    document.querySelector('#btn-enviar').innerHTML = 'Cadastrar'

})

//ADICIONANDO ELEMENTO NO ARRAY
const cadastroVeiculo = (objVeiculo) => {
    if (objVeiculo !== null) {
        veiculos.push(objVeiculo)
    }

    listarVeiculos()
}

//LISTANDO OS ELEMENTOS DO ARRAY
const listarVeiculos = () => {
    divListarVeiculo.innerHTML = ''

    let vlrSeguro = 0.0
    let vlrIpva = 0.0
    let idadeVeiculo = 0.0

    veiculos.forEach((elem, i) => {

        vlrSeguro = parseFloat(elem.valor) * 0.10

        vlrIpva = elem.tipoCombustivel === 'G' ? parseFloat(elem.valor) * 0.20 : elem.tipoCombustivel === 'E' ? parseFloat(elem.valor) * 0.15 : elem.tipoCombustivel === 'B' ? parseFloat(elem.valor) * 0.10 : elem.tipoCombustivel === 'H' ? parseFloat(elem.valor) * 0.08 : parseFloat(elem.valor) * 0.02

        idadeVeiculo = calcIdade(elem.ano)

        vlrIpva = idadeVeiculo > 20 ? 0 : vlrIpva

        const divVeiculo = document.createElement('div')
        divVeiculo.setAttribute('class', `veiculo ${vlrIpva === 0 ? 'isento' : ''} `)
        divVeiculo.innerHTML = `<span class="txt"> ${elem.modelo} </span> <span class="txt"> ${elem.marca} </span> <span class="txt alg"> ${elem.placa} </span> <span class="txt alg"> ${idadeVeiculo}anos </span> <span class="vlr"> R$ ${parseFloat(vlrSeguro).toFixed(2).replaceAll('.', ',')} </span> <span class="vlr">  ${vlrIpva > 0 ? 'R$ ' + parseFloat(vlrIpva).toFixed(2).replaceAll('.', ',') : 'Isento'} </span> <span class="vlr"> R$ ${parseFloat(vlrSeguro + vlrIpva).toFixed(2).replaceAll('.', ',')} </span>`


        const imgAlterar = document.createElement('img')
        imgAlterar.setAttribute('src', 'imagens/btn_alterar.png')
        imgAlterar.setAttribute('alt', 'Alterar')
        imgAlterar.setAttribute('title', 'Alterar')

        imgAlterar.addEventListener('click', () => {
            carregaForm(elem)
            sessionStorage.setItem('idSessionVeiculo', elem.idVeiculo)
            document.querySelector('#btn-enviar').innerHTML = 'Alterar'
            window.location.href = '#cabecalho'

        })

        const spanImgAlterar = document.createElement('span')
        spanImgAlterar.appendChild(imgAlterar)

        const imgExcluir = document.createElement('img')
        imgExcluir.setAttribute('src', 'imagens/btn_excluir.png')
        imgExcluir.setAttribute('alt', 'Excluir')
        imgExcluir.setAttribute('title', 'Excluir')

        imgExcluir.addEventListener('click', () => {
            alert(`Em construção ${elem.idVeiculo}`)
        })

        const spanImgExcluir = document.createElement('span')
        spanImgExcluir.appendChild(imgExcluir)

        divVeiculo.appendChild(spanImgAlterar)
        divVeiculo.appendChild(spanImgExcluir)

        divListarVeiculo.appendChild(divVeiculo)
    });
}

//CALCULANDO A IDADE
const calcIdade = (ano) => {

    const hoje = new Date()

    let idade = hoje.getFullYear() - ano

    return idade
}

//ALTERAR
const carregaForm = (objVeiculo) => {
    document.querySelector('#modelo').value = objVeiculo.modelo
    document.querySelector('#marca').value = objVeiculo.marca
    document.querySelector('#placa').value = objVeiculo.placa
    document.querySelector('#ano').value = objVeiculo.ano
    document.querySelector('#valor').value = objVeiculo.valor
    document.querySelector('#valor').value = objVeiculo.valor

    objVeiculo.tipoCombustivel === 'G' ? document.querySelector('#gasolina').checked = true : objVeiculo.tipoCombustivel === 'E' ? document.querySelector('#etanol').checked = true : objVeiculo.tipoCombustivel === 'B' ? document.querySelector('#bicombustivel').checked = true : objVeiculo.tipoCombustivel === 'H' ? document.querySelector('#hibrido').checked = true : document.querySelector('#hibrido').checked = true
}