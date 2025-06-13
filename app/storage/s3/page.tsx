/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { Loader2, Search, ArrowUpDown } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetch_buckets } from '@/services/s3';
import { BasicSidebarLayout } from '@/components/basic_sidebar_layout';
import { Badge } from '@/components/ui/badge';

interface Bucket {
    Name: string;
    CreationDate: string;
    cost: number;
}

const AWSS3Lists = () => {
    const [buckets, setBuckets] = useState<Bucket[]>([]);
    const [totalCost, setTotalCost] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: 'Name',
        direction: 'asc'
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const fetchBuckets = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await fetch_buckets();
                if (!response) throw new Error('Failed to fetch buckets');
                setBuckets(response.buckets);
                setTotalCost(response.totalCost);
            } catch (err) {
                setError('Failed to load S3 buckets. Please check your credentials and try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBuckets();

        return () => {
            setBuckets([]);
        };
    }, []);

    // Sorting function
    const sortData = (key: any) => {
        setSortConfig((current) => ({
            key,
            direction:
                current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    // Filter and sort the buckets
    const filteredAndSortedBuckets = React.useMemo(() => {
        let filtered = [...buckets];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(bucket =>
                bucket.Name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === 'CreationDate') {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return filtered;
    }, [buckets, searchTerm, sortConfig]);

    // Table header with sort button
    const SortableHeader = ({ column, label }) => (
        <TableHead>
            <Button
                variant="ghost"
                onClick={() => sortData(column)}
                className="hover:bg-transparent"
            >
                {label}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        </TableHead>
    );

    // if (isLoading) {
    //     return (
    //         <div className="flex items-center justify-center min-h-[400px]">
    //             <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <Alert variant="destructive" className="mt-4">
    //             <AlertDescription>{error}</AlertDescription>
    //         </Alert>
    //     );
    // }

    // if (!buckets.length) {
    //     return (
    //         <Alert className="mt-4">
    //             <AlertDescription>No S3 buckets found in your account.</AlertDescription>
    //         </Alert>
    //     );
    // }

    return (
        <BasicSidebarLayout>
            <div className='p-4'>
                {
                    isLoading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        </div>
                    ) : error ? (
                        <Alert variant="destructive" className="mt-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : (
                        <>
                            <Card className="mb-4">
                                <CardHeader className='w-full'>
                                    <div className='flex justify-between'>
                                        <CardTitle className='text-2xl'>S3 Buckets</CardTitle>
                                        <Badge className='text-xl'>
                                            Total: ${totalCost}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Input
                                        placeholder="Search buckets..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="mb-4"
                                    />
                                    <Table>
                                        <TableHeader>
                                            <SortableHeader column="Name" label="Bucket Name" />
                                            <SortableHeader column="CreationDate" label="Creation Date" />
                                            <SortableHeader column="Cost" label="Current Cost" />
                                        </TableHeader>
                                        <TableBody>
                                            {filteredAndSortedBuckets.map((bucket, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{bucket.Name}</TableCell>
                                                    <TableCell>
                                                        <Badge className='bg-yellow-200 text-black'>
                                                            {new Date(bucket.CreationDate).toLocaleString()}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge>{`$ ${bucket.cost}`}</Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </>
                    )
                }
            </div>
        </BasicSidebarLayout>
    );
};

export default AWSS3Lists;