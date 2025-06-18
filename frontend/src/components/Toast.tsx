import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      toast.success(message, {
        onClose,
        autoClose: 2000,
        position: 'top-center',
      });
    }
  }, [show, message, onClose]);

  return <ToastContainer />;
};

export default Toast; 