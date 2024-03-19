import { delayInMs, deleteStockByIdApiUrl, getStocksApiUrl } from "../configs/dao.config";

// Adding a delay of n milliseconds for demo purposes
const delayFor = async (ms: number)=> new Promise(resolve => setTimeout(resolve, ms));

export const getStocksData = async () => {
    // Note: Idealy 'json-server' pkg should support delay, this a wrong hack.
    await delayFor(delayInMs);

    const response = await fetch(getStocksApiUrl());

    if (!response.ok) {
        throw new Error('Failed to fetch data!');
    }

    return response.json();
}

export const deleteStocksDataById = async (id: number) => {
    // Note: Idealy 'json-server' pkg should support delay, this a wrong hack.
    await delayFor(delayInMs);

    const response = await fetch(deleteStockByIdApiUrl(id), { method: 'DELETE' });
    
    if (!response.ok) {
        throw new Error('Failed to delete data!');
    }
}
