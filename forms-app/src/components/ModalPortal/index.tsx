import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ModalPortalProps } from "@/types";

export default function ModalPortal({ open, onClose, labelledBy, children }: ModalPortalProps) {
  const elementReference = useRef<HTMLDivElement | null>(null);
  const lastActive = useRef<Element | null>(null);

  if (!elementReference.current) {
    elementReference.current = document.createElement('div');
  }

  useEffect(() => {
    const node = elementReference.current!;
    node.setAttribute('role', 'dialog');
    node.setAttribute('aria-modal', 'true');
    if (labelledBy) node.setAttribute('aria-labelledby', labelledBy);
    document.body.append(node);
    return () => {
      node.remove();
    };
  }, [labelledBy]);

  useEffect(() => {
    function onKey(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === 'Escape') onClose();
    }

    if (open) {
      lastActive.current = document.activeElement;
      document.addEventListener('keydown', onKey);
    }

    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.target === mouseEvent.currentTarget) onClose();
      }}
    >
      <div className="modal" onMouseDown={(mouseEvent) => mouseEvent.stopPropagation()}>
        {children}
      </div>
    </div>,
    elementReference.current,
  );
}
