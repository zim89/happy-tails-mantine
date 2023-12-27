import Link from "next/link"
import {footerLinks} from '@/lib/data'
import clsx from 'clsx';

export default function FooterLinks() {

    return(
        <div className="w-full flex items-center gap-3 py-6 border-t border-b border-[#5a5a5a] ">
            {footerLinks.map((link) => (
                <>
                    <Link 
                    key={link.title}
                    href={link.link}
                    className={clsx(
                    'text-primary font-bold relative text-base after:absolute after:-bottom-[1px] after:left-0 after:block after:h-[1px] after:w-full after:scale-0 after:bg-primary after:transition-transform after:duration-300 after:hover:scale-100 md:text-xl md:leading-6')}>
                        {link.title}
                    </Link>
                    {!link.isLast && <span className="w-1 h-1 bg-white rounded-full"></span>}
                </>
            ))}
        </div>
    )
}