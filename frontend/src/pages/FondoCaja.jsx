import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Heading, Input } from "@chakra-ui/react"



export const FondoCaja = () => {

    const [fondo, setFondo] = useState('')
    const [errorInput, setErrorInput] = useState(false)

    const navigator = useNavigate()
    const regexFondo = /^[0-9]+$/


    const establecerFondo = (e) => {
        e.preventDefault();

        const regexValidation = regexFondo.test(fondo)

        if (fondo == '' || !regexValidation) {
            setErrorInput(true)
            return
        }

        setErrorInput(false)

        localStorage.setItem('FONDO_CAJA', fondo)
        navigator('/caja')
    }


    return (
        <main className='bg-gray-100 w-screen h-screen flex items-center'>
            <div className="container mx-auto">
                <div className="bg-white w-1/2 p-2 rounded-md shadow-lg flex flex-col gap-3 mx-auto">
                    <Heading fontSize={'x-large'} textAlign={'center'}>
                        Establezca el Fondo de Caja
                    </Heading>

                    <form className="flex flex-col gap-2" onSubmit={establecerFondo}>
                        <div className="">
                            <Input
                                placeholder={'Ej: 1200 , 350'}
                                background={'gray.100'}
                                borderColor={`${errorInput ? 'red' : 'gray.200'}`}
                                onChange={({ target }) => {
                                    setErrorInput(false)
                                    setFondo(target.value)
                                }}
                            />
                        </div>

                        <Button
                            type='submit'
                            colorScheme='blue'
                            width={'full'}
                        >
                            Establecer Fondo
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    )
}
