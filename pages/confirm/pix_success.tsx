import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'public/css/checkout.css'

import { useEffect } from "react"
import { useRouter } from 'next/router';
import axios from 'axios';
import qr_code from '../../public/images/qr_code.png'
import Image from 'next/image';
import ClipboardJS from 'clipboard';

export default function Pix() {
    const router = useRouter();

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js")
    }, []);
    async function handleMove() {
        let text = "Olá! Gostaria de confirmar minha inscrição no evento. Meu nome é " + router.query.name + " e meu telefone é " + router.query.phone + "."
        router.push("https://wa.me/558396022155?text=" + text);
    }
    useEffect(() => {
        // Inicializar clipboard.js
        const clipboard = new ClipboardJS('.btn-clipboard', {
            text: function () {
                return "00020126560014br.gov.bcb.pix0114104414700001440216Encontro de cura520400005303986540530.005802BR5925FUNDACAO SAO PADRE PIO DE6011JOAO PESSOA62240520VivopelaMisericordia630450A8";
            }
        });

        clipboard.on('success', function (e) {
            alert('QR_CODE copiado para área de transferência');
            e.clearSelection();
        });

        // Limpar o evento para evitar vazamentos de memória
        return () => {
            clipboard.destroy();
        };
    }, []);

    return (
        <main style={{ overflowX: 'auto' }}>
            <div className="container">
                <section className="order col-lg-10 mx-auto p-5 my-5">
                    <h1 className="text-center">Siga os passos para confirmar sua inscrição:</h1>
                    <div className="row mb-3">
                        <div className="payment-step mb-3">
                            <span className="payment-step-number p-sm-4 p-lg-0">1</span>
                            <h2 className="payment-step-title">Copie o escaneie o código <strong>PIX</strong> abaixo:</h2>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Image className="qr_code" src={qr_code} alt="qr_code" />
                        </div>
                        <div style={{ height: 100, wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', fontSize: 12, overflow: 'clip' }} id="pix" className="form-control">00020126560014br.gov.bcb.pix0114104414700001440216Encontro de cura520400005303986540530.005802BR5925FUNDACAO SAO PADRE PIO DE6011JOAO PESSOA62240520VivopelaMisericordia630450A8</div>
                        <button type="button" className="btn btn-primary p-3 my-3 btn-clipboard">
                            <i className="bi bi-files"></i>
                            Copiar Código do PIX
                        </button>
                    </div>
                    <div className="row">
                        <div className="payment-step mb-3">
                            <span className="payment-step-number">2</span>
                            <h2 className="payment-step-title">Abra o aplicativo do seu <strong>Banco</strong></h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="payment-step mb-3">
                            <span className="payment-step-number">3</span>
                            <h2 className="payment-step-title">Na seção de PIX, selecione a opção <strong>"Pix Copia e Cola"</strong></h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="payment-step mb-3">
                            <span className="payment-step-number">4</span>
                            <h2 className="payment-step-title">Cole o código</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="payment-step mb-3">
                            <span className="payment-step-number">5</span>
                            <h2 className="payment-step-title">Envie o comprovante para nós</h2>
                        </div>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-success p-3" onClick={() => handleMove()}>
                            <i className="bi bi-check-circle"></i>
                            Já fiz o pagamento
                        </button>
                    </div>
                </section>
            </div>
        </main>
    )
}