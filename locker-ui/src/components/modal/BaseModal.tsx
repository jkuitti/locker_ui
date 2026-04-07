import type { BaseModalProps } from "../../types/baseModal";

const BaseModal = ({ title, children, onClose }: BaseModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}

        {children}
      </div>
    </div>
  );
};

export default BaseModal;
