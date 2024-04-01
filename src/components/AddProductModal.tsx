// components/AddProductModal.tsx
import React, { useState } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';

interface AddProductModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (values: any) => Promise<void>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ visible, onCancel, onAdd }) => {
    const [buttonOK, setbuttonOK] = useState(false)
    const [form] = Form.useForm();

    const handleOk = async () => {
        setbuttonOK(true)
        try {
            const values = await form.validateFields();
            console.log(values)
            await onAdd(values);
            form.resetFields();
        } catch (error) {
            console.error('Error al validar campos del formulario:', error);
        } finally {
            setbuttonOK(false)
        }
    };

    const handleInputChange = (fieldName: any, e:any) => {
        // Convierte el valor a mayúsculas y actualiza el estado del formulario
        form.setFieldsValue({ [fieldName]: e.target.value.toUpperCase() });
    };

    return (
        <Modal
            title="Agregar Producto"
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
            destroyOnClose
            okButtonProps={{className: "bg-blue-600", loading: buttonOK}}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Marca" name="marca" required>
                    <Input onChange={(e) => handleInputChange('marca', e)} />
                </Form.Item>
                <Form.Item label="Labrado" name="labrado" required>
                    <Input onChange={(e) => handleInputChange('labrado', e)}/>
                </Form.Item>
                <Form.Item label="Caracteristicas" name="caracteristicas" >
                    <Input onChange={(e) => handleInputChange('caracteristicas', e)}/>
                </Form.Item>
                <section className='flex items-center justify-between gap-9'>
                    <Form.Item label="Ancho" name="ancho" rules={[{ pattern: /^\d+$/, message: 'Ingresa solo números' }]} required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Alto" name="alto" rules={[{ pattern: /^\d+$/, message: 'Ingresa solo números' }]} required>
                        <Input /> 
                    </Form.Item>
                    
                    <Form.Item label="Rin" name="rin" rules={[{ pattern: /^\d+$/, message: 'Ingresa solo números' }]} required className='flex flex-row'>
                        <Input />
                    </Form.Item>
                </section>
                <section className='flex items-center justify-start gap-10'>
                    <Form.Item label="Costo" name="costo" rules={[{ pattern: /^\d+(\.\d+)?$/, message: 'Ingresa números o números decimales con punto' }]}
                        required
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item label="PVP" name="pvp" rules={[{ pattern: /^\d+(\.\d+)?$/, message: 'Ingresa números o números decimales con punto' }]}
                        required
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                    <Form.Item label="Cantidad" name="cantidad" rules={[{ pattern: /^\d+(\.\d+)?$/, message: 'Ingresa números o números decimales con punto' }]}
                            required
                        >
                        <InputNumber min={1}/>
                    </Form.Item>
                </section>
                <Form.Item label="Linkimg" name="linkimg" 
                    required
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item label="Cantidad" name="cantidad">
                    <Input />
                </Form.Item> */}
            </Form>
        </Modal>
    );
};

export default AddProductModal;
