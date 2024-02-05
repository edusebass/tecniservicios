import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

// Interfaz para los elementos de la tabla
interface Item {
    key: string;
    marca: string;
    labrado: string;
    caracteristicas: string;
    alto: string;
    ancho: string;
    rin: string;
    costo: string;
}

// Interfaz para las propiedades de la celda editable
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

// Componente de celda editable
const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
    }) => {

    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
        {editing ? (
            <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
                {
                required: true,
                message: `Please Input ${title}!`,
                },
            ]}
            >
            {inputNode}
            </Form.Item>
        ) : (
            children
        )}
        </td>
    );
};

// Valores iniciales para los filtros
const initialValues = {
    ancho: '',
    alto: '',
    rin: ''
}

const App: React.FC = () => {

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
    });

    // Función para verificar si una fila está en modo de edición
    const isEditing = (record: Item) => record.key === editingKey;

    // Efecto para cargar datos desde la API al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingTable(true);
                const response = await fetch('http://localhost:1000/api/productos');
                const newData = await response.json();
                console.log(newData);

                // Mapear los datos y darles formato, por ejemplo, agregar un símbolo de dólar al costo
                const columnData = newData.map((item: Item, index: number) => ({
                    key: String(index + 1),
                    marca: item.marca,
                    labrado: item.labrado,
                    caracteristicas: item.caracteristicas,
                    alto: item.alto,
                    ancho: item.ancho,
                    rin: item.rin,
                    costo: "$ " + item.costo,
                }));

                // Limpiar datos antiguos
                originData.length = 0;

                // Setear datos originales y actuales
                originData.push(...columnData);
                setData([...columnData]);
                setLoadingTable(false);

            } catch (error) {
                console.log('Error al obtener datos:', error);
                // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
            }
        };

        fetchData();

        // Limpiar efecto al desmontar el componente
        return () => {
            originData.length = 0;
        }
    }, []);

    // Efecto para filtrar los datos basados en los valores de los inputs de filtro
    useEffect(() => {
        filterTableData();
    }, [filterValues, data]);

    // Función para manejar la edición de una fila
    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    // Función para manejar el cambio en los inputs de filtro
    const handleInputChange = (name: string, value: string) => {
        setFilterValues({
            ...filterValues,
            [name]: value,
        });
    };

    // Función para filtrar los datos basados en los valores de los inputs de filtro
    const filterTableData = () => {
        const filtered = data.filter((item) => {
            return (
            item.ancho.toString().includes(filterValues.ancho) &&
            item.alto.toString().includes(filterValues.alto) &&
            item.rin.toString().includes(filterValues.rin)
            );
        });
        setFilteredData(filtered);
        console.log(filteredData);
    };

    // Función para cancelar la edición
    const cancel = () => {
        setEditingKey('');
    };

    // Función para guardar los cambios en una fila editada
    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                // Enviar la solicitud PUT al servidor
                await fetch(`http://localhost:1000/api/productos/${item.key}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(row),
                });

                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    // Columnas de la tabla
    const columns = [
        {
            title: 'Marca',
            dataIndex: 'marca',
            width: '15%',
            editable: true,
        },
        {
            title: 'Labrado',
            dataIndex: 'labrado',
            width: '15%',
            editable: true,
        },
        {
            title: 'Características',
            dataIndex: 'caracteristicas',
            width: '20%',
            editable: true,
        },
        {
            title: 'Alto',
            dataIndex: 'alto',
            width: '10%',
            editable: true,
        },
        {
            title: 'Ancho',
            dataIndex: 'ancho',
            width: '10%',
            editable: true,
        },
        {
            title: 'Rin',
            dataIndex: 'rin',
            width: '10%',
            editable: true,
        },
        {
            title: 'Costo',
            dataIndex: 'costo',
            width: '10%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                <span>
                    <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                    Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <a>Cancel</a>
                    </Popconfirm>
                </span>
                ) : (
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    Edit
                </Typography.Link>
                );
            },
        },
    ];

    // Configuración de las columnas para la tabla
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

    // Función para limpiar los filtros
    const clearFilters = () => {
        setFilterValues(initialValues);
    }

    console.log(mergedColumns);
    console.log(data);

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
                        <Button type='primary' ghost onClick={clearFilters} style={{marginLeft:"1rem"}}>
                            Limpiar filtro
                        </Button>
                </div>
                
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
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
        </main>
    );
};

export default App;
