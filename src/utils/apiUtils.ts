// utils/apiUtils.ts
const fetchData = async (url: string) => {
    return await fetch(url);
};
  
const putData = async (url: string, data: any) => {
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

const postData = async (url: string, data: any) => {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

const deleteData = async (url: string) => {
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


export const apiUtils = {
    fetchData,
    putData,
    postData,
    deleteData
};
