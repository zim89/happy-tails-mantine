export async function generateMetadata() {
    return {
        title: "Happy Tails Wishlist | Save Your Favorite Dog Products",
        description: "Save your favorite dog products on your Happy Tails wishlist! Share with friends & family or come back later to purchase."
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}