import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaTwitter, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    learning: [
      { name: 'Job Roles', href: '/roadmaps/job-roles' },
      { name: 'Academic Paths', href: '/roadmaps/academic' },
      { name: 'Suggested Paths', href: '/roadmaps/suggested' },
      { name: 'Company Tracks', href: '/company/tracks' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Practice Projects', href: '/projects' },
      { name: 'Interview Prep', href: '/interview' },
      { name: 'Blog', href: '/blog' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Partners', href: '/partners' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com' },
    { name: 'Discord', icon: FaDiscord, href: 'https://discord.com' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <FaGraduationCap className="text-3xl text-indigo-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  ChaseWay
                </span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                Empowering tech enthusiasts to navigate their learning journey and advance their careers through personalized roadmaps and expert guidance.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Learning Paths
              </h3>
              <ul className="space-y-3">
                {footerLinks.learning.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ChaseWay. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {footerLinks.legal.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
