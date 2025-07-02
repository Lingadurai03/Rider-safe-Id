// app/[locale]/test/page.tsx
import { notFound } from 'next/navigation';

export default function TestPage() {
  notFound(); // Force trigger
}
