import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";
import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import DarkSpotEffect from "../DarkSpotEffect.jsx";

export default function AppLayout() {
  const layoutStyle = {
    maxHeight: '100vh',
    overflow: 'hidden',
  }

  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout style={layoutStyle}>
      <DarkSpotEffect />
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
