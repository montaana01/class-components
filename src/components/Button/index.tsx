import type { ButtonOptions } from '../../types';

export default function Button({ title, onClick, disabled }: ButtonOptions) {
  return (
    <button className="detail-close" onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
}
