'use client';
import { fetch_dynamodb_tables } from '@/services/dynamo_db';
import React, { useEffect, useState } from 'react'

function DynamoDBList() {
    const [tables, setTables] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInstances, setFilteredInstances] = useState<any[]>([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await fetch_dynamodb_tables();
                if (!response) throw new Error('Failed to fetch EC2 instances');
                setTables(response);
                setFilteredInstances(response);
            } catch (err) {
                setError('Failed to load EC2 instances. Please check your credentials and try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTables();

        return () => {
            setTables([]);
        };
    }, []);
    console.log(tables);
    return (
        <div>DynamoDBList</div>
    )
}

export default DynamoDBList