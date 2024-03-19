import { useMemo, useState, ReactNode, useCallback } from "react";
import Context from "./Context";
import { useNavigate } from "react-router-dom";
import { CustomerType, createCustomer, customersApi, getOneCustomer, updateCustomer } from "../services/customersApi";

type ProviderProps = {
    children: ReactNode
}

export type ProviderValues = {
    getCustomers: () => Promise<void>,
    updCustomer: (customerUpd: CustomerType) => Promise<void>,
    addCustomer: (customer: CustomerType) => Promise<void>,
    getOne: (id: number) => Promise<void>,
    customers: CustomerType[],
    editCustomer: CustomerType,
    loading: boolean,
}

function Provider({ children }: ProviderProps) {
    const test = {id: 0, name: 'Cliente a ser Editado', email: 'email@email.com', cpf: 'CPF', phone: 'Numero com DDD', status: 'Inativo'}

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([] as CustomerType[]);
    const [editCustomer, setEditCustomer] = useState(test as CustomerType);

    const getCustomers = async () => {
        setLoading(true);
        try {
            const result = await customersApi();
            setCustomers(result);
        } catch (error) {
            throw new Error("Erro ao buscar clientes");
        } finally {
            setLoading(false);
        }
    }

    const getOne = useCallback(async (id: number) => {
        setLoading(true);
        try {
            const result = await getOneCustomer(id);
            console.log('chegou no provider?:', result)
            setEditCustomer(result);
        } catch (error) {
            throw new Error("Erro ao buscar clientes");
        } finally {
            console.log('edit antes de ir:', editCustomer)
            setLoading(false);
        }
    }, [editCustomer]);

    const updCustomer = async (customerUpd: CustomerType) => {
        const editCustomer = customers.map((customer) => {
            if (customer.id === customerUpd.id) {
                customer.name = customerUpd.name;
                customer.email = customerUpd.email;
                customer.cpf = customerUpd.cpf;
                customer.phone = customerUpd.phone;
                customer.status = customerUpd.status

            }
            return customer;
        });

        setLoading(true);
        setCustomers(editCustomer);
        setLoading(false);
        await updateCustomer(customerUpd);
        navigate("/");
    }

    const addCustomer = async (customer: CustomerType) => {
        try {
            await createCustomer(customer);
            await getCustomers();
            navigate("/");
        } catch (error) {
            throw new Error("erro ao adicionar novo cliente");
        }
    }


    const values: ProviderValues = useMemo(() => ({
        customers,
        getCustomers,
        loading,
        updCustomer,
        addCustomer,
        getOne,
        editCustomer, 
        setEditCustomer
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [customers, editCustomer, getOne, loading, setEditCustomer]);

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>);
}

export default Provider;