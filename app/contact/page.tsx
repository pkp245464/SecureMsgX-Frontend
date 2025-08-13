// app/contact/page.tsx

import { Container } from '@/app/components/ui/Container';
import { Card } from '@/app/components/ui/card';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function ContactPage() {
  return (
    <Container className="py-12">
      <Card title="Contact the Developer">
        <div className="space-y-6 text-gray-800">
          <p className="text-lg">
            If you have questions, feedback, or collaboration ideas, feel free to reach out through any of the channels below.
          </p>

          <div className="space-y-4">

            {/* Email */}
            <div className="flex items-center space-x-3">
              <MdEmail className="text-2xl text-red-600" />
              <a 
                href="mailto:pankajkumar245464@gmail.com" 
                className="text-blue-600 hover:underline text-lg"
              >
                pankajkumar245464@gmail.com
              </a>
            </div>

            {/* GitHub */}
            <div className="flex items-center space-x-3">
              <FaGithub className="text-2xl text-gray-800" />
              <a 
                href="https://github.com/pkp245464" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-lg"
              >
                github.com/pkp245464
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center space-x-3">
              <FaLinkedin className="text-2xl text-blue-700" />
              <a 
                href="https://www.linkedin.com/in/pkp245464/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-lg"
              >
                linkedin.com/in/pkp245464
              </a>
            </div>

            {/* Instagram */}
            <div className="flex items-center space-x-3">
              <FaInstagram className="text-2xl text-pink-500" />
              <a 
                href="https://instagram.com/pkp245464" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline text-lg"
              >
                instagram.com/pkp245464
              </a>
            </div>

            {/* Twitter (X) */}
            <div className="flex items-center space-x-3">
              <FaTwitter className="text-2xl text-blue-500" />
              <a 
                href="https://twitter.com/pkp245464" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-lg"
              >
                twitter.com/pkp245464
              </a>
            </div>

          </div>
        </div>
      </Card>
    </Container>
  );
}
