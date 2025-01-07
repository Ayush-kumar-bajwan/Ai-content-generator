import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  dbCredentials:{
    url: "postgresql://ai-content_owner:j8rxJKPzt5XQ@ep-autumn-sea-a1e3yikv.ap-southeast-1.aws.neon.tech/ai-content?sslmode=require",
  }
 
});
