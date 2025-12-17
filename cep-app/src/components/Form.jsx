import { useState } from 'react'

const [cep, setCep] = useState('')
const [rua, setRua] = useState('')
const [bairro, setBairro] = useState('')
const [estado, setEstado] = useState('')
const [cidade, setCidade] = useState('')
const [erroCep, setErroCep] = useState('')

async function buscarCepApi(cep) {
    const resp = await fetch(`https://viacep.com.br/ws/|${cep}/json/`)
    if (resp.status === 200) {
        const end  = await resp.json()
        return end 
    }
}

async function handleChangeCep(event) {
    const cep = event.target.value
    setCep(cep)
    const end = await buscarCepApi(cep)

    if (cep.length === 8) {
        setCep(cep)
    }

}

function FormCep() {
    return (
        <div>
            <h1>Buscar Cep</h1>
            <form>
                <input placeholder='CEP' value={cep} onChange={handleChangeCep}/>
                { erroCep && (
                    <p>{erroCep}</p>
                ) 
                }
                <input placeholder='Rua' value={rua}/>
                <input />
                <input placeholder='Bairro' value={bairro}/>
                <input placeholder='Estado' value={estado}/>
                <input placeholder='Cidade' value={cidade}/>
            </form>
        </div>
    )
}

export default FormCep