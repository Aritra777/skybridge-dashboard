'use client';
import React, { useEffect, useState } from 'react';
import { fetch_ecs_clusters } from '@/services/ecs';

function ECSClusters() {
    const [clusters, setClusters] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClusters, setFilteredClusters] = useState<any[]>([]);

    useEffect(() => {
        const fetchClusters = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await fetch_ecs_clusters();
                if (!response) throw new Error('Failed to fetch ECS clusters');
                setClusters(response);
                setFilteredClusters(response);
            } catch (err) {
                setError('Failed to load ECS clusters. Please check your credentials and try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClusters();

        return () => {
            setClusters([]);
        };
    }, []);

    console.log(clusters);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Search clusters..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setFilteredClusters(
                                clusters.filter((cluster) =>
                                    cluster.name.toLowerCase().includes(e.target.value.toLowerCase())
                                )
                            );
                        }}
                    />
                    <ul>
                        {/* {filteredClusters.map((cluster, index) => (
                            <li key={index}>{cluster.name}</li>
                        ))} */}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ECSClusters;