import React from 'react'
import Layout from '../components/common/Layout.jsx'
import RegisterForm from '../components/auth/RegisterForm.jsx'

const Register = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </Layout>
  )
}

export default Register