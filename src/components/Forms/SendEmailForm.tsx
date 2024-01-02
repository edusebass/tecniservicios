import { FormEvent, useState } from 'react';
import { Button, message, Upload } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const SendEmailForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        file: undefined as File | undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (file: UploadFile<any>) => {
        setFormData({
        ...formData,
        file: file.originFileObj,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        console.log('JSON Data to be sent:', JSON.stringify(formData));

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        if (formData.file) {
            formDataToSend.append('file', formData.file);
        }

        setLoading(false)
        message.success("Factura enviada con exito")

        const response = await fetch('http://localhost:1000/send-email', {
            method: 'POST',
            body: formDataToSend,
        });

        console.log(response)
    };

    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
        authorization: 'authorization-text',
        },
        onChange: (info) => handleFileChange(info.file),
    };

    return (
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
            <Upload {...props}>
            <Button icon={<UploadOutlined />}>Subir factura</Button>
            </Upload>
        </div>
        <div className="text-center">
            <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className='w-full bg-blue-800 text-white font-xl rounded-md sm:mb-0"'
            >
            Enviar mensaje
            </Button>
        </div>
        </form>
    );
};

export default SendEmailForm;
