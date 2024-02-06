// components/AddProductModal.tsx
import React from 'react';
import { Form, Input, Modal } from 'antd';

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
                <Form.Item label="Marca" name="marca">
                    <Input />
                </Form.Item>
                <Form.Item label="Labrado" name="labrado">
                    <Input />
                </Form.Item>
                <Form.Item label="Caracteristicas" name="caracteristicas">
                    <Input />
                </Form.Item>
                <Form.Item label="Alto" name="alto">
                    <Input />
                </Form.Item>
                <Form.Item label="Ancho" name="ancho">
                    <Input />
                </Form.Item>
                <Form.Item label="Rin" name="rin">
                    <Input />
                </Form.Item>
                <Form.Item label="Costo" name="costo">
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
