const allowedOrigins = ['http://example.com', 'http://localhost:5173']

export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Si no se proporciona un origen (por ejemplo, solicitudes desde el propio servidor), permitir el acceso
    if (origin === undefined) {
      return callback(null, true)
    }

    if (allowedOrigins.includes(origin)) {
      // Permite el acceso si el origen está permitido
      return callback(null, true)
    }

    // Rechaza el acceso si el origen no está permitido
    callback(new Error('Not allowed by CORS'))
  }
}
