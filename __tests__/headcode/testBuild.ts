import 'setimmediate'
import postgres from 'postgres'

const sqlOptions = {
  idle_timeout: 20,
  max_lifetime: 60 * 10,
}
test('testPostgres', async () => {
  const sql = postgres(process.env.SUPABASE_CONNECTION_STRING!, sqlOptions)

  const version = await sql`SELECT version();`
  console.log('Version 15 required', version)
})
