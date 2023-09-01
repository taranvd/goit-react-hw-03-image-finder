import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const optionsToast = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const error = text => {
  toast.error(text, optionsToast);
};

export const warn = text => {
  toast.warn(text, optionsToast);
};

export const info = text => {
  toast.info(text, optionsToast);
};

export const success = text => {
  toast.success(text, optionsToast);
};
