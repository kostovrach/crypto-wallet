import { Select, Space, Typography, Flex, Divider, Form, InputNumber, Button, DatePicker, Result} from "antd"
import { useState, useRef } from "react"
import { useCrypto } from "../context/crypto-context"
import CoinInfo from "./CoinInfo"

const validateMessages = {
    required: '${label} обязательное поле!',
    types: {
        number: '${label} не является числом!',
    },
    number: {
        range: '${label} должно быть между ${min} и ${max}',
    },
}

export default function AddAssetForm({ onClose }) {
    const [form] = Form.useForm()
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()

    if (submitted) {
        return (
            <Result
                status="success"
                title="Новая позиция добавлена"
                subTitle={`Добавлено ${assetRef.current.amount} ${coin.name} по цене ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Закрыть
                    </Button>
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                //value='Press "/" to search'
                placeholder='Выберите валюту'
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={option => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label} />{''}
                        {option.data.label}
                    </Space>
                )}
            >
            </Select>
        )
    }

    function onFinish(values) {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),

        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),

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
            <CoinInfo coin={coin} />
            <Divider />
            
            <Form.Item
                label="Количество"
                name="amount"
                rules={[{
                    required: true,
                    type: 'number',
                    min: 0,
                }]}
            >
                <InputNumber
                    placeholder="Введите количество"
                    style={{width: '100%'}}
                    onChange={handleAmountChange}
                />
            </Form.Item>
            
            <Form.Item
                label="Цена"
                name="price"
            >
                <InputNumber onChange={handlePriceChange} style={{width: '100%'}} />
            </Form.Item>

            <Form.Item
                label="Дата покупки"
                name="date"
            >
                <DatePicker placeholder="Выберите дату" style={{width: 230}}/>
            </Form.Item>

            <Form.Item
                label="Итог"
                name="total"
            >
                <InputNumber disabled style={{width: '100%'}} />
            </Form.Item>
            
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#132F49" }}>
                    Добавить
                </Button>
            </Form.Item>
        </Form>
    )
}