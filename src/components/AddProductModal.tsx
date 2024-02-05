// components/AddProductModal.tsx
import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { productosApi } from '../api/productosApi';

interface AddProductModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (values: any) => Promise<void>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ visible, onCancel, onAdd }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await onAdd(values);
            form.resetFields();
        } catch (error) {
            console.error('Error al validar campos del formulario:', error);
        }
    };

    return (
        <Modal
            title="Agregar Producto"
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
            destroyOnClose
            okButtonProps={{className: "bg-blue-600"}}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Marca" name="marca" rules={[{ required: true, message: 'Por favor, ingrese la marca' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Labrado" name="labrado" rules={[{ required: true, message: 'Por favor, ingrese el labrado' }]}>
                    <Input />
                </Form.Item>
                {/* Agrega Form.Item para otros campos del nuevo producto */}
            </Form>
        </Modal>
    );
};

export default AddProductModal;
