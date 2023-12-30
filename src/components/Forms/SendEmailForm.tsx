import { FormEvent, useState } from 'react';
import { Button ,message, Upload, UploadFile } from 'antd'
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        }
    },
};
  

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
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
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
