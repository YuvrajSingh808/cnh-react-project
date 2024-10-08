import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import CreateCompany from "./CreateCompany";
import { useState } from "react";

export default function Dashboard(props: { setCurrItem: Function, currItem: {label:string, element: JSX.Element} }) {

    const { isPending, error, data } = useQuery({
        queryKey: ['companiesData'],
        queryFn: async (): Promise<CompanyProp[]> => {
            // function delay() {
            //     return new Promise((resolve, reject) => {
            //         setTimeout(() => {
            //             resolve('Manual delay for 2 seconds')
            //         }, 2000);
            //     })
            // }
            // await delay();
            const response = await axios.get('https://66f24262415379191553841d.mockapi.io/reactexercise/companies')
            setFilteredData(response.data)
            return response.data
        }
    })
    
    const[filteredData, setFilteredData] = useState(data)

    function handleSearch(query: string) {
        if (query.length === 0) setFilteredData(data)
        setFilteredData(data?.filter((item) => {
            if (item.companyName.toLowerCase()
                .includes(query.toLowerCase())) { return item; }
        }))
    }

    if (isPending) return (
        <div className="flex text-2xl font-bold text-white items-center justify-center">
            Loading...
        </div>
    );

    if (error) return (
        <div className="flex text-2xl font-bold text-white items-center justify-center">
            Error
        </div>
    );


    return (
        <div className="w-full py-8 h-min px-8  rounded-3xl space-x-4 items-center">
            <div className="flex justify-between">
                <h1 className="font-bold text-white text-2xl w-auto text-nowrap">Companies</h1>
                <input type='text' id="email" className="bg-white bg-opacity-20 focus:bg-opacity-30 text-base rounded-full border border-transparent focus:border focus:border-primary block w-1/2 self-end py-2.5 px-4 outline-none transition-all duration-700 focus:w-full focus:ml-4 text-white" placeholder='Search Companies by name' onChange={(e) => {
                    handleSearch(e.target.value)
                }} />
            </div>
            <CompanyCard data={filteredData!} setCurrItem={props.setCurrItem} currItem={props.currItem} />
        </div>
    );
}

export interface CompanyProp {
    createdAt: string;
    companyName: string;
    description: string;
    address: string;
    product: string;
    department: string;
    accountName: string;
    id: string;
}


function CompanyCard(props: { data: CompanyProp[], setCurrItem: Function, currItem: {label:string, element: JSX.Element} }) {
    return (
        <div className="flex flex-col my-4 h-[70vh] ">
            <div className="overflow-x-hidden">
                <div className=" align-middle inline-block min-w-full">
                    <div className="h-1/2">
                        <table className="min-w-full divide-y divide-white/60 ">
                            <thead className="bg-white/30 text-white">
                                <tr className="rounded-3xl">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                    >
                                        Company Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                    >
                                        Product
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                    >
                                        Department
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider"
                                    >
                                        Address
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white/10 divide-y divide-transparent">
                                {props.data.map(
                                    company => {

                                    const menu = { label: 'Create', element: <CreateCompany company={company} /> }
                                    return (
                                        <tr key={company.companyName}>
                                            <td className="px-6 py-4 whitespace-nowrap ">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <AiOutlineProduct className="h-6 w-6 text-white" />
                                                        {/* <img className="h-10 w-10 rounded-full" src={company.image} alt="" /> */}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-300">{company.companyName}</div>
                                                        <div className="text-sm text-white/80">{getTimeStamp(company.createdAt)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-white/90">{company.product}</div>
                                                <div className="text-sm text-white/80">{company.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                                                {company.department}
                                            </td>
                                            <td className="px-6 py-4 text-wrap text-sm text-white/80">
                                                {company.address}
                                            </td>
                                            <td className="whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-indigo-600 bg-white/20 px-3 py-2 rounded-full hover:text-indigo-900" onClick={() => {props.setCurrItem(menu); console.log(props.currItem)}}>
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    )})}
                                    
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getTimeStamp(str: string): string {
    const date = new Date(str);
    const s = date.toLocaleString();
    return s;
}
