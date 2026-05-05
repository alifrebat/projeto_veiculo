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

    const idsession = sessionStorage.getItem('idsessionveiculo') === null ? 0 : sessionStorage.getItem('idsessionveiculo')

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

    console.log(veiculos.length)

    formVeiculos.reset()

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

    veiculos.forEach((elem, i) => {

        vlrSeguro = parseFloat(elem.valor) * 0.10

        vlrIpva = elem.tipoCombustivel === 'G' ? parseFloat(elem.valor) * 0.20 : elem.tipoCombustivel === 'E' ? parseFloat(elem.valor) * 0.15 : elem.tipoCombustivel === 'B' ? parseFloat(elem.valor) * 0.10 : elem.tipoCombustivel === 'H' ? parseFloat(elem.valor) * 0.08 : parseFloat(elem.valor) * 0.02


        const divVeiculo = document.createElement('div')
        divVeiculo.setAttribute('class', 'veiculo')
        divVeiculo.innerHTML = `<span class="txt"> ${elem.modelo} </span> <span class="txt"> ${elem.marca} </span> <span class="txt alg"> ${elem.placa} </span> <span class="txt alg"> ${elem.ano}anos </span> <span class="vlr"> R$ ${parseFloat(vlrSeguro).toFixed(2).replaceAll('.',',') } </span> <span class="vlr"> R$ ${parseFloat(vlrIpva).toFixed(2).replaceAll('.',',') } </span> <span class="vlr"> R$ ${parseFloat(vlrSeguro + vlrIpva).toFixed(2).replaceAll('.',',')} </span>`

        
        const imgAlterar = document.createElement('img')
        imgAlterar.setAttribute('src', 'imagens/btn_alterar.png')
        imgAlterar.setAttribute('alt', 'Alterar')
        imgAlterar.setAttribute('title', 'Alterar')
        
        imgAlterar.addEventListener('click', () => {
            alert(`Em construção ${elem.idVeiculo}`)
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
