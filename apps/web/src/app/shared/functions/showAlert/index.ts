import Swal from 'sweetalert2';
import './styles.css';

interface AlertProps {
  text?: string;
  icon?: 'error' | 'success' | 'warning' | 'info' | 'question';
  position?: 'top' | 'top-start' | 'top-end' | 'top-left' | 'top-right'
  | 'center' | 'center-start' | 'center-end' | 'center-left' | 'center-right'
  | 'bottom' | 'bottom-start' | 'bottom-end' | 'bottom-left' | 'bottom-right';
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
}

const defaultOptions: AlertProps = {
  text: 'Hello',
  icon: 'success',
  position: 'center',
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  showCancelButton: false,
};

const showAlert = (props?: AlertProps) => {
  const {
    text, icon, position, confirmButtonText, cancelButtonText, showCancelButton,
  } = { ...defaultOptions, ...props };
  Swal.fire({
    text,
    icon,
    confirmButtonText,
    position,
    cancelButtonText,
    showCancelButton,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'green-button',
      cancelButton: 'red-button',
    },
  });
};

export default showAlert;
