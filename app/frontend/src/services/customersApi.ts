/* eslint-disable @typescript-eslint/no-explicit-any */
const URL = 'http://localhost:3000';

export type CustomerType = {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  status: string;
};

export async function customersApi(): Promise<CustomerType[]> {
    try {
        const response = await fetch(`${URL}/`, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
        });
        const data = await response.json()
        console.log('pegou a api?:', data);
        return data as Promise<CustomerType[]>;
    } catch (err: any) {
        console.log(err.message);
        alert('Serviço indisponível');
        return [];
    }
}

export async function createCustomer(newCustomer: CustomerType) {
    const response = await fetch(`${URL}/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
    });
    return response.json();
}

export async function getOneCustomer(id: number) {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json()
        console.log('pegou a api?:', data);
        return data as Promise<CustomerType>;
    } catch (err: any) {
        console.log(err.message);
        alert('Serviço indisponível');
        return {} as Promise<CustomerType>;
    }
}

export async function updateCustomer(updCustomer: CustomerType) {
    const response = await fetch(`${URL}/${updCustomer.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updCustomer),
    });
    return response.json();
}

export async function deleteCustomer(delCustomer: CustomerType) {
  const response = await fetch(`${URL}/${delCustomer.id}`, {
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
  });
  return response.json();
}