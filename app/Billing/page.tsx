// components/AWSCostDashboard.tsx
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  DollarSign, Server, Database, Shield, Globe,
  ChevronDown, ChevronUp, RefreshCw, AlertCircle
} from 'lucide-react';
import { fetch_cost } from "@/services/cost";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

const getServiceIcon = (serviceName) => {
  if (serviceName.includes('EC2') || serviceName.includes('Compute')) return <Server className="w-5 h-5" />;
  if (serviceName.includes('Storage') || serviceName.includes('S3')) return <Database className="w-5 h-5" />;
  if (serviceName.includes('CloudWatch') || serviceName.includes('Management')) return <Shield className="w-5 h-5" />;
  return <Globe className="w-5 h-5" />;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(Math.abs(amount));
};

const ServiceCard = ({ service, isExpanded, onToggle }) => {
  const positiveResources = service.resources.filter(r => r.cost > 0);
  const negativeResources = service.resources.filter(r => r.cost < 0);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600">{getServiceIcon(service.service)}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{service.service}</h3>
              <p className="text-sm text-gray-600">{service.resources.length} resources</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className={`text-xl font-bold ${service.totalCost >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {service.totalCost >= 0 ? '' : '-'}{formatCurrency(service.totalCost)}
              </div>
            </div>
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-3">
            {positiveResources.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Active Resources</h4>
                <div className="space-y-2">
                  {positiveResources.map((resource, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-white rounded border">
                      <div>
                        <div className="font-mono text-sm text-gray-800">
                          {resource.id === 'NoResourceId' ? 'Unspecified Resource' : resource.id}
                        </div>
                        <div className="text-xs text-gray-500">{resource.region}</div>
                      </div>
                      <div className="text-red-600 font-medium">{formatCurrency(resource.cost)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {negativeResources.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Credits/Refunds</h4>
                <div className="space-y-2">
                  {negativeResources.map((resource, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                      <div>
                        <div className="font-mono text-sm text-gray-800">
                          {resource.id === 'NoResourceId' ? 'Unspecified Resource' : resource.id}
                        </div>
                        <div className="text-xs text-gray-500">{resource.region}</div>
                      </div>
                      <div className="text-green-600 font-medium">-{formatCurrency(resource.cost)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AWSCostDashboard = () => {
  const [expandedServices, setExpandedServices] = useState({});
  const [costData, setCostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    loadCostData();
  }, []);

  const loadCostData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetch_cost();

      if (data && Array.isArray(data)) {
        setCostData(data);
        setLastUpdated(new Date());
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      console.error('Error fetching cost data:', err);
      setError(err.message || 'Failed to fetch cost data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadCostData();
  };

  const toggleService = (index) => {
    setExpandedServices(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const summary = useMemo(() => {
    const totalCost = costData.reduce((sum, service) => sum + service.totalCost, 0);
    const totalResources = costData.reduce((sum, service) => sum + service.resources.length, 0);
    const activeServices = costData.filter(service => service.totalCost > 0).length;
    const regions = new Set();
    costData.forEach(service => {
      service.resources.forEach(resource => regions.add(resource.region));
    });
    return { totalCost, totalResources, activeServices, regionCount: regions.size };
  }, [costData]);

  const chartData = useMemo(() => {
    return costData
      .filter(service => service.totalCost > 0)
      .map(service => ({
        name: service.service.replace('Amazon ', '').replace('AWS ', ''),
        cost: service.totalCost,
        fullName: service.service
      }))
      .sort((a, b) => b.cost - a.cost);
  }, [costData]);

  const regionData = useMemo(() => {
    const regionCosts = {};
    costData.forEach(service => {
      service.resources.forEach(resource => {
        if (resource.cost > 0) {
          regionCosts[resource.region] = (regionCosts[resource.region] || 0) + resource.cost;
        }
      });
    });
    return Object.entries(regionCosts)
      .map(([region, cost]) => ({ region, cost }))
      .sort((a, b) => b.cost - a.cost);
  }, [costData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading AWS Cost Data</h2>
          <p className="text-gray-600">Fetching your latest cost information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={handleRefresh} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto">
            <RefreshCw className="w-4 h-4 mr-2" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AWS Cost Dashboard</h1>
            <p className="text-gray-600">Monitor and analyze your AWS service costs</p>
            {lastUpdated && <p className="text-sm text-gray-500 mt-1">Last updated: {lastUpdated.toLocaleString()}</p>}
          </div>
          <button onClick={handleRefresh} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600"><DollarSign className="w-6 h-6" /></div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalCost)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600"><Server className="w-6 h-6" /></div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Active Services</h3>
                <p className="text-2xl font-bold text-gray-900">{summary.activeServices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600"><Database className="w-6 h-6" /></div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Resources</h3>
                <p className="text-2xl font-bold text-gray-900">{summary.totalResources}</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h3 className="text-sm font-medium text-gray-500">Services</h3>
            <p className="text-xl font-bold text-gray-900">{costData.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h3 className="text-sm font-medium text-gray-500">Regions</h3>
            <p className="text-xl font-bold text-gray-900">{summary.regionCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <h3 className="text-sm font-medium text-gray-500">Resources</h3>
            <p className="text-xl font-bold text-gray-900">{summary.totalResources}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost by Service</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Cost']} labelFormatter={(label) => chartData.find(d => d.name === label)?.fullName || label} />
                <Bar dataKey="cost" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={regionData} cx="50%" cy="50%" labelLine={false} label={({ region, cost }) => `${region}: ${formatCurrency(cost)}`} outerRadius={80} fill="#8884d8" dataKey="cost">
                  {regionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
          {costData.map((service, index) => (
            <ServiceCard key={index} service={service} isExpanded={expandedServices[index]} onToggle={() => toggleService(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AWSCostDashboard;
