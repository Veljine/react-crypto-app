import {Divider, Flex, Tag, Typography} from "antd";

export default function CoinInfoModal( {coin} ) {
    return (
        <>

            <Flex align="center">
                <img src={coin.icon} alt={coin.name} style={{ width: 40 }}/>
                <Typography.Title level={3} style={{ margin: 10 }}>
                    ({ coin.symbol })
                    {` ${coin.name}`}
                </Typography.Title>
            </Flex>

            <Divider />

        <Typography.Paragraph>
            <Typography.Text strong>
                1 hour: <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
            </Typography.Text>

            <Typography.Text strong>
                1 day: <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
            </Typography.Text>

            <Typography.Text strong>
                1 week: <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
            </Typography.Text>
        </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong>
                    Price: {coin.price.toFixed(2)}$
                </Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong>
                    Price BTC: {coin.priceBtc.toFixed(2)}
                </Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong>
                    Market Capitalization: {coin.marketCap.toFixed(2)}$
                </Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong>
                    Contract Address: {coin.contractAddress}
                </Typography.Text>
            </Typography.Paragraph>

        </>
    )
}