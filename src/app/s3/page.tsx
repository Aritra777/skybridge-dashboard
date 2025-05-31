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

const AWSS3Lists = () => {
    const [buckets, setBuckets] = useState<{ Name: string, CreationDate: string }[]>([]);
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
                setBuckets(response);
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (!buckets.length) {
        return (
            <Alert className="mt-4">
                <AlertDescription>No S3 buckets found in your account.</AlertDescription>
            </Alert>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">S3 Buckets</CardTitle>
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search buckets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableHeader column="Name" label="Bucket Name" />
                            <SortableHeader column="CreationDate" label="Creation Date" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedBuckets.map((bucket) => (
                            <TableRow key={bucket.Name}>
                                <TableCell className="font-medium">{bucket.Name}</TableCell>
                                <TableCell>
                                    {new Date(bucket.CreationDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredAndSortedBuckets.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                        No buckets found matching your search.
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AWSS3Lists;