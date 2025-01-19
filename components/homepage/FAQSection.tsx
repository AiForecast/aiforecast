import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is AiForecast?",
      answer: "AiForecast is a powerful AI-driven platform designed to provide accurate predictions and insights for various industries.",
    },
    {
      question: "When will AiForecast be available?",
      answer: "AiForecast is currently in development and is expected to be available by Q1 2025.",
    },
    {
      question: "Is AiForecast open source?",
      answer: "Yes, AiForecast is a proprietary platform, you can find in github address",
    },
    {
      question: "What features does AiForecast offer?",
      answer: "AiForecast offers features such as real-time data analysis, predictive modeling, and customizable dashboards.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b border-gray-200 pb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <span className="text-xl">
              {activeIndex === index ? "-" : "+"}
            </span>
          </div>
          {activeIndex === index && (
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};


export default FAQSection;
