import React, {useRef, useState} from "react";
import {Divider, Flex, Select, Space, Typography, Form, InputNumber, Button, DatePicker, Result} from "antd";
import {useCrypto} from "../Context/crypto-context.jsx";

export default function AddAssetForm({onClose}) {
    const [form] = Form.useForm();
    const [coin, setCoin] = useState(null);
    const { crypto, addAsset } = useCrypto();
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef()

    if(submitted){
        return (
            <Result
                status="success"
                title="New Asset Added Successfully!"
                subTitle={`Added: ${assetRef.current.amount} of ${coin.name} by price: ${assetRef.current.price} on a date of: ${assetRef.current.date}`}
                extra={[
                    <Button type="primary" key="console" onClick={ onClose }>
                        Close
                    </Button>
                ]}
            />
        )
    }


    if(!coin) {
        return (
            <Select
                onSelect={ v =>  setCoin( crypto.find(c => c.id === v) ) }
                style={{ width: '100%' }}
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
        )
    }

    const validateMessages = {
        numbers: {
            range: '${coin.label} must be between ${min} and ${max}!'
        }
    };

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset;
        addAsset(newAsset);
        setSubmitted(true);
    }

    function handleAmountChange(value) {
        const price =  form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2)
        })
    }

    function handlePriceChange(value) {
        const amount =  form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2)
        })
    }

    return (

            <Form
                form={form}
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    price: +coin.price.toFixed(2),
                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >

            <Flex align="center">
                <img
                    src={coin.icon}
                    alt={coin.name}
                    style={{ width: 40 }}
                />
                <Typography.Title
                    level={3}
                    style={{ margin: 10 }}
                >
                    {coin.name}
                </Typography.Title>
            </Flex>

                <Divider />

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, type: 'number', min: 0 }]}
                >
                    <InputNumber
                        placeholder='Enter coin amount'
                        onChange={handleAmountChange}
                        style={{ width: '100%' }}/>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                >
                    <InputNumber onChange={handlePriceChange} style={{ width: '100%' }}/>
                </Form.Item>

                <Form.Item
                    label="Total"
                    name="total"
                >
                    <InputNumber disabled style={{ width: '100%' }}/>
                </Form.Item>

                <Form.Item
                    label="Date & Time"
                    name="date"
                >
                    <DatePicker showTime />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Asset
                    </Button>
                </Form.Item>
            </Form>
    )
}