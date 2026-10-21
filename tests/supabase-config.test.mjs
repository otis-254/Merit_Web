import assert from 'node:assert/strict'
import test from 'node:test'

test('requires only public Supabase values for browser configuration', async () => {
  const { getPublicSupabaseConfig } = await import('../src/lib/supabase/config.ts')
  assert.throws(() => getPublicSupabaseConfig({}), /NEXT_PUBLIC_SUPABASE_URL/)
  assert.deepEqual(getPublicSupabaseConfig({ NEXT_PUBLIC_SUPABASE_URL: 'https://project.supabase.co', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon' }), { url: 'https://project.supabase.co', anonKey: 'anon' })
})
