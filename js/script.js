//PEGANDO ELEMENTOS DO DOM
const formVeiculos = document.querySelector('#form-veiculos')
const btnEnviar = document.querySelector('#btn-enviar')
const btnLimpar = document.querySelector('#btn-limpar')

//ARRAY VEICULOS
veiculos = []

//CAPTURANDO O EVENTO DO SUBMIT
formVeiculos.addEventListener('submit',  (evt) => {
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

const cadastroVeiculo = (objVeiculo) => {
    if(objVeiculo !== null){
        veiculos.push(objVeiculo)
    }
}
