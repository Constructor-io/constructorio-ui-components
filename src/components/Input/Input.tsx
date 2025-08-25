import React, { useEffect, useState } from 'react';

interface InputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onSubmit: (value: string) => void;
}

function SendIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='.icon-send'>
        <path
          id='Vector'
          d='M14.8934 7.09533L14.8884 7.09314L1.54219 1.55752C1.42993 1.51053 1.30778 1.49211 1.18666 1.50388C1.06554 1.51566 0.949225 1.55728 0.848125 1.62502C0.741311 1.69501 0.653573 1.79045 0.592805 1.90277C0.532037 2.01509 0.500145 2.14075 0.5 2.26845V5.80877C0.50006 5.98335 0.561019 6.15243 0.67237 6.28689C0.783722 6.42134 0.938491 6.51274 1.11 6.54533L8.38906 7.89127C8.41767 7.89669 8.44348 7.91193 8.46205 7.93435C8.48062 7.95677 8.49078 7.98497 8.49078 8.01408C8.49078 8.04319 8.48062 8.07139 8.46205 8.09381C8.44348 8.11623 8.41767 8.13147 8.38906 8.13689L1.11031 9.48283C0.938851 9.51533 0.784092 9.60661 0.67269 9.74094C0.561288 9.87528 0.500219 10.0443 0.5 10.2188V13.7597C0.499917 13.8816 0.530111 14.0017 0.587871 14.1091C0.645632 14.2165 0.729152 14.3079 0.830938 14.375C0.953375 14.4564 1.09706 14.4998 1.24406 14.5C1.34626 14.4999 1.4474 14.4794 1.54156 14.4397L14.8875 8.93564L14.8934 8.93283C15.0731 8.85563 15.2262 8.72745 15.3337 8.56415C15.4413 8.40086 15.4986 8.20961 15.4986 8.01408C15.4986 7.81855 15.4413 7.6273 15.3337 7.46401C15.2262 7.30071 15.0731 7.17253 14.8934 7.09533Z'
          fill='white'
        />
      </g>
    </svg>
  );
}

function Input({
  value: providedValue,
  placeholder = 'Ask anything',
  disabled = false,
  onSubmit,
}: InputProps) {
  const [value, setValue] = useState(providedValue || '');

  useEffect(() => {
    if (providedValue) {
      setValue(providedValue);
    }
  }, [providedValue]);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  const handleSubmitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='cio-components-input-container'>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleSubmitOnEnter}
        placeholder={placeholder}
        disabled={disabled}
        className='cio-components-input'
      />
      <button
        type='button'
        onClick={handleSubmit}
        className='cio-components-send-button'
        disabled={disabled}>
        Send
        <SendIcon />
      </button>
    </div>
  );
}

export default Input;
