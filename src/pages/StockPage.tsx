import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";
// import { SearchOutlined } from "@ant-design/icons";
import { productosApi } from "../api/productosApi";
import EditableCell from "../components/EditableCell";
import AddProductModal from "../components/AddProductModal";

interface Item {
  _id: string;
  marca: string;
  labrado: string;
  caracteristicas: string;
  alto: string;
  ancho: string;
  rin: string;
  costo: string;
  linkimg: string;
  cantidad: string;
  pvp: string;
}

const TableComponent: React.FC = () => {
  const originData: Item[] = [];
  const [loadingTable, setLoadingTable] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtros individuales
  const [filterValues, setFilterValues] = useState({
    ancho: "",
    alto: "",
    rin: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const isEditing = (record: Item) => editingKey === record._id;

  // Modal de contraseña
  const handlePasswordSubmit = (password: string) => {
    if (password === import.meta.env.VITE_PASS) {
      setIsPasswordModalVisible(false);
      localStorage.setItem("tecniservicios_auth", "ok"); // Guarda el acceso
      message.success("Contraseña correcta, puedes continuar.");
    } else {
      message.error("Contraseña incorrecta.");
    }
  };

  // Modal de agregar producto
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  // Fetch de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTable(true);
        const newData = await productosApi.listarProductos();
        const columnData = newData.map((item: Item) => ({
          _id: item._id,
          marca: item.marca,
          labrado: item.labrado,
          caracteristicas: item.caracteristicas,
          alto: item.alto ? item.alto : "",
          ancho: item.ancho,
          rin: item.rin,
          costo: item.costo,
          linkimg: item?.linkimg,
          cantidad: item.cantidad,
          pvp: item.pvp,
        }));

        originData.length = 0;
        originData.push(...columnData);
        setData([...columnData]);
        setLoadingTable(false);
      } catch (error) {
        console.log("Error al obtener datos:", error);
      }
    };

    fetchData();

    return () => {
      originData.length = 0;
    };
  }, []);

  // Si ya está autenticado, no mostrar el modal de contraseña
  useEffect(() => {
    if (localStorage.getItem("tecniservicios_auth") === "ok") {
      setIsPasswordModalVisible(false);
    }
  }, []);

  // Maneja el cambio en los inputs de filtro
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filtra los datos según los filtros de ancho, alto y rin
  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchAncho = filterValues.ancho === "" || item.ancho.toString().includes(filterValues.ancho);
      const matchAlto = filterValues.alto === "" || (item.alto ?? "").toString().includes(filterValues.alto);
      const matchRin = filterValues.rin === "" || item.rin.toString().includes(filterValues.rin);
      return matchAncho && matchAlto && matchRin;
    });
    setFilteredData(filtered);
    // eslint-disable-next-line
  }, [data, filterValues]);

  const edit = (record: Partial<Item> & { _id: string }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id);
  };

  const deleteRow = async (record: Partial<Item> & { _id: string }) => {
    try {
      await productosApi.eliminarProducto(record._id);
      message.success("Producto eliminado con éxito");
      const newData = data.filter((item) => item._id !== record._id);
      setData(newData);
    } catch (error) {
      console.log(error);
      message.error("Ocurrió un error al eliminar el producto");
    }
  };

  const cancel = () => setEditingKey("");

  const save = async (_id: string) => {
    try {
      const row = (await form.validateFields()) as Item;
      if (row.marca) row.marca = row.marca.toUpperCase();
      if (row.labrado) row.labrado = row.labrado.toUpperCase();
      if (row.caracteristicas) row.caracteristicas = row.caracteristicas.toUpperCase();
      setData((prevData) =>
        prevData.map((item) => (item._id === _id ? { ...item, ...row } : item))
      );
      await productosApi.editarProducto(_id, row);
      setEditingKey("");
      message.success("Producto editado");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      message.error("Producto no editado");
    }
  };

  const handleAddProduct = async (values: Item) => {
    try {
      await productosApi.añadirProducto(values);
      const newData = [...data, values];
      setData(newData);
      setIsModalVisible(false);
      message.success("Producto añadido correctamente");
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      message.error("Error al añadir el producto");
    }
  };

  // Columnas de la tabla
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      render: (_: any, __: Item, index: number) =>
        (currentPage - 1) * pageSize + index + 1, // Numeración global
    },
    {
      title: "Marca",
      dataIndex: "marca",
      width: "10%",
      editable: true,
    },


    {
      title: "Ancho",
      dataIndex: "ancho",
      width: "8%",
      editable: true,
    },
    {
      title: "Alto",
      dataIndex: "alto",
      width: "8%",
      editable: true,
    },
    {
      title: "Rin",
      dataIndex: "rin",
      width: "8%",
      editable: true,
    },
    {
      title: "Costo",
      dataIndex: "costo",
      width: "8%",
      editable: true,
    },
    {
      title: "PVP",
      dataIndex: "pvp",
      width: "8%",
      editable: true,
      ellipsis: true,
    },
    {
      title: "Labrado",
      dataIndex: "labrado",
      width: "9%",
      editable: true,
    },
    {
      title: "Características",
      dataIndex: "caracteristicas",
      width: "7%",
      editable: true,
    },
    {
      title: "Linkimg",
      dataIndex: "linkimg",
      width: "8%",
      editable: true,
      ellipsis: true,
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      width: "8%",
      editable: true,
      ellipsis: true,
    },

    {
      title: "Acciones",
      width: "10%",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link style={{ marginRight: 8 }}>
              <Popconfirm
                title="Seguro que quieres guardar?"
                onConfirm={() => save(record._id)}
                okButtonProps={{ className: "bg-blue-600" }}
              >
                <a>Guardar</a>
              </Popconfirm>
            </Typography.Link>
            <Popconfirm
              title="Seguro que quieres cancelar?"
              onConfirm={cancel}
              okButtonProps={{ className: "bg-blue-600" }}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              className="mr-10"
            >
              Editar
            </Typography.Link>
            <Typography.Link>
              <Popconfirm
                title="Seguro que quieres eliminarlo?"
                onConfirm={() => deleteRow(record)}
                okButtonProps={{ className: "bg-blue-600" }}
              >
                <a>Eliminar</a>
              </Popconfirm>
            </Typography.Link>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType:
          col.dataIndex === "ancho" ||
            col.dataIndex === "alto" ||
            col.dataIndex === "rin" ||
            col.dataIndex === "costo" ||
            col.dataIndex === "cantidad" ||
            col.dataIndex === "pvp"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // Ordena los datos filtrados por ancho, alto y rin (de menor a mayor)
  const sortedData = [...filteredData].sort((a, b) => {
    const anchoA = parseInt(a.ancho) || 0;
    const anchoB = parseInt(b.ancho) || 0;
    if (anchoA !== anchoB) return anchoA - anchoB;

    const altoA = parseInt(a.alto) || 0;
    const altoB = parseInt(b.alto) || 0;
    if (altoA !== altoB) return altoA - altoB;

    const rinA = parseInt(a.rin) || 0;
    const rinB = parseInt(b.rin) || 0;
    return rinA - rinB;
  });

  return (
    <>
      <div className="overflow-x-auto">
        <h1 className="text-lg ml-4 mb-2 ">Lista de stock</h1>
        <div className="mb-4 ml-4 flex gap-4 items-center flex-wrap sm:flex-nowrap sm:items-center">
          <Button
            type="primary"
            className="bg-blue-600"
            onClick={() => showModal()}
          >
            Agregar producto
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 my-4">
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-sm">Ancho</label>
            <Input
              name="ancho"
              placeholder="Buscar Ancho"
              value={filterValues.ancho}
              onChange={handleFilterChange}
              style={{ width: 120 }}
              allowClear
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-sm">Alto</label>
            <Input
              name="alto"
              placeholder="Buscar Alto"
              value={filterValues.alto}
              onChange={handleFilterChange}
              style={{ width: 120 }}
              allowClear
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-sm">Rin</label>
            <Input
              name="rin"
              placeholder="Buscar Rin"
              value={filterValues.rin}
              onChange={handleFilterChange}
              style={{ width: 120 }}
              allowClear
            />
          </div>
        </div>

        <div className="mt-10 w-full" style={{ minWidth: 320 }}>
          <Form form={form} component={false}>
            <div style={{ overflowX: "auto" }}>
              <Table
                loading={loadingTable}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={sortedData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: (page, size) => {
                    setCurrentPage(page);
                    setPageSize(size || 10);
                    cancel();
                  },
                  pageSize: pageSize,
                }}
                rowKey="_id"
                scroll={{
                  x: 900,
                  y: window.innerWidth < 640 ? 300 : 500,
                }}
                size={window.innerWidth < 640 ? "small" : "middle"}
                onRow={(record) => ({
                  onClick: () => {
                    setSelectedItem(record);
                    setIsDetailModalVisible(true);
                  },
                })}
              />
            </div>
          </Form>
        </div>
      </div>

      {/* Modal de detalle */}
      <Modal
        title="Detalle de la llanta"
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            Cerrar
          </Button>,
          <Button
            key="share"
            type="default"
            onClick={() => setIsShareModalVisible(true)}
          >
            Compartir por WhatsApp
          </Button>,
        ]}
      >
        {selectedItem && (
          <div>
            <p><b>Marca:</b> {selectedItem.marca}</p>
            <p><b>Labrado:</b> {selectedItem.labrado}</p>
            <p><b>Características:</b> {selectedItem.caracteristicas}</p>
            <p><b>Ancho:</b> {selectedItem.ancho}</p>
            <p><b>Alto:</b> {selectedItem.alto}</p>
            <p><b>Rin:</b>  {selectedItem.rin}</p>
            <p><b>PVP:</b> $ {selectedItem.pvp}</p>
            <br />
            <div style={{ textAlign: "center" }}>
              {selectedItem.linkimg ? (
                <img
                  src={selectedItem.linkimg}
                  alt="Producto"
                  style={{ maxWidth: "100%", maxHeight: 200, margin: "10px 0", borderRadius: 8, display: "inline-block" }}
                />
              ) : (
                <span>No hay imagen</span>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal para compartir */}
      <Modal
        title="Compartir por WhatsApp"
        visible={isShareModalVisible}
        onCancel={() => setIsShareModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={() => {
            if (!selectedItem) return;
            const msg = `*Producto:*\nMarca: ${selectedItem.marca}\nLabrado: ${selectedItem.labrado}\nCaracterísticas: ${selectedItem.caracteristicas}\nAncho: ${selectedItem.ancho}\nAlto: ${selectedItem.alto}\nRin: ${selectedItem.rin}\nPVP: $${selectedItem.pvp} \n IMAGEN: ${selectedItem.linkimg ? selectedItem.linkimg : "No hay imagen"} \n\n\n`;
            // const msg = `*Producto:*\nMarca: ${selectedItem.marca}\nLabrado: ${selectedItem.labrado}\nCaracterísticas: ${selectedItem.caracteristicas}\nAncho: ${selectedItem.ancho}\nAlto: ${selectedItem.alto}\nRin: ${selectedItem.rin}\nPVP: $${selectedItem.pvp}`;
            // Elimina cualquier caracter que no sea número
            const number = whatsappNumber.replace(/\D/g, "");
            // Usa wa.me y NO pongas el signo +
            const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
            window.open(url, "_blank");
            setIsShareModalVisible(false);
          }}
        >
          <Form.Item
            label="Número de WhatsApp"
            name="whatsapp"
            rules={[
              { required: true, message: "Ingrese el número de WhatsApp" },
              { pattern: /^\d{10,15}$/, message: "Ingrese un número válido" },
            ]}
          >
            <Input
              placeholder="Ej: 0986572316"
              value={whatsappNumber}
              onChange={e => setWhatsappNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit" block>
              Compartir
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <AddProductModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onAdd={handleAddProduct}
      />
      <Modal
        title="Contraseña requerida"
        visible={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(true)}
        footer={null}
        closable={false}
      >
        <Form onFinish={(values) => handlePasswordSubmit(values.password)}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Por favor ingrese la contraseña" },
            ]}
          >
            <Input.Password placeholder="Ingrese la contraseña" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableComponent;