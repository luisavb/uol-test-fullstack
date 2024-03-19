import CustomerService from '../src/service/CustomerService';
import db from '../src/database/connection';

jest.mock('../src/database/connection');

const mockGet = jest.fn();
const mockRun = jest.fn();
const mockAll = jest.fn();

(db.get as jest.Mock) = mockGet;
(db.run as jest.Mock) = mockRun;
(db.all as jest.Mock) = mockAll;

afterEach(() => {
  jest.clearAllMocks();
});

describe('CustomerService', () => {
  describe('createCustomer', () => {
    it('deve inserir um novo cliente no banco de dados', async () => {
      const customerService = new CustomerService();
      const customerData = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678901',
        phone: '123456789',
        status: 'ativo'
      };

      await customerService.createCustomer(customerData);

      expect(mockRun).toHaveBeenCalledWith(
        'INSERT INTO customers (name, email, cpf, phone, status) VALUES (?, ?, ?, ?, ?)',
        ['John Doe', 'john@example.com', '12345678901', '123456789', 'ativo']
      );
    });
  });

  describe('listCustomers', () => {
    it('deve retornar a lista de clientes do banco de dados', async () => {
      const customerService = new CustomerService();
      const mockCustomers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', cpf: '12345678901', phone: '123456789', status: 'ativo' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', cpf: '98765432109', phone: '987654321', status: 'aguardando ativacao' }
      ];

      mockAll.mockImplementation((_query: string, callback: (err: Error | null, rows?: any[]) => void) => {
        callback(null, mockCustomers);
      });

      const customers = await customerService.listCustomers();

      expect(customers).toEqual(mockCustomers);
    });

    it('deve apresentar a mensagem de erro se falhar ao buscar os clientes do banco de dados', async () => {
      const customerService = new CustomerService();
      const errorMessage = 'Database error';

      mockAll.mockImplementation((_query: string, callback: (err: Error | null, rows?: any[]) => void) => {
        callback(new Error(errorMessage));
      });

      await expect(customerService.listCustomers()).rejects.toThrow(errorMessage);
    });
  });

  describe('findCustomerById', () => {
    it('deve retornar os dados do cliente através do id', async () => {
      const customerService = new CustomerService();
      const mockCustomer = { id: 1, name: 'John Doe', email: 'john@example.com', cpf: '12345678901', phone: '123456789', status: 'ativo' };

      mockGet.mockImplementation((_query: string, _params: any[], callback: (err: Error | null, row?: any) => void) => {
        callback(null, mockCustomer);
      });

      const result = await customerService.findCustomerById(1);

      expect(result).toEqual(mockCustomer);
    });

    it('deve retornar undefined se nenhum cliente for encontrado com o id informado', async () => {
      const customerService = new CustomerService();

      mockGet.mockImplementation((_query: string, _params: any[], callback: (err: Error | null, row?: any) => void) => {
        callback(null, undefined);
      });

      const result = await customerService.findCustomerById(1);

      expect(result).toBeUndefined();
    });

    it('deve apresentar a mensagem de erro se falhar ao buscar o cliente pelo id informado', async () => {
      const customerService = new CustomerService();
      const errorMessage = 'Database error';

      mockGet.mockImplementation((_query: string, _params: any[], callback: (err: Error | null, row?: any) => void) => {
        callback(new Error(errorMessage));
      });

      await expect(customerService.findCustomerById(1)).rejects.toThrow(errorMessage);
    });
  });

  describe('findCustomerByEmail', () => {
    it('deve retornar os dados do cliente através do email', async () => {
      const customerService = new CustomerService();
      const mockCustomer = { id: 1, name: 'John Doe', email: 'john@example.com', cpf: '12345678901', phone: '123456789', status: 'ativo' };

      mockGet.mockImplementation((_query: string, _params: any[], callback: (err: Error | null, row?: any) => void) => {
        callback(null, mockCustomer);
      });

      const result = await customerService.findCustomerByEmail('john@example.com');

      expect(result).toEqual(mockCustomer);
    });

    it('deve retornar undefined se nenhum cliente for encontrado com o email informado', async () => {
      const customerService = new CustomerService();

      mockGet.mockImplementation((_query: string, _params: any[], callback: (err: Error | null, row?: any) => void) => {
        callback(null, undefined);
      });

      const result = await customerService.findCustomerByEmail('john@example.com');

      expect(result).toBeUndefined();
    });

    it('deve apresentar a mensagem de erro se falhar ao buscar o cliente pelo email informado', async () => {
      const customerService = new CustomerService();
      const errorMessage = 'Database error';

      mockGet.mockImplementation((_query: string, _params: any[], callback: (err: Error | null, row?: any) => void) => {
        callback(new Error(errorMessage));
      });

      await expect(customerService.findCustomerByEmail('john@example.com')).rejects.toThrow(errorMessage);
    });
  });

  describe('findCustomerByCpf', () => {
    it('deve retornar os dados do cliente através do CPF', async () => {
      const customerService = new CustomerService();
      const mockCustomer = { id: 1, name: 'John Doe', email: 'john@example.com', cpf: '12345678901', phone: '123456789', status: 'ativo' };

      mockGet.mockImplementation((_query: string, _params: any[], callback: (err: Error | null, row?: any) => void) => {
        callback(null, mockCustomer);
      });

      const result = await customerService.findCustomerByCpf('12345678901');

      expect(result).toEqual(mockCustomer);
    });

    it('deve retornar undefined se nenhum cliente for encontrado com o CPF informado', async () => {
      const customerService = new CustomerService();

      mockGet.mockImplementation((_query: string, _params: any[], callback: (err: Error | null, row?: any) => void) => {
        callback(null, undefined);
      });

      const result = await customerService.findCustomerByCpf('12345678901');

      expect(result).toBeUndefined();
    });

    it('deve apresentar a mensagem de erro se falhar ao buscar o cliente pelo CPF informado', async () => {
      const customerService = new CustomerService();
      const errorMessage = 'Database error';

      mockGet.mockImplementation((_query: string, _params: any[], callback: (err: Error | null, row?: any) => void) => {
        callback(new Error(errorMessage));
      });

      await expect(customerService.findCustomerByCpf('12345678901')).rejects.toThrow(errorMessage);
    });
  });

  describe('updateCustomer', () => {
    it('deve atualizar os dados de um cliente através do id informado', async () => {
      const customerService = new CustomerService();
      const id = 1;
      const customerData = { name: 'John Doe', email: 'john@example.com', cpf: '12345678901', phone: '123456789', status: 'active' };
      const expectedQuery = 'UPDATE customers SET name = ?, email = ?, cpf = ?, phone = ?, status = ? WHERE id = ?';

      await customerService.updateCustomer(id, customerData);

      expect(mockRun).toHaveBeenCalledWith(expectedQuery, [...Object.values(customerData), id]);
    });

  });

  describe('deleteCustomer', () => {
    it('deve deletar os dados do cliente através do id', async () => {
      const customerService = new CustomerService();
      const id = 1;
      const expectedQuery = 'DELETE FROM customers WHERE id = ?';

      await customerService.deleteCustomer(id);

      expect(mockRun).toHaveBeenCalledWith(expectedQuery, [id]);
    });

  });

});
