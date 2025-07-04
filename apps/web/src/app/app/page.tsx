import { createClient } from '../../../utils/supabase/server';
import Link from 'next/link';

export default async function PWAApp() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">uDance PWA</h1>
            <div className="text-white/80 text-sm">
              {user?.email}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Welcome Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-2">
            ¡Bienvenido a uDance! 💃
          </h2>
          <p className="text-white/80">
            Descubre eventos de baile cerca de ti y conecta con la comunidad.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-white/80 text-sm">Eventos cerca</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-white/80 text-sm">Amigos online</div>
          </div>
        </div>

        {/* Featured Events */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Eventos Destacados</h3>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <div className="font-medium text-white">Salsa Night</div>
              <div className="text-white/70 text-sm">Hoy 8:00 PM • Club Latino</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <div className="font-medium text-white">Bachata Workshop</div>
              <div className="text-white/70 text-sm">Mañana 7:00 PM • Studio Dance</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-20">
          <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-white font-medium">
            🗺️ Mapa de Eventos
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-white font-medium">
            👥 Mis Grupos
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-white font-medium">
            📅 Mi Agenda
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-white font-medium">
            ⭐ Favoritos
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="grid grid-cols-4 py-2">
          <button className="flex flex-col items-center py-2 text-white">
            <div className="text-lg">🏠</div>
            <div className="text-xs">Inicio</div>
          </button>
          <button className="flex flex-col items-center py-2 text-white/70">
            <div className="text-lg">🔍</div>
            <div className="text-xs">Buscar</div>
          </button>
          <button className="flex flex-col items-center py-2 text-white/70">
            <div className="text-lg">📱</div>
            <div className="text-xs">Chat</div>
          </button>
          <button className="flex flex-col items-center py-2 text-white/70">
            <div className="text-lg">👤</div>
            <div className="text-xs">Perfil</div>
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="fixed top-4 right-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
          <div className="flex space-x-2">
            <Link 
              href="/" 
              className="text-white/80 hover:text-white text-sm px-2 py-1 rounded"
            >
              Web
            </Link>
            <Link 
              href="/admin" 
              className="text-white/80 hover:text-white text-sm px-2 py-1 rounded"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 