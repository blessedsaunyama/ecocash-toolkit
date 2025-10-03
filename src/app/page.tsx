import { DashboardClient } from '@/components/dashboard-client';

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-body p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold text-primary">
            EcoCash Toolkit
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            A prototype for testing the EcoCash Payment SDK.
          </p>
        </header>
        <DashboardClient />
      </div>
    </main>
  );
}
