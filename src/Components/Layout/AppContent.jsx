import {Layout, Typography} from "antd";
import React from "react";
import {useCrypto} from "../../Context/crypto-context.jsx";
import PortfolioChart from "../PortfolioChart.jsx";
import AssetsTable from "../AssetsTable.jsx";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: 'whitesmoke',
    padding: '1rem'
}

export default function AppContent() {
    const {assets, crypto} = useCrypto()

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{ textAlign: 'left' }}>
                Total amount of money: {assets.map( asset => {
                    const coin = crypto.find( c => c.id === asset.id )
                    return asset.amount * coin.price
            } ).reduce((acc, cur) => {
                return acc+= cur
            }, 0).toFixed(2)}$
            </Typography.Title>

            <PortfolioChart />
            <AssetsTable />

        </Layout.Content>
    )
}