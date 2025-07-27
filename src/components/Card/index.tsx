type CardProps = {
  name: string;
  url: string;
};

export default function Card({ name, url }: CardProps) {
  return (
    <a href={url}>
      <strong>{name}</strong>
    </a>
  );
}
