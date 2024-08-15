// api/productosApi.ts
import { apiUtils } from '../utils/apiUtils';

const listarProductos = async () => {
    // Lógica para obtener productos desde la API
    const response = await apiUtils.fetchData(`${import.meta.env.VITE_BACKEND_URL}` + '/api/productos');
    return response.json();
};

const editarProducto = async (_id: string, data: any) => {
    // Lógica para editar un producto en la API
    await apiUtils.putData(`${import.meta.env.VITE_BACKEND_URL}` + `/api/productos/${_id}`, data);
};

const añadirProducto = async ( data: any) => {
    await apiUtils.postData(`${import.meta.env.VITE_BACKEND_URL}` + '/api/productos', data)
}

const eliminarProducto = async ( _id:string) => {
    await apiUtils.deleteData(`${import.meta.env.VITE_BACKEND_URL}` + `/api/productos/${_id}`)
}

const buscarProductoEspecifico = async (data:any) => {
    await apiUtils.postData(`${import.meta.env.VITE_BACKEND_URL}` + `/api/productos-especifico`, data)
}

export const productosApi = {
    listarProductos,
    editarProducto,
    añadirProducto,
    eliminarProducto,
    buscarProductoEspecifico
};
