import Link from "next/link"

export default function FooterLinks() {

    interface FooterLinks {
        title: string,
        link: string,
        isLast: boolean
    }

    const links:FooterLinks[] = [
        {
            title: 'CONTACTS',
            link: '/contacts',
            isLast: false,
        },
        {
            title: 'DELIVERY & RETURNS',
            link: '/delivery&returns',
            isLast: false,
        },
        {
            title: 'BLOG',
            link: '/blog',
            isLast: true,
        },
    ]

    return(
        <div className="w-full flex items-center gap-3 py-6 border-t border-b border-[#5a5a5a]  ">
            {links.map((link) => (
                <>
                    <Link href={link.link} className="font-lato font-bold text-white lg:text-xl md:text-base sm:text-sm hover:underline">
                        {link.title}
                    </Link>
                    {!link.isLast && <div className="w-1 h-1 bg-white rounded-full"></div>}
                </>
            ))}
        </div>
    )
}