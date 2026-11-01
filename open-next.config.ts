import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// Keep the first deployment dependency-free. Add the R2 incremental cache
// override after a Cloudflare R2 bucket has been provisioned for this worker.
export default defineCloudflareConfig({})
