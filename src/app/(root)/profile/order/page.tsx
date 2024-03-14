import ProfileLayout from "../layout";

function OrderPage() {
    return (
        <>Order Page!</>
    );  
}

OrderPage.getLayout = function getLayout(page: React.ReactElement) {
    return <ProfileLayout>{page}</ProfileLayout>
}

export default OrderPage;