# @svsticky/content

Type definitions for content types provided by Sticky's content management system.
This package makes it easier for other JS projects to retrieve content from the CMS, especially in combination with
Payload's sdk library, as illustrated below. The type definitions in this package allow for auto-completions
in your editor and type-checking for field types and slugs for all the content entities that the CMS exposes.

```ts
import { PayloadSDK } from "@payloadcms/sdk";
import type { Config } from "@svsticky/content";

const sdk = new PayloadSDK<Config>({
  baseURL: "https://content.svsticky.com/api", // Whatever the url is to the CMS...
})
```