export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  cls?: string;
  title?: React.ReactNode | string;
}
