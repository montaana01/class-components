import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/search?page=1');
}
