import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from './Icons';

const FormInput = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getAutoCompleteValue = (name) => {
    switch (name) {
      case 'email':
        return 'username';
      case 'password':
        return 'current-password';
      case 'newPassword':
        return 'new-password';
      case 'confirmPassword':
        return 'new-password';
      default:
        return 'off';
    }
  };

  return (
    <div className="relative mb-4">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={getAutoCompleteValue(name)}
          pattern={name === "password" ? "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$" : undefined}
          title={
            name === "password"
              ? "Password must be at least 8 characters and include uppercase, lowercase, and a number"
              : undefined
          }
          className={`w-full p-3 ${
            icon ? 'pl-10' : 'pl-3'
          } pr-${showPasswordToggle ? '10' : '3'} border rounded-lg focus:outline-none focus:ring-2 transition-all
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}
            ${error ? 'bg-red-50' : 'bg-white'}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
