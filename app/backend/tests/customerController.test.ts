import { Request, Response } from 'express';
import CustomerController from '../src/controller/CustomerController';
import CustomerService from '../src/service/CustomerService';
import CustomerData from '../src/model/Customer';

jest.mock('../src/service/CustomerService');

describe('CustomerController', () => {
  let customerController: CustomerController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    customerController = new CustomerController();
    mockRequest = {
      params: { id: '1' }
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCustomer', () => {
    it('deve criar um novo cliente', async () => {
      const reqBody: Partial<CustomerData> = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678901',
        phone: '123456789',
        status: 'active',
      };

      jest.spyOn(CustomerService.prototype, 'createCustomer').mockResolvedValueOnce(undefined);

      mockRequest.body = reqBody;
      await customerController.createCustomer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário criado com sucesso!' });
    });

    it('deve retornar mensagem de erro se algum campo do body estiver faltando', async () => {
      mockRequest.body = {};
      await customerController.createCustomer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Todos os campos são obrigatórios' });
    });

  });

  describe('listCustomers', () => {
    it('should return a list of customers', async () => {
      const mockCustomers = [{
        id: 1,
        name: 'Test Customer',
        email: 'test@example.com',
        cpf: '12345678900',
        phone: '1234567890',
        status: 'active'
      }];
  
      jest.spyOn(CustomerService.prototype, 'listCustomers').mockResolvedValueOnce(mockCustomers);
    
      await customerController.listCustomers(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCustomers);
    });

    it('should return 500 if an error occurs while finding list of customers', async () => {
      // Mocking an error while finding customer by ID
      jest.spyOn(CustomerService.prototype, 'listCustomers').mockRejectedValueOnce(new Error('Erro ao listar os clientes'));
  
      // Calling the controller function
      await customerController.listCustomers(mockRequest as Request, mockResponse as Response);
  
      // Verifying the response
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro ao listar os clientes' });
    });
  });
  

  describe('findCustomerById', () => {
    it('should return 200 with customer data if customer is found', async () => {
      // Mocking the customer data returned by the service
      const mockCustomer = {
        id: 1,
        name: 'Test Customer',
        email: 'test@example.com',
        cpf: '12345678900',
        phone: '1234567890',
        status: 'active'
      };
      jest.spyOn(CustomerService.prototype, 'findCustomerById').mockResolvedValueOnce(mockCustomer);
  
      // Calling the controller function
      await customerController.findCustomerById(mockRequest as Request, mockResponse as Response);
  
      // Verifying the response
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      // expect(mockResponse.json).toHaveBeenCalledWith(mockCustomer);
    });
  
    it('should return 404 if customer is not found', async () => {
      // Mocking that the customer is not found
      jest.spyOn(CustomerService.prototype,  'findCustomerById').mockResolvedValueOnce(undefined);
  
      // Calling the controller function
      await customerController.findCustomerById(mockRequest as Request, mockResponse as Response);
  
      // Verifying the response
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Cliente não encontrado' });
    });

    it('should return 500 if an error occurs while finding customer by ID', async () => {
      // Mocking an error while finding customer by ID
      jest.spyOn(CustomerService.prototype, 'findCustomerById').mockRejectedValueOnce(new Error('Erro ao buscar o cliente por ID'));
  
      // Calling the controller function
      await customerController.findCustomerById(mockRequest as Request, mockResponse as Response);
  
      // Verifying the response
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro ao buscar o cliente por ID' });
    });
  });

  describe('updateCustomer', () => {
    it('should return 400 if any required field is missing', async () => {
      mockRequest.body = { email: 'test@example.com', cpf: '12345678900', phone: '1234567890', status: 'active' };

      await customerController.updateCustomer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Todos os campos são obrigatórios' });
    });

    it('should return 200 if customer is successfully updated', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { name: 'Test Customer', email: 'test@example.com', cpf: '12345678900', phone: '1234567890', status: 'active' };

      jest.spyOn(CustomerService.prototype, 'updateCustomer').mockResolvedValueOnce(undefined);

      await customerController.updateCustomer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Cliente atualizado com sucesso!' });
    });

    it('should return 500 if an error occurs while updating customer', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { name: 'Test Customer', email: 'test@example.com', cpf: '12345678900', phone: '1234567890', status: 'active' };

      jest.spyOn(CustomerService.prototype, 'updateCustomer').mockRejectedValueOnce(new Error('Erro ao atualizar o cliente'));

      await customerController.updateCustomer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar o cliente' });
    });
  });

  describe('deleteCustomer', () => {
    it('should return 200 if customer is successfully deleted', async () => {
      mockRequest.params = { id: '1' };

      jest.spyOn(CustomerService.prototype, 'deleteCustomer').mockResolvedValueOnce(undefined);

      await customerController.deleteCustomer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Cliente deletado com sucesso!' });
    });

    it('should return 500 if an error occurs while deleting customer', async () => {
      mockRequest.params = { id: '1' };

      jest.spyOn(CustomerService.prototype, 'deleteCustomer').mockRejectedValueOnce(new Error('Erro ao deletar o cliente'));

      await customerController.deleteCustomer(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro ao deletar o cliente' });
    });
  });


});
