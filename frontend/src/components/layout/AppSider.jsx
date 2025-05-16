import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';
import './styles/AppSider.css'


export default function AppSider() {
    const {assets} = useContext(CryptoContext)

    return (
        <Layout.Sider width="30%" className='sider'>
            {assets.map(asset => (
                <Card key={asset.id} style={{ marginBottom: '1rem', backgroundColor: '#FAFAFA'}}>
                <Statistic
                    title={capitalize(asset.id)}
                    value={asset.totalAmount}
                    precision={2}
                    valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                    prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    suffix="$"
                />
                <List
                    size='small'
                    dataSource={[
                        { title: 'Прибыль:', value: asset.totalProfit, withTag: true },
                        { title: 'Количество:', value: asset.amount, isPlain: true },
                    ]}
                    renderItem={(item) => (
                    <List.Item>
                        <span>{item.title}</span>
                        <span>
                            {item.withTag && (
                                <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
                            )}
                            {item.isPlain && item.value}
                            {!item.isPlain && (
                              <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>
                              )}
                        </span>
                    </List.Item>
                    )}
                />
            </Card>
            ))}
        </Layout.Sider>
    );
};