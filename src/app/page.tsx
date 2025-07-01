'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { createClient } from '@/lib/supabase'

export default function HomePage() {
  const { user, loading, signInWithGoogle, signOut, setUser, setSession, setLoading } = useAuthStore()

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setSession, setLoading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            🕺 UDance
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            La comunidad de baile más vibrante de Buenos Aires. 
            Conecta, aprende y comparte tu pasión por el baile.
          </p>

          {user ? (
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  ¡Bienvenido!
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
              
              <div className="space-y-4">
                <div className="text-green-600 bg-green-50 p-4 rounded-lg">
                  ✅ Autenticación funcionando perfectamente
                </div>
                
                <button
                  onClick={signOut}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Únete a la Comunidad
              </h2>
              
              <button
                onClick={signInWithGoogle}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continuar con Google</span>
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                Al registrarte, aceptas nuestros términos y condiciones
              </p>
            </div>
          )}

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold mb-2">Eventos Únicos</h3>
              <p className="text-gray-600">
                Descubre talleres, milongas y espectáculos en toda la ciudad
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
              <p className="text-gray-600">
                Conecta con bailarines de todos los niveles y estilos
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Móvil First</h3>
              <p className="text-gray-600">
                Experiencia optimizada para tu teléfono con PWA
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
