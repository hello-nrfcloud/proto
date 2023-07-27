# CBOR firmware protocol schemas

This folder contains the schemas for the next iteration of the firmware which is
currently in development.

They describe the application level messages for the out-of-box experience on
<https://hello.nrfcloud.com/>.

They are not yet supported by the frontend or the backend.

Device management messages are documented on <https://docs.nrfcloud.com/>

## Generating CBOR from JSON

```bash
npx cborg json2hex '[[2, 1688484111, true]]'  | xxd -r -p -  > out.cbor
```
