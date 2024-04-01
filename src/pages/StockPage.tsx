// components/TableComponent.tsx
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Typography, message } from 'antd';
import { productosApi } from '../api/productosApi';
import EditableCell from '../components/EditableCell';
import AddProductModal from '../components/AddProductModal';

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
    const [editingKey, setEditingKey] = useState('');
    const [filteredData, setFilteredData] = useState<Item[]>([]);
    const [filterValues, setFilterValues] = useState({
        ancho: '',
        alto: '',
        rin: '',
        labrado: ''
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const isEditing = (record: Item) => editingKey === record._id;



    // constantes para modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoadingTable(true);
            const newData = await productosApi.listarProductos();
            console.log(newData)
            const columnData = newData.map((item: Item) => ({
            _id: item._id,
            marca: item.marca,
            labrado: item.labrado,
            caracteristicas: item.caracteristicas,
            alto: item.alto,
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
            console.log('Error al obtener datos:', error);
        }
        };

        fetchData();

        return () => {
        originData.length = 0;
        };
    }, []);

    useEffect(() => {
        filterTableData();
    }, [filterValues, data]);

    const edit = (record: Partial<Item> & { _id: string }) => {
        // setea los valores en las celdas para editar
        form.setFieldsValue({ ...record });
        setEditingKey(record._id);
    };

    const deleteRow = async (record: Partial<Item> & { _id: string }) => {
        console.log("eliminando el row de id: " + record._id);
        try {
            await productosApi.eliminarProducto(record._id);
            message.success("Producto eliminado con éxito");
    
            // Actualizar la lista de productos después de la eliminación
            const newData = data.filter(item => item._id !== record._id);
            setData(newData);
        } catch (error) {
            console.log(error);
            message.error("Ocurrió un error al eliminar el producto");
        }
    };
    
    
    
    

    const handleInputChange = (name: string, value: string) => {
        setFilterValues({
        ...filterValues,
        [name]: value,
        });

        // form.setFieldsValue({ [name]: value.target.value.toUpperCase() })
    };

    const filterTableData = () => {
        const filtered = data.filter((item) => {
        return (
            item.ancho.toString().includes(filterValues.ancho) &&
            item.alto.toString().includes(filterValues.alto) &&
            item.rin.toString().includes(filterValues.rin) &&
            item.labrado.toString().includes(filterValues.labrado) 
        );
        });
        setFilteredData(filtered);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (_id: string) => {
        try {
            const row = (await form.validateFields()) as Item;
    
            // Convierte a mayúsculas los valores de las propiedades específicas
            if (row.marca) {
                row.marca = row.marca.toUpperCase();
            }
    
            if (row.labrado) {
                row.labrado = row.labrado.toUpperCase();
            }
    
            if (row.caracteristicas) {
                row.caracteristicas = row.caracteristicas.toUpperCase();
            }
    
            // Actualiza la tabla localmente
            setData((prevData) =>
                prevData.map((item) => (item._id === _id ? { ...item, ...row } : item))
            );
    
            // Realiza la acción de edición en la API
            await productosApi.editarProducto(_id, row);
    
            // Finaliza la edición
            setEditingKey('');
            message.success('Producto editado');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
            message.error('Producto no editado');
        }
        console.log(editingKey);
    };
    
    
    
    const handleAddProduct = async (values: Item) => {
        try {
            await productosApi.añadirProducto(values);

            const newData = [...data, values];
            setData(newData);

            setIsModalVisible(false);
            message.success("Producto añadido correctamente");
        } catch (error) {
            console.error('Error al añadir el producto:', error);
            message.error("Error al añadir el producto");
        }
    };

  // Columnas de la tabla
    const columns = [
    {
        title: 'Marca',
        dataIndex: 'marca',
        width: '10%',
        editable: true,
    },
    {
        title: 'Labrado',
        dataIndex: 'labrado',
        width: '9%',
        editable: true,
    },
    {
        title: 'Características',
        dataIndex: 'caracteristicas',
        width: '7%',
        editable: true,
    },
    {
        title: 'Ancho',
        dataIndex: 'ancho',
        width: '4%',
        editable: true,
    },
    {
        title: 'Alto',
        dataIndex: 'alto',
        width: '4%',
        editable: true,
    },
    {
        title: 'Rin',
        dataIndex: 'rin',
        width: '5%',
        editable: true,
    },
    {
        title: 'Costo',
        dataIndex: 'costo',
        width: '5%',
        editable: true,
    },
    {
        title: 'Linkimg',
        dataIndex: 'linkimg',
        width: '8%',
        editable: true,
        ellipsis: true, 
    },
    {
        title: 'Cantidad',
        dataIndex: 'cantidad',
        width: '8%',
        editable: true,
        ellipsis: true, 
    },
    {
        title: 'PVP',
        dataIndex: 'pvp',
        width: '8%',
        editable: true,
        ellipsis: true, 
    },
    {
        title: 'Acciones',
        width: '10%',
        dataIndex: 'operation',
        render: (_: any, record: Item) => {
            const editable = isEditing(record);
            return editable ? (
            <span>
                <Typography.Link style={{ marginRight: 8 }}>
                    <Popconfirm title="Seguro que quieres guardar?" onConfirm={() => save(record._id)} okButtonProps={{className: "bg-blue-600"}}>
                        <a>Guardar</a>
                    </Popconfirm>
                </Typography.Link>
                <Popconfirm title="Seguro que quieres cancelar?" onConfirm={cancel} okButtonProps={{className: "bg-blue-600"}}>
                    <a>Cancel</a>
                </Popconfirm>
            </span>
            ) : (
                <>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} className='mr-10'>
                        Editar
                    </Typography.Link>
                    <Typography.Link>
                        <Popconfirm title="Seguro que quieres eliminarlo?" onConfirm={() => deleteRow(record)} okButtonProps={{className: "bg-blue-600"}}>
                            <a>
                                <p className='text-red-500 hover:text-red-300'>Eliminar</p>
                            </a>
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
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
        };
    });

    const clearFilters = () => {
        setFilterValues({
        ancho: '',
        alto: '',
        rin: '',
        labrado: ''
        });
    };

    console.log(data)
    return (
        <main className='m-10'>
        <Form form={form} component={false}>
            <div className='flex flex-row'>
                <Form.Item label="Ancho" style={{marginLeft:"1rem"}}>
                    <Input
                        placeholder="Ancho"
                        value={filterValues.ancho}
                        onChange={(e) => handleInputChange('ancho', e.target.value)}
                        />
                </Form.Item>

                <Form.Item label="Alto" style={{marginLeft:"1rem"}}>
                    <Input
                        placeholder="Alto"
                        value={filterValues.alto}
                        onChange={(e) => handleInputChange('alto', e.target.value)}
                        />
                </Form.Item>

                <Form.Item label="Rin" style={{marginLeft:"1rem"}}>
                    <Input
                        placeholder="Rin"
                        value={filterValues.rin}
                        onChange={(e) => handleInputChange('rin', e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Labrado" style={{marginLeft:"1rem"}}>
                    <Input
                        placeholder="Labrado"
                        value={filterValues.labrado}
                        onChange={(e) => handleInputChange('labrado', e.target.value)}
                    />
                </Form.Item>

                <Button type='primary' ghost onClick={clearFilters} style={{marginLeft:"1rem"}}>
                    Limpiar filtro
                </Button>
            </div>

            <Button type='primary' className='bg-blue-600 mb-3' onClick={showModal}>
                Añadir producto
            </Button>
            <AddProductModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onAdd={handleAddProduct}
            />


            <Table
                loading={loadingTable}
                components={{
                    body: {
                    cell: EditableCell,
                    },
                }}
                bordered
                dataSource={filteredData}
                columns={mergedColumns}
                rowClassName='editable-row'
                // pagination={{
                //     onChange: cancel,
                // }}
            />
        </Form>
        </main>
    );
};

export default TableComponent;
