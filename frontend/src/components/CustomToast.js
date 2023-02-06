import { toast } from 'react-toastify'
const config={
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};
export function successToast(message){
  toast.success(message, config );
}

export function errorToast(message){
  toast.error(message, config);
}