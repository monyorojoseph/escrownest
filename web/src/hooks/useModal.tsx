import { useState } from 'react';
import Modal from '../components/Modal';

interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  ModalComponent: ({ title, children }: { title: string; children: React.ReactNode }) => JSX.Element | null;
}

export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const ModalComponent = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={title}
    >
      {children}
    </Modal>
  );

  return { isOpen, openModal, closeModal, ModalComponent };
}; 