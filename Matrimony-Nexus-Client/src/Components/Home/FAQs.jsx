import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questionsAnswers = [
    {
      question: "What is bdmarriage.com?",
      answer:
        "bdmarriage.com is a trusted matrimony platform that connects people looking for meaningful relationships and marriage in Bangladesh.",
    },
    {
      question: "Is bdmarriage.com free to use?",
      answer:
        "Yes, you can register for free. We also offer premium services for advanced matchmaking options.",
    },
    {
      question: "How can I register on the platform?",
      answer:
        "Click on the 'Register Free Now' button on the homepage and fill out your basic details to create an account.",
    },
    {
      question: "Are my details secure?",
      answer:
        "Absolutely! We prioritize your privacy and use advanced security measures to keep your information safe.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach out to our support team via email at support@bdmarriage.com or use the contact form on our website.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-8 ">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {questionsAnswers.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.question}
                </h3>
                <span className="text-gray-600">
                  {activeIndex === index ? <ChevronDown /> : <ChevronRight />}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
