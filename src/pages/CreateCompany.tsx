import { useState } from "react";
import InputField from "../components/InputField";
import { CompanyProp } from "./Dashboard";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

export default function CreateCompany(props: { company?: CompanyProp }) {
    let company = null;
    
    if (!props.company) {
        company = {
            companyName: '',
            createdAt: Date.now().toString(),
            accountName: '',
            address: '',
            department: '',
            description: '',
            product: '',
            id: ''
        }
    }
    const [name, setName] = useState(props?.company?.companyName ?? company!.companyName)
    const [description, setDescription] = useState(props?.company?.description ?? company!.description)
    const [address, setAddress] = useState(props.company?.address ?? company!.address)
    const [product, setProduct] = useState(props.company?.product ?? company!.product)
    const [department, setDepartment] = useState(props.company?.department ?? company!.department)
    const [account, setAccount] = useState(props.company?.accountName ?? company!.accountName)

    const mutation = useMutation({
        mutationFn: async (company: CompanyProp) => {
            return await axios.post('https://66f24262415379191553841d.mockapi.io/reactexercise/companies', JSON.stringify(company))
        },
    })

    const [fieldError, setFieldError] = useState(false)

    const checkIfAnyEmpty = () => {
        const val = (name.length === 0 || description.length === 0 || address.length === 0 || product.length === 0 || department.length === 0 || account.length === 0)
        return val
    }

    

    if (mutation.isPending) return (
        <div className="flex text-2xl font-bold text-white items-center justify-center">
            Loading...
        </div>
    );

    if (mutation.isError) {
        console.log(mutation.error)
        console.log(fieldError)
        if (mutation.error instanceof AxiosError)
            return (
                <div className="flex text-2xl font-bold text-white items-center justify-center">
                    Error {mutation.error.response!.data}
                </div>
            )
    }

    if (mutation.isSuccess) {
        console.log(mutation.data)
        return (
            <div className="flex text-2xl font-bold text-white items-center justify-center">
                success
            </div>
        )
    }
    else {

        return (
            <div className="w-full py-8 h-min px-8">
                <h1 className="font-bold text-white text-2xl w-auto text-nowrap">Create Company</h1>
                <form className="my-4 bg-white/20 p-4 rounded-3xl">
                    <div className="flex gap-x-4">
                        <InputField type="text" label="Company Name" placeholder="company name" value={name} onChange={(e: any) => setName(e.target.value)} />
                        <InputField type="text" label="Description" placeholder="description" value={description} onChange={(e: any) => setDescription(e.target.value)} />
                        <InputField type="text" label="Address" placeholder="address" value={address} onChange={(e: any) => setAddress(e.target.value)} />
                    </div>
                    <div className="flex gap-x-4 mt-6">
                        <InputField type="text" label="Product Name" placeholder="product name" value={product} onChange={(e: any) => setProduct(e.target.value)} />
                        <InputField type="text" label="Department" placeholder="department" value={department} onChange={(e: any) => setDepartment(e.target.value)} />
                        <InputField type="text" label="Account Name" placeholder="account" value={account} onChange={(e: any) => setAccount(e.target.value)} />
                    </div>
                    {
                        fieldError ? <div className="flex text-2xl font-bold text-white items-center justify-center">
                            Error: Fields cannot be empty
                        </div> : <div className=""></div>
                    }
                    <button className="text-primary bg-white/20 px-3 mt-10 py-2 rounded-full hover:font-bold" onClick={(event) => {

                        
                        event.preventDefault();
                        if (!checkIfAnyEmpty()) {
                            const company: CompanyProp = {
                                companyName: name,
                                accountName: account,
                                description: description,
                                department: department,
                                address: address,
                                product: product,
                                createdAt: Date.now().toString(),
                                id: '100'
                            }
                            mutation.mutate(company)
                        } else{
                            setFieldError(true)
                        }
                    }}>
                        Submit
                    </button>

                </form>
            </div>
        );
    }
}