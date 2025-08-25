import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const CioComponents = ({ selector, includeCSS = true, ...rest }) => {
  if (document) {
    const stylesheet = document.getElementById('cio-components-styles');
    const containerElement = document.querySelector(selector);

    if (!containerElement) {
      console.error(`CioComponents: There were no elements found for the provided selector`);

      return;
    }

    if (stylesheet) {
      stylesheet.disabled = !includeCSS;
    }

    ReactDOM.createRoot(containerElement).render(<React.StrictMode></React.StrictMode>);
  }
};

if (window) {
  window.CioComponents = CioComponents;
}

export default CioComponents;
