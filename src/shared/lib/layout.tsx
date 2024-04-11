import Footer from "@/modules/Footer";
import Header from "@/modules/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='grid h-screen grid-rows-[_1fr_auto] pt-[4.625rem] lg:pt-32'>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}