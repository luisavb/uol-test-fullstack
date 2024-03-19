import db from '../database/connection';
import CustomerData from '../model/Customer';

class CustomerService {
  async createCustomer(customerData: CustomerData): Promise<void> {
    const { name, email, cpf, phone, status } = customerData;
    const query = 'INSERT INTO customers (name, email, cpf, phone, status) VALUES (?, ?, ?, ?, ?)';
    
    await db.run(query, [name, email, cpf, phone, status]);
  };

  async listCustomers(): Promise<CustomerData[]> {
    const query = 'SELECT * FROM customers';
    const customers: CustomerData[] = await new Promise((resolve, reject) => {
      db.all(query, (err, rows: CustomerData[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    return customers;
  };

  async findCustomerById(id: number): Promise<CustomerData | undefined> {
    const query = 'SELECT * FROM customers WHERE id = ?';
    const customer: CustomerData | undefined = await new Promise((resolve, reject) => {
      db.get(query, [id], (err, row: CustomerData) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return customer;
  };

  async findCustomerByEmail(email: string): Promise<CustomerData | undefined> {
    const query = 'SELECT * FROM customers WHERE email = ?';
    const customer: CustomerData | undefined = await new Promise((resolve, reject) => {
      db.get(query, [email], (err, row: CustomerData) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return customer;
  };

  async findCustomerByCpf(cpf: string): Promise<CustomerData | undefined> {
    const query = 'SELECT * FROM customers WHERE cpf = ?';
    const customer: CustomerData | undefined = await new Promise((resolve, reject) => {
      db.get(query, [cpf], (err, row: CustomerData) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return customer;
  };

  async updateCustomer(id: number, customerData: CustomerData): Promise<void> {
    const { name, email, cpf, phone, status } = customerData;
    const query = 'UPDATE customers SET name = ?, email = ?, cpf = ?, phone = ?, status = ? WHERE id = ?';
    
    await db.run(query, [name, email, cpf, phone, status, id]);
  }

  async deleteCustomer(id: number): Promise<void> {
    const query = 'DELETE FROM customers WHERE id = ?';
    await db.run(query, [id]);
  };
}

export default CustomerService;
