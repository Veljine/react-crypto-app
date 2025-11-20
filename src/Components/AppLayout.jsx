import AppHeader from "./Layout/AppHeader.jsx";
import {Layout, Spin} from "antd";
import AppSider from "./Layout/AppSider.jsx";
import AppContent from "./Layout/AppContent.jsx";
import {useCrypto} from "../Context/crypto-context.jsx";

export default function AppLayout() {
    const {loading} = useCrypto();

    if (loading) {
        return <Spin fullscreen />
    }

    return (
        <Layout>

            <AppHeader />

            <Layout>

                <AppSider />
                <AppContent />

            </Layout>

        </Layout>
    )
}