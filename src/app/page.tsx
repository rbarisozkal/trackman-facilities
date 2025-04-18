import { FacilityList } from '../components/facility/FacilityList';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full items-center py-8">
        <FacilityList />
      </main>
    </div>
  );
}
