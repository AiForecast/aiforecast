'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Hobby',
      price: 'Free',
      period: '',
      description: 'Includes',
      features: [
        'Pro one-week trial',
        '2000 completions',
        '50 slow premium requests',
        '2 c1-mini uses per day',
      ],
      buttonText: 'Coming song',
      buttonVariant: 'white',
      hasSecondaryButton: true,
      gradient: false,
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '$20' : '$192',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Everything in Hobby, plus',
      features: [
        'Unlimited completions',
        '500 fast premium requests per month',
        'Unlimited slow premium requests',
        '10 c1-mini uses per day',
      ],
      buttonText: 'Coming song',
      buttonVariant: 'gradient',
      hasSecondaryButton: false,
      gradient: true,
    },
    {
      name: 'Business',
      price: billingCycle === 'monthly' ? '$40' : '$384',
      period: '/user/month',
      description: 'Everything in Pro, plus',
      features: [
        'Enforce privacy mode org-wide',
        'Centralized team billing',
        'Admin dashboard with usage stats',
        '100 c1-mini uses per day',
      ],
      buttonText: 'Coming song',
      buttonVariant: 'white',
      hasSecondaryButton: false,
      gradient: false,
    },
  ];

  return (
    <div>
      <div className="py-24 px-4 text-white bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          
          <h3 className="text-4xl font-bold mb-4 text-white">Pricing</h3>
          <p className="text-lg mb-12 text-gray-900 text-white">Choose the plan that works for you</p>

          <div className="flex justify-center mb-12">
            <div className="bg-neutral-800 rounded-lg p-1 flex gap-1">
              <button
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-400'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                MONTHLY(Equivalent Token)
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-400'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                YEARLY (SAVE 20%,Equivalent Token)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-8 bg-neutral-900 border border-neutral-800 relative overflow-hidden ${
                  plan.gradient ? 'before-gradient' : ''
                }`}
                style={
                  plan.gradient
                    ? {
                        position: 'relative',
                      }
                    : {}
                }
              >
                {plan.gradient && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom right, #EC4899, #EF4444, #F59E0B)',
                      opacity: 0.2,
                      pointerEvents: 'none',
                    }}
                  />
                )}
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-neutral-400 mb-1">{plan.period}</span>
                </div>
                <p className="text-neutral-400 mb-4">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <button
                    className={`w-full py-2 rounded-md font-medium transition-all ${
                      plan.buttonVariant === 'gradient'
                        ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90'
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    {plan.buttonText}
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;