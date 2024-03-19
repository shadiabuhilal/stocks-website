const host: string = 'http://localhost:3001';

export const getStocksApiUrl = (): string => `${host}/stocks`;
export const deleteStockByIdApiUrl = (id: number): string  => `${host}/stocks/${id}`;

export const delayInMs: number = 2000;