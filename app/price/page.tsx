"use client";
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { CheckCircle2, XCircle, ChevronRight, Zap, Cloud, Globe } from 'lucide-react';
import LoadingSpinner from '../../components/oui/LoadingSpinner'; // Import the LoadingSpinner component
import { BasicSidebarLayout } from '@/components/basic_sidebar_layout'; // Assuming this path is correct for your project

const PricingPage = () => {
  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a 20-second loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 20 seconds
    }, 2); // 20000 milliseconds = 20 seconds

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  // Define pricing plans with their features and details
  const pricingPlans = [
    {
      name: 'Starter',
      price: '$99',
      duration: 'per month',
      description: 'Ideal for small teams getting started with cloud optimization.',
      features: [
        { text: 'Single Cloud Provider (AWS)', included: true },
        { text: 'Basic Cost & Usage Tracking', included: true },
        { text: 'Standard Dashboard & Reports', included: true },
        { text: 'Limited ML-based Recommendations', included: true },
        { text: 'Email Support', included: true },
        { text: 'Multi-Cloud Account Handling', included: false },
        { text: 'Advanced Anomaly Detection', included: false },
        { text: 'Real-time Analytics', included: false },
        { text: 'Dedicated Account Manager', included: false },
      ],
      buttonText: 'Start Free Trial',
      buttonLink: '#', // Placeholder link
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$499',
      duration: 'per month',
      description: 'Comprehensive features for growing businesses with diverse cloud needs.',
      features: [
        { text: 'Multi-Cloud Provider (AWS, Azure, GCP)', included: true },
        { text: 'Advanced Cost & Usage Tracking', included: true },
        { text: 'Customizable Dashboards & Reports', included: true },
        { text: 'Full ML-based Recommendations', included: true },
        { text: 'Advanced Anomaly Detection', included: true },
        { text: 'Email & Chat Support', included: true },
        { text: 'Multi-Cloud Account Handling', included: true },
        { text: 'Real-time Analytics (Basic)', included: true },
        { text: 'Dedicated Account Manager', included: false },
      ],
      buttonText: 'Get Started',
      buttonLink: '#', // Placeholder link
      highlight: true, // Highlight this plan
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      duration: 'per month',
      description: 'Tailored solutions for large enterprises with complex, expansive cloud environments.',
      features: [
        { text: 'All Cloud Providers', included: true },
        { text: 'Unlimited Cost & Usage Tracking', included: true },
        { text: 'Customizable Dashboards & Advanced Reports', included: true },
        { text: 'Full ML-based Recommendations & Custom Models', included: true },
        { text: 'Advanced Anomaly Detection & Predictive Insights', included: true },
        { text: 'Priority 24/7 Support', included: true },
        { text: 'Unlimited Multi-Cloud Account Handling', included: true },
        { text: 'Real-time Analytics (Advanced)', included: true },
        { text: 'Dedicated Account Manager', included: true },
      ],
      buttonText: 'Contact Sales',
      buttonLink: '#', // Placeholder link
      highlight: false,
    },
  ];

  return (
    <BasicSidebarLayout>
      {/* Conditionally render the LoadingSpinner or the Pricing Page content */}
      {isLoading ? (
        <LoadingSpinner   />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Pricing Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 leading-tight rounded-md p-4">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto rounded-md p-2">
              Choose the plan that best fits your cloud optimization needs. Scale effortlessly as you grow.
            </p>
          </div>

          {/* Pricing Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`
                  relative bg-white rounded-2xl shadow-xl flex flex-col p-8 transition-all duration-300 transform
                  ${plan.highlight
                    ? 'ring-4 ring-indigo-500 scale-105 z-10 hover:shadow-2xl'
                    : 'ring-1 ring-gray-200 hover:shadow-2xl hover:scale-102'
                  }
                `}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">{plan.name}</h2>
                <p className="text-5xl font-extrabold text-gray-900 mb-2 text-center">
                  {plan.price}
                  {plan.price !== 'Custom' && (
                    <span className="text-xl font-medium text-gray-600"> {plan.duration}</span>
                  )}
                </p>
                <p className="text-gray-600 mb-8 text-center">{plan.description}</p>

                {/* Features List */}
                <ul className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      {feature.included ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                      )}
                      <span className={`${feature.included ? 'text-gray-700' : 'text-gray-500 line-through'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Call to Action Button */}
                <a
                  href={plan.buttonLink}
                  className={`
                    mt-auto block w-full text-center py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform
                    ${plan.highlight
                      ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:scale-105 hover:shadow-xl'
                      : 'bg-blue-100 text-blue-700 ring-2 ring-blue-300 hover:bg-blue-200 hover:scale-102 hover:shadow-md'
                    }
                  `}
                >
                  {plan.buttonText}
                  <ChevronRight className="inline-block h-5 w-5 ml-2" />
                </a>
              </div>
            ))}
          </div>

          {/* Benefits / FAQ Section */}
          <div className="mt-20 max-w-4xl w-full text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8 rounded-md p-3 bg-blue-100">
              Why Choose SkyBridge?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                <Zap className="h-10 w-10 text-indigo-500 mb-4 transition-colors duration-300 group-hover:text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Proactive Savings</h3>
                <p className="text-gray-600">Our ML-driven recommendations anticipate costs, ensuring you always optimize spending.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                <Cloud className="h-10 w-10 text-indigo-500 mb-4 transition-colors duration-300 group-hover:text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unified Visibility</h3>
                <p className="text-gray-600">See all your cloud resources and costs from AWS, Azure, and GCP in one place.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                <Globe className="h-10 w-10 text-indigo-500 mb-4 transition-colors duration-300 group-hover:text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Scalable & Secure</h3>
                <p className="text-gray-600">Built to grow with your enterprise, with robust security and access controls.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </BasicSidebarLayout>
  );
};

export default PricingPage;
