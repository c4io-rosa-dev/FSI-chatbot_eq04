import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { ChatBubble } from './ChatBubble';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { useReveal } from '@/hooks/useReveal';

export function Layout() {
  const location = useLocation();

  useReveal([location.pathname]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatBubble />
      <Chatbot />
    </>
  );
}
