import {Layout, Select, Space, Button, Modal, Drawer } from "antd";
import React, {useEffect, useState} from "react";
import {useCrypto} from "../../Context/crypto-context.jsx";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
    width: "100%",
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
}

export default function AppHeader() {

    useEffect(() => {
        const keyPress = e => {
            if(e.key === ' ') {
                setSelect(prev => !prev);
            }
        }

        document.addEventListener('keypress', keyPress)


    }, []);

    const [select, setSelect] = useState(false)
    const [coin, setCoin] = useState(null)
    const [modal, setModal] = useState(false)
    const { crypto } = useCrypto()
    const [drawer, setDrawer] = useState(false);

    function handleSelect(value) {
        setModal(true)
        setCoin(crypto.find( c => c.id === value ))
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                onClick={ () => setSelect(prev => !prev) }
                open={select}
                onSelect={ handleSelect }
                style={{ width: 250 }}
                placeholder="select one coin"
                options={crypto.map( coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {' '} {option.data.label}
                    </Space>
                )}
            />

            <Button
                type="primary"
                onClick={ () => setDrawer(true) }
            >Add Asset</Button>

            <Modal
                open={modal}
                onCancel={ () => setModal(false)}
                footer={null}
            >
                <CoinInfoModal coin={coin}/>
            </Modal>

            <Drawer
                width={800}
                title="Add Asset"
                onClose={ () => setDrawer(false) }
                open={drawer}
                destroyOnClose
            >
                <AddAssetForm onClose={() => setDrawer(false)} />

            </Drawer>

        </Layout.Header>
    )
}