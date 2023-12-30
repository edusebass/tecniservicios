import { FormEvent, useState } from 'react';
import { Button ,message } from 'antd'

const SendEmailForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    console.log(formData)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        console.log("JSON Data to be sent:", JSON.stringify(formData));
        
        const response = await fetch('https://backendportafolio-3zy0.onrender.com/send-email', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if(response.status){
            message.success("Email enviado exitosamente")
            setLoading(false)
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit} className='mx-60 mt-28'>
                <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                        <label className="pb-1 text-xs uppercase tracking-wider"></label>
                        <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nombre del cliente..."
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                        <label className="pb-1 text-xs uppercase tracking-wider"></label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Direccion email, gmail, etc..."
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mx-0 mb-1 sm:mb-4">
                    <label className="pb-1 text-xs uppercase tracking-wider "></label>
                    <textarea
                        id="message"
                        name="message"  
                        placeholder="Escribe un mensaje..."
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        onChange={handleChange}  
                    ></textarea>
                </div>
                <div className="text-center">   
                    <Button 
                        type='primary' 
                        htmlType='submit' 
                        loading={loading} 
                        className=' w-full bg-blue-800 text-white  font-xl rounded-md sm:mb-0"'>
                        Enviar mensaje
                    </Button>
                </div>
            </form>
        </>
    );
};

export default SendEmailForm;
