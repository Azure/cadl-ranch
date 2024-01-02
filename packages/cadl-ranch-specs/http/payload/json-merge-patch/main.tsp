import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Test for merge-patch+json content-type")
@scenarioService("/json-merge-patch")
namespace Payload.JsonMergePatch;

@doc("Details about a resource.")
model Resource {
  name: string;
  description?: string;
  map?: Record<InnerModel>;
  array?: InnerModel[];
  intValue?: int32;
  floatValue?: float32;
}

@doc("Details about a resource for patch operation.")
model ResourcePatch {
  description?: string;
  map?: Record<InnerModel>;
  array?: InnerModel[];
  intValue?: int32;
  floatValue?: float32;
}

@doc("It is the model used by Resource model")
model InnerModel {
  name: string;
  description?: string;
}

@scenario
@scenarioDoc("""

Expected input body:
```json
{
  "name": "Madge",
  "description": "desc",
  "map": {
    "key": {
      "name": "InnerMadge",
      "description": "innerDesc"
    }
  },
  "array": [
    {
      "name": "InnerMadge",
      "description": "innerDesc"
    }
  ],
  "intValue": 1,
  "floatValue": 1.1
}
```

Expected response body:
```json
{
  "name": "Madge",
  "description": "desc",
  "map": {
    "key": {
      "name": "InnerMadge",
      "description": "innerDesc"
    }
  },
  "array": [
    {
      "name": "InnerMadge",
      "description": "innerDesc"
    }
  ],
  "intValue": 1,
  "floatValue": 1.1
}
```
""")
@doc("Test content-type: application/merge-patch+json with required body")
@route("/create/resource")
@put
op createResource(@body body: Resource): Resource;

@scenario
@scenarioDoc("""
Should serialize null values with merge-patch+json enabled.

Expected input body:
```json
{
  "description": null,
  "map": {
    "key": {
      "name": "InnerMadge",
      "description": null
    }
  },
  "array": null,
  "intValue": null,
  "floatValue": null
}
```

Expected response body:
```json
{
  "name": "Madge",
  "description": null,
  "map": {
    "key": {
      "name": "InnerMadge",
      "description": null
    }
  },
  "array": null,
  "intValue": null,
  "floatValue": null
}
```
""")
@doc("Test content-type: application/merge-patch+json with required body")
@route("/update/resource")
@patch
op updateResource(
  @header("content-type") contentType: "application/merge-patch+json",
  @body body: ResourcePatch,
): Resource;

@scenario
@scenarioDoc("""

Expected input body:
```json
{
  "name": "Madge",
  "description": "desc",
  "map": {
    "key": {
      "name": "InnerMadge",
      "description": "innerDesc"
    }
  },
  "array": [
    {
      "name": "InnerMadge",
      "description": "innerDesc"
    }
  ],
  "intValue": 1,
  "floatValue": 1.1
}
```

Expected response body:
```json
{
  "name": "Madge",
  "description": "desc",
  "map": {
    "key": {
      "name": "InnerMadge",
      "description": "innerDesc"
    }
  },
  "array": [
    {
      "name": "InnerMadge",
      "description": "innerDesc"
    }
  ],
  "intValue": 1,
  "floatValue": 1.1
}
```
""")
@doc("Test content-type: application/merge-patch+json with optional body")
@route("/create/resource/optional")
@put
op createOptionalResource(
  @header("content-type") contentType: "application/merge-patch+json",
  @body body?: Resource,
): Resource;

@scenario
@scenarioDoc("""
Should serialize null values with merge-patch+json enabled.

Expected input body:
```json
{
  "description": null,
  "map": {
    "key": {
      "name": "InnerMadge",
      "description": null
    }
  },
  "array": null,
  "intValue": null,
  "floatValue": null
}
```

Expected response body:
```json
{
  "name": "Madge",
  "description": null,
  "map": {
    "key": {
      "name": "InnerMadge",
      "description": null
    }
  },
  "array": null,
  "intValue": null,
  "floatValue": null
}
```
""")
@doc("Test content-type: application/merge-patch+json with optional body")
@route("/update/resource/optional")
@patch
op updateOptionalResource(
  @header("content-type") contentType: "application/merge-patch+json",
  @body body?: ResourcePatch,
): Resource;
