import React from 'react';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

import emailjs from '@emailjs/browser';

const Footer = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Replace these with your actual EmailJS credentials
    // Get them from: https://dashboard.emailjs.com/admin
    const serviceId = 'service_i1ueq8k';
    const templateId = 'template_oahskcj';
    const publicKey = 'f22gv8DVnnGoz6sef';

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Pawan', // Your name
        },
        publicKey
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-black text-white py-24 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="text-center mb-16">
          <h2 className="text-[6vw] md:text-[4vw] leading-none font-display font-bold uppercase mb-6">
            Let's Collaborate
          </h2>
          <p className="text-gray-400 font-light text-lg">
            Got a project in mind? Let's build something amazing together.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-gray-500">Name</label>
              <input 
                type="text" 
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-lg px-4 py-3 outline-none transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-gray-500">Email</label>
              <input 
                type="email" 
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-lg px-4 py-3 outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-gray-500">Message</label>
            <textarea 
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-lg px-4 py-3 outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-mono uppercase tracking-widest text-sm py-4 rounded-lg transition-all
              ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200'}
              ${submitStatus === 'success' ? '!bg-green-500 !text-white' : ''}
              ${submitStatus === 'error' ? '!bg-red-500 !text-white' : ''}
            `}
          >
            {isSubmitting ? 'Sending...' : 
             submitStatus === 'success' ? 'Message Sent!' : 
             submitStatus === 'error' ? 'Failed to Send. Try again.' : 
             'Send Message'}
          </button>
        </form>

        <div className="flex justify-center gap-8 mb-12">
            <a href="mailto:pawanpandit9834@gmail.com" className="hover:scale-110 transition-transform"><Mail size={24} /></a>
            <a href="https://github.com/PAWANKUAMARPANDIT" target="_blank" className="hover:scale-110 transition-transform"><Github size={24} /></a>
            <a href="https://twitter.com/PawanPa98011176" target="_blank" className="hover:scale-110 transition-transform"><Twitter size={24} /></a>
            <a href="https://www.linkedin.com/in/pawan-kuamar-pandit-595676176/" target="_blank" className="hover:scale-110 transition-transform"><Linkedin size={24} /></a>
        </div>

        <p className="text-center text-xs font-mono text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Pawan Kumar Pandit
        </p>

      </div>
    </footer>
  );
};

export default Footer;
