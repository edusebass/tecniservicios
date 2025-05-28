// components/AddProductModal.tsx
import React, { useState } from 'react';
import { Form, Input, InputNumber, Modal, message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface AddProductModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (values: any) => Promise<void>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ visible, onCancel, onAdd }) => {
    const [buttonOK, setbuttonOK] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    // Cloudinary config desde .env
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            setImageUrl(data.secure_url);
            form.setFieldsValue({ linkimg: data.secure_url });
            message.success('Imagen subida correctamente');
        } catch (error) {
            message.error('Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    const handleOk = async () => {
        setbuttonOK(true);
        try {
            const values = await form.validateFields();
            if (values.alto === undefined || values.alto === '') {
                values.alto = null;
            }
            await onAdd(values);
            form.resetFields();
            setImageUrl('');
        } catch (error: any) {
            message.error(error);
        } finally {
            setbuttonOK(false);
        }
    };

    const handleInputChange = (fieldName: any, e: any) => {
        form.setFieldsValue({ [fieldName]: e.target.value.toUpperCase() });
    };

    return (
        <Modal
            title="Agregar Producto"
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
            destroyOnClose
            okButtonProps={{ className: "bg-blue-600", loading: buttonOK || uploading }}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Marca" name="marca" required>
                    <Input onChange={(e) => handleInputChange('marca', e)} />
                </Form.Item>
                <Form.Item label="Labrado" name="labrado" required>
                    <Input onChange={(e) => handleInputChange('labrado', e)} />
                </Form.Item>
                <Form.Item label="Caracteristicas" name="caracteristicas">
                    <Input onChange={(e) => handleInputChange('caracteristicas', e)} />
                </Form.Item>
                <section className='flex items-center justify-between gap-9'>
                    <Form.Item label="Ancho" name="ancho" rules={[{ pattern: /^\d+$/, message: 'Ingresa solo números' }]} required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Alto" name="alto" rules={[{ pattern: /^\d+$/, message: 'Ingresa solo números' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Rin" name="rin" rules={[{ pattern: /^\d+$/, message: 'Ingresa solo números' }]} required>
                        <Input />
                    </Form.Item>
                </section>
                <section className='flex items-center justify-start gap-10'>
                    <Form.Item label="Costo" name="costo" rules={[{ pattern: /^\d+(\.\d+)?$/, message: 'Ingresa números o números decimales con punto' }]} required>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item label="PVP" name="pvp" rules={[{ pattern: /^\d+(\.\d+)?$/, message: 'Ingresa números o números decimales con punto' }]} required>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item label="Cantidad" name="cantidad" rules={[{ pattern: /^\d+(\.\d+)?$/, message: 'Ingresa números o números decimales con punto' }]} required>
                        <InputNumber min={1} />
                    </Form.Item>
                </section>
                <Form.Item label="Imagen" required>
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={file => {
                            handleImageUpload(file);
                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />} loading={uploading}>
                            Subir o tomar foto
                        </Button>
                    </Upload>
                    {imageUrl && (
                        <img src={imageUrl} alt="preview" style={{ width: 120, marginTop: 10 }} />
                    )}
                </Form.Item>
                <Form.Item label="Linkimg" name="linkimg" required>
                    <Input value={imageUrl} readOnly />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProductModal;
