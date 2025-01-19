'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const roadmapSteps = [
  {
    id: '01',
    date: '2025 Q1',
    title: 'Essentials Version(V1)',
    description: 'Establish the foundational architecture and enable basic AI analysis capabilities',
    image: '/images/roadmap/essentials.svg'
  },
  {
    id: '02',
    date: '2025 Q2',
    title: 'Essentials Version(V2)',
    description: 'Release production of web version',
    image: '/images/roadmap/essentials.svg'
  },
  {
    id: '03',
    date: '2025 Q3',
    title: 'Studio Version',
    description: 'Enhance the platform with advanced AI capabilities for market trend prediction',
    image: '/images/roadmap/studio.svg'
  },
  {
    id: '04',
    date: '2025 Q4',
    title: 'Ultimate Version',
    description: 'Launch a comprehensive version with mobile support and AI-driven active trading capabilities',
    image: '/images/roadmap/ultimate.svg'
  },
  {
    id: '05',
    date: '2026',
    title: 'Future',
    description: 'Broaden the application of AI to more use cases and industries',
    image: '/images/roadmap/future.svg'
  }
];

const RoadmapSection = () => {
  return (
    <div className="py-24 px-4 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold mb-4">Roadmap</h3>
        <p className="text-lg mb-12 text-gray-400">Our Development Timeline</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-yellow-500 opacity-20" />

          <div className="space-y-12">
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 md:text-right">
                  <div
                    className={`bg-neutral-800 p-6 rounded-xl relative ${
                      index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <div className="w-12 h-12 flex-shrink-0">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="flex-1" />
                      <div className="max-w-xl">
                        <span className="inline-block px-3 py-1 bg-yellow-500 bg-opacity-20 text-yellow-500 rounded-full text-sm mb-2">
                          {step.date}
                        </span>
                        <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSection;
