import React from 'react';
import '../styles/ApplicantFAQs.css'; // Import the CSS file

const ApplicantFAQs = () => {
  const faqs = [
    {
      question: "How do I create a profile?",
      answer: "To create a profile, click on the 'Sign Up' or 'Register' button in the top right corner. You'll then be guided through a simple process to enter your details, skills, and experience. Make sure to highlight what makes you unique!"
    },
    {
      question: "What kind of jobs can I find here?",
      answer: "Our platform specializes in informal, short-term, and flexible gigs. This can range from freelance work, errands, local odd jobs, creative projects, teaching, technical support, and much more. Think of anything you can do to help someone in your community!"
    },
    {
      question: "Is there a fee to apply for jobs?",
      answer: "No, it is completely free for applicants to create a profile, browse jobs, and apply for opportunities. We believe in connecting talent with opportunities without barriers."
    },
    {
      question: "How do I apply for a task/gig?",
      answer: "Once you find a task that interests you, click on its title to view the full details. On the task page, you will see a 'Apply' or 'Send Proposal' button. Click it, write a brief message about why you're suitable for the job, and submit your application."
    },
    {
      question: "How long does it take to hear back after applying?",
      answer: "Response times vary as it depends on the individual posting the task. Some may respond within hours, while others might take a few days. We encourage posters to communicate promptly. You can check your dashboard for updates on your applications."
    },
    {
      question: "Can I communicate with the task poster before applying?",
      answer: "For privacy and a smooth application process, direct communication before applying is generally not available. However, you can often ask clarifying questions via a designated 'Ask a Question' feature on the task page or in your application message."
    },
    {
      question: "What happens after I'm selected for a task?",
      answer: "If selected, you'll receive a notification. The platform will then facilitate communication between you and the task poster to finalize details, discuss logistics, and set a schedule. Please ensure you discuss payment terms clearly before starting."
    },
    {
      question: "How does payment work?",
      answer: "Our platform provides tools to help you agree on payment terms. For informal jobs, payment is often handled directly between the applicant and the task poster upon completion of the work, as agreed beforehand. We recommend clear communication to avoid misunderstandings."
    },
    {
      question: "What if there's a problem or dispute?",
      answer: "While we encourage direct resolution, if you encounter a problem or a dispute arises, please refer to our 'Report a Problem' or 'Dispute Resolution' section (link usually in the footer). Our support team can assist in mediating issues."
    },
    {
      question: "How can I improve my chances of getting hired?",
      answer: "Create a detailed and clear profile showcasing your skills. Apply only for tasks you're genuinely qualified for. Write personalized, concise proposals for each application. Good communication and a positive attitude also go a long way!"
    }
  ];

  return (
    <div className="faqs-page">
      <h1>Applicant Frequently Asked Questions</h1>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicantFAQs;