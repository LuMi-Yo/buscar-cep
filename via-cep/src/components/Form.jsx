import { useState } from 'react'
import '../index.css'

export default function FormCep() {
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')
    const [erroCep, setErroCep] = useState('')
    const [temFocus, setTemFocus] = useState(true)

    async function buscarCepApi(cep) {
        const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        if (resp.status === 200) {
            const end  = await resp.json()
            const status = await resp.status
            return { end, status }
        }
    }
    async function handleChangeCep(event) {
        const cep = event.target.value
        setCep(cep)
        
        if (cep.length === 8) {
            const { end, status } = await buscarCepApi(cep)
            if (status === 200) {
                if (end && !end.erro) {
                setErroCep('')
                setRua(`${end.logradouro}`)
                setBairro(`${end.bairro}`)
                setEstado(`${end.uf}`)
                setCidade(`${end.localidade}`) 
            } else {
                onBlurCep()
            }
            }
        }

    }

    function handleClickCep () {
        setErroCep('')
        setTemFocus(true)
    }

    function onBlurCep() {
        const { end, status } = buscarCepApi(cep)
        if (cep.length === 8 && end.erro === true) {
            setErroCep('CEP inválido')
            setTemFocus(false)
        } else if (cep.length !== 8 ){
            setErroCep('CEP inválido')
            setTemFocus(false) 
        } else {
            setErroCep('')
            setTemFocus(true)
        }
    }

    return (
        <div className='flex justify-center flex-col font-sans'>
            <h1 className='flex justify-center font-extrabold text-[2rem] p-[5px]'>Buscar Cep</h1>
            <form className='flex justify-center flex-col mt-5'>

                <input placeholder='CEP' className={temFocus === false ? 'border-2 w-[450px] p-[5px] bg-red-200 border-red-500' : 'border-gray-300 border-2 w-[450px] p-[5px]'} maxLength={8} value={cep} onChange={handleChangeCep} onClick={handleClickCep} onBlur={onBlurCep}/>
                
                { erroCep && (
                    <div>
                        <p className='text-red-500 mt-[7px]'>{erroCep}</p>
                    </div>
                ) 
                }

                <input className='border-gray-300 border-2 w-[450px] mt-4 p-[5px]' placeholder='Rua' value={rua} />
                <input placeholder='Número' className='border-gray-300 border-2 w-[450px] mt-4 p-[5px]' />
                <input placeholder='Bairro' className='border-gray-300 border-2 w-[450px] mt-4 p-[5px]' value={bairro} />
                <input placeholder='Estado' className='border-gray-300 border-2 w-[450px] mt-4 p-[5px]' value={estado} />
                <input placeholder='Cidade' className='border-gray-300 border-2 w-[450px] mt-4 p-[5px]' value={cidade} />
            </form>
        </div>
    )
}
