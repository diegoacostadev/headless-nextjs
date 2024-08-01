import AosLayout from "@/components/aos-layout"


import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <AosLayout/>
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </>
  )
}
