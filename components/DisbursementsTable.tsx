'use client'
import { Button, Card, Typography } from '@material-tailwind/react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const TABLE_HEAD = ["ID", "Transaction ID", "Phone Number", "Amount", "Status"];

function DisbursementsTable() {
    const [ transactions, setTransactions ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        axios.get('/api/momo/disbursements')
        .then((res) => {
            setLoading(false);
            console.log(res.data)
            setTransactions(res.data.collections)
        })
        .catch(setError);
    }, []);

    if (error) {
        return (
            <p className='text-center text-[red] my-8'>An error has occured, try again later</p>
        )
    }

    if (loading) {
        return (
            <p className='text-center my-8'>Loading...</p>
        )
    }
  return (
    <div>
        <div className='flex my-4 justify-between items-center'>
            <p className='font-bold'>{transactions.length} Transactions</p>
            <Link href={'/mtn/disbursements/transfer'}>
            <Button 
                onClick={() => {}}
                size='sm'
                >
                Make Transfer
            </Button>
            </Link>
        </div>
        {/* <div>
            {transactions.map((trans: any) => (
                <div className='flex gap-5' key={trans.id}>
                    <p>ID: {trans.id}</p>
                    <p>ID: {trans.amount}</p>
                    <p>ID: {trans.status}</p>
                </div>
            ))}
        </div> */}
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                        <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                            >
                            {head}
                            </Typography>
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(({ id, payerpartyid, externalid, status, amount }, index) => {
                        const isLast = index === transactions.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            
                        return (
                        <tr key={id}>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {id}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {externalid}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {payerpartyid}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {amount}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {status}
                            </Typography>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    </div>
  )
}

export default DisbursementsTable