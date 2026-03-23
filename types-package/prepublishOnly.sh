cd .. \
&& npm run generate:types \
&& cp ./src/payload-types.ts types-package/src/index.ts \
&& cd types-package \
&& npm run build
