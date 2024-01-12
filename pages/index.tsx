import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'public/css/checkout.css'
import { CSSProperties, useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import img1 from '../public/images/evento-img.png'
import Image from 'next/image';
import axios from 'axios'


const createPaymentFormSchemaPix = z.object({
    name: z.string()
        .nonempty('Informe o seu nome para continuar.')
        .transform(name => {
            return name.trim().split(' ').map(word => {
                return word[0].toLocaleUpperCase().concat(word.substring(1))
            }).join(' ')
        }),
    email: z.string()
        .nonempty('Informe o seu e-mail para continuar.'),
    phone: z.string()
        .nonempty('Informe o seu telefone para continuar.')
        .min(10)
})

type CreatePaymentFormData = z.infer<typeof createPaymentFormSchemaPix>

export default function Checkout() {
    const router = useRouter();
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js")
    }, []);

    const [paymentMethod, setPaymentMethod] = useState('pix')
    const [qrCodeImage, setQrCodeImage] = useState(null)
    const [qrCode, setQrCode] = useState(null)
    const [copyQrCodeVisible, setCopyQrCodeVisible] = useState(false)


    const { register, handleSubmit, formState: { errors } } = useForm<CreatePaymentFormData>({
        resolver: zodResolver(createPaymentFormSchemaPix),
    });
    const doRequest = async (name: string, phone: string, email: string) => {
        // await axios.post('http://cfm-api.acutistecnologia.com/inscricao-tanouss', { name, phone, email })
        return await axios.post('http://cfm-api.acutistecnologia.com/cfm', { name, phone, email, event: 'Livres de Toda Maldição' })
    }


    async function createPayment(data: any) {
        const response = await doRequest(data.name, data.phone, data.email);
        if (response) {
            router.push("/confirm/pix_success?name=" + data.name + "&phone=" + data.phone + "&email=" + data.email);
        }
    }
    const imgStyle: CSSProperties = {
        width: 1080 * 0.25,
        height: 1350 * 0.25,
        borderRadius: 10,
        margin: 10
    }
    const titleStyle: CSSProperties = {
        margin: 10,
        marginBottom: 20,
        fontSize: 26,
        width: '100%',
        textAlign: 'center'
    }

    return (
        <main>
            <div className="container">
                <section className="checkout col-lg-10 mx-auto p-5 my-5">
                    <header className="checkout-header"></header>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Image style={imgStyle} src={img1} alt="qr_code" />
                    </div>
                    <div style={{ width: '100%', height: 2, backgroundColor: '#e3e3e3', marginTop: 10, marginBottom: 20 }}></div>
                    <div className="checkout-body">
                        <div style={titleStyle}>Inscrição no evento <strong>Livres de Toda Maldição</strong> com <strong>Roberto Tannus</strong> e <strong>Padre George Batista</strong></div>
                        <form onSubmit={handleSubmit(createPayment)}>
                            <div className="checkout-step ms-n1">
                                <div className="checkout-step-number">1</div>
                                <div className="checkout-step-text">Dados pessoais</div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-12">
                                    <label htmlFor="name">Nome Completo</label><br />
                                    <input
                                        type="text"
                                        {...register('name')}
                                        id="name"
                                        className="form-control checkout-input"
                                    />
                                    <i className="bi bi-person"></i>
                                    {errors.name && <div className="input-errors">{errors.name.message}</div>}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-12">
                                    <label htmlFor="name">E-mail</label><br />
                                    <input
                                        type="text"
                                        {...register('email')}
                                        id="email"
                                        className="form-control checkout-input"
                                    />
                                    <i className="bi bi-envelope"></i>
                                    {errors.email && <div className="input-errors">{errors.email.message}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="name">Celular com WhatsApp</label><br />
                                        <InputMask
                                            type="text"
                                            {...register('phone')}
                                            id="phone"
                                            className="form-control checkout-input"
                                            mask="(99) 9 9999-9999"
                                        />
                                        <i className="bi bi-whatsapp"></i>
                                        {errors.phone && <div className="input-errors">{errors.phone.message}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-step ms-n1 mt-4">
                                <div className="checkout-step-number">2</div>
                                <div className="checkout-step-text">Pagamento</div>
                            </div>
                            <ul className="nav nav-pills my-4" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button onClick={() => setPaymentMethod('pix')} className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                        <img src="https://pepper.com.br/checkout/assets/svg/pay-pix.svg" alt="" /><br />
                                        PIX
                                    </button>

                                </li>
                            </ul>
                            <div style={{ ...titleStyle, fontSize: 14 }}>Clique em <strong>CONFIRMAR INSCRIÇÃO</strong> para ver as informações de pagamento</div>
                            <button className="btn btn-primary btn-payment py-4 mt-4" type="submit">Confirmar inscrição</button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    )
}