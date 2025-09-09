import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigator Series</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Communication Navigator</li>
              <li>Project Management Navigator</li>
              <li className="text-white font-medium">Quality Planning Navigator</li>
              <li>Reliability Navigator</li>
              <li>Risk Management Navigator</li>
              <li>Procurement Navigator</li>
              <li>Document Control Navigator</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About APLS</h3>
            <p className="text-sm text-gray-300">
              AP-Learning Systems delivers proficiency-based certificate programs for maintenance and project professionals in capital-intensive industries. As the training division of Asset Performance Networks, APLS fills critical gaps where industry-standard qualifications don't exist, developing competency standards from decades of best-practice data across multiple sectors.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-300">
              For support or questions about the Navigator series, please contact our training team.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 AP-Learning Systems, a Division of AP-Networks LLC - ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer