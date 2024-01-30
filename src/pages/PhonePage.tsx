import { useState } from 'react';
import { Input, Button } from 'antd';

const PhonePage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleInputChange = (e:any) => {
        setPhoneNumber(e.target.value);
    };

    const openWhatsAppChat = () => {
        // Verifica si el número de teléfono es válido (puedes agregar más validaciones según tus necesidades)
        if (phoneNumber) {
        const whatsappLink = `https://wa.me/+593${phoneNumber}`;
        window.open(whatsappLink, '_blank');
        } else {
        // Muestra un mensaje de error o realiza alguna acción en caso de que el número sea inválido o esté vacío
        console.error('Número de teléfono inválido');
        }
    };

    return (
        <>
        <div className="mx-32 mt-11">
            <Input placeholder="Ingrese su número de teléfono" onChange={handleInputChange} />
            <Button type="primary" className="bg-blue-900 mt-5" onClick={openWhatsAppChat}>
            Ir al chat
            </Button>
        </div>
        </>
    );
};

export default PhonePage;
