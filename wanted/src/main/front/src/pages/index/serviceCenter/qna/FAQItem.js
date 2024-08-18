import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={toggleOpen}>
                {question}
            </div>
            {isOpen && <div className="faq-answer">{answer}</div>}
        </div>
    );
};

export default FAQItem;
