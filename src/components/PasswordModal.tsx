// components/PasswordModal.tsx
import React, { useState } from "react";
import { Modal, Input, message } from "antd";

interface PasswordModalProps {
  visible: boolean;
  onAuthenticate: (authenticated: boolean) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  visible,
  onAuthenticate,
}) => {
  const [password, setPassword] = useState("");

  const handleOk = () => {
    const correctPassword = "1234"; // Aquí puedes definir la contraseña correcta

    if (password === correctPassword) {
      onAuthenticate(true);
      message.success("Autenticación exitosa");
    } else {
      message.error("Contraseña incorrecta");
    }
  };

  const handleCancel = () => {
    onAuthenticate(false);
  };

  return (
    <Modal
      title="Ingrese su contraseña"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <Input.Password
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Modal>
  );
};

export default PasswordModal;
