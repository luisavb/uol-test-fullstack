import './App.css'
import { Route, Routes } from 'react-router-dom';
import ListCustomers from './pages/ListCustomer';
import EditCustomer from './pages/EditCustomer';
import CreateCustomer from './pages/CreateCustomer';

function App() {
  return (
    <Routes>
      <Route path="/edit/:id" element={<EditCustomer />} />
      <Route path="/create" element={<CreateCustomer />} />
      <Route path="/" element={<ListCustomers />} />
    </Routes>
  );
}

export default App
