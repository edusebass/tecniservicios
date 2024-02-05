// api/productosApi.ts
import { apiUtils } from '../utils/apiUtils';

const listarProductos = async () => {
    // Lógica para obtener productos desde la API
    const response = await apiUtils.fetchData('http://localhost:1000/api/productos');
    return response.json();
};

const editarProducto = async (key: string, data: any) => {
    // Lógica para editar un producto en la API
    await apiUtils.putData(`http://localhost:1000/api/productos/${key}`, data);
};

const añadirProducto = async ( data: any) => {
    await apiUtils.postData(`http://localhost:1000/api/productos/`, data)
}

export const productosApi = {
    listarProductos,
    editarProducto,
    añadirProducto
};
