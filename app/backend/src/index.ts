import express from 'express';
import cors from 'cors';
import CustomerController from './controller/CustomerController';

const app = express();
const customerController = new CustomerController();

app.use(express.json());
app.use(cors());

//create new customer
app.post('/', customerController.createCustomer);
//read all
app.get('/', customerController.listCustomers);
//read one
app.get('/:id', customerController.findCustomerById);
//updade one
app.put('/:id', customerController.updateCustomer);
//delete
app.delete('/:id', customerController.deleteCustomer);

const PORT = 3000

app.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT));
