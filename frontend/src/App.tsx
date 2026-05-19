import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ChatProvider } from '@/context/ChatContext';
import Home from '@/pages/Home';
import SobrePage from '@/pages/SobrePage';
import ServicosPage from '@/pages/ServicosPage';
import PlanosPage from '@/pages/PlanosPage';
import ContatoPage from '@/pages/ContatoPage';
import NotFound from '@/pages/NotFound';
import AdminLogin from '@/pages/admin/Login';
import ChatAdmin from '@/pages/admin/ChatAdmin';

export default function App() {
  return (
    <ChatProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/planos" element={<PlanosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/chat" element={<ChatAdmin />} />
      </Routes>
    </ChatProvider>
  );
}
