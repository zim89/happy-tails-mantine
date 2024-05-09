import Footer from '@/modules/Footer';
import Header from '@/modules/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* Padding top equals size of top navbar */}
      <div className='grid h-screen grid-rows-[_1fr_auto] pt-[74px] md:pt-[128px]'>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
