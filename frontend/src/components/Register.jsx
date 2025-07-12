import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Account created successfully!');
        // Optional: redirect to login page
      } else {
        alert('Failed to create account.');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="logincontainer w-full h-[80%] flex items-center justify-center">
      <div className="loginpanel">
        <h3 className="text-2xl mb-3">Create account</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-start">
          <input
            className="block px-3 py-2 border-[1px] border-zinc-100 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="block px-3 py-2 border-[1px] border-zinc-100 rounded-md"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="block px-3 py-2 border-[1px] border-zinc-100 rounded-md"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="block px-3 py-2 border-[1px] border-zinc-100 rounded-md"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="block px-4 py-2 bg-blue-500 rounded-md text-white cursor-pointer"
            type="submit"
            value="Create"
          />
        </form>
        <a className="mt-5 inline-block text-blue-500" href="/">
          Have an account? Login here.
        </a>
      </div>
    </div>
  );
};

export default Register;
