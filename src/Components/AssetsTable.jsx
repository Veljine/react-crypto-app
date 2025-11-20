import { Table } from 'antd';
import {useCrypto} from "../Context/crypto-context.jsx";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        showSorterTooltip: { target: 'full-header' },
        filters: [
            {
                text: 'Bitcoin',
                value: 'Bitcoin',
            },
            {
                text: 'Ethereum',
                value: 'Ethereum',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Dogecoin',
                        value: 'Dogecoin',
                    },
                    {
                        text: 'Tether',
                        value: 'Tether',
                    },
                ],
            },
        ],

        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
    },
];

export default function AssetsTable() {
    const {assets} = useCrypto();
    const data = assets.map( asset => ({
        key: asset.id,
        name: asset.name,
        amount: asset.amount,
        price: asset.price,
    }))

    return (
        <Table
            columns={columns}
            dataSource={data}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    )
}