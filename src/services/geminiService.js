// A simple service to handle AI responses for career advice

const geminiService = {
  generateCareerAdvice: async (message) => {
    // In a real app, this would call the Gemini API
    // For now, we'll use a simple pattern matching approach
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm your AI Career Coach. How can I help with your career journey today?";
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return "For a standout resume, focus on quantifiable achievements rather than just listing responsibilities. Use action verbs and tailor your resume for each job application. Would you like specific tips for your industry?";
    } else if (lowerMessage.includes('interview')) {
      return "Prepare for interviews by researching the company, practicing common questions, and preparing examples that showcase your skills. Remember to also prepare questions to ask the interviewer. Would you like some common interview questions for practice?";
    } else if (lowerMessage.includes('skill')) {
      return "In today's job market, employers value both technical and soft skills. Technical skills like data analysis, programming, and digital marketing are in demand, while soft skills like communication, adaptability, and problem-solving are equally important. Which area would you like to develop?";
    } else if (lowerMessage.includes('change career') || lowerMessage.includes('switch job') || lowerMessage.includes('new field')) {
      return "Changing careers is a significant step. Start by identifying transferable skills, researching new industries, and possibly acquiring new qualifications. Networking and informational interviews can also provide valuable insights. What field are you considering moving into?";
    } else {
      return "That's an interesting question. While I don't have specific information on that topic, I'd recommend researching industry reports, networking with professionals in your field, or consulting with a career counselor for more personalized advice.";
    }
  }
};

export default geminiService;