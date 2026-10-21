type Environment = Record<string, string | undefined>

export function getPublicSupabaseConfig(environment: Environment = process.env) {
  const url = environment.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = environment.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is required')
  if (!anonKey) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required')
  return { url, anonKey }
}

export function getServiceRoleKey(environment: Environment = process.env) {
  const key = environment.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is required on the server')
  return key
}
