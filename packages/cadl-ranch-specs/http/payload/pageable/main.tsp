import "@azure-tools/cadl-ranch-expect";
import "@azure-tools/typespec-azure-core";
import "@typespec/versioning"

using TypeSpec.Versioning;
using Azure.Core;

@doc("Test describing pageable.")
@supportedBy("dpg")
@scenarioService("/payload/pageable")
@useDependency(global.Azure.Core.Versions.v1_0_Preview_2)
namespace Payload.Pageable;

model User {
  name: string
}

@scenario
@scenarioDoc("""
List users.

Expected query parameter:
top=100
skip=5
maxpagesize=3

Expected response body:
```json
{
  "value":[
    {
      "name":"user5"
    },
    {
      "name":"user6"
    },
    {
      "name":"user7"
    }
  ],
  "nextLink": "{endpoint}//payload/pageable?top=100&skip=8&maxpagesize=3"
}
```

Expected query parameter:
top=100
skip=8
maxpagesize=3

```json
{
  "value":[
    {
      "name":"user8"
    }
  ]
}
```
""")
op list(...StandardListQueryParameters): Page<User>;
