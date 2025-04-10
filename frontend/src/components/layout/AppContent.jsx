import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";
import './styles/AppContent.css'


export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content className="content">
      <PortfolioChart style={{marginTop: 200}}/>
      <Typography.Title
        level={3}
        className="title"
        style={{ textAlign: "left", color: "#646464" }}
      >
        Общая цена портфеля: {""}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <AssetsTable />
    </Layout.Content>
  );
}
