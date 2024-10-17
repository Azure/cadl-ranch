---
"@azure-tools/cadl-ranch-specs": minor
---

Reorganized ARM tests.

Breaking changes:

1. Renamed namespace `Azure.ResourceManager.Models.Resources` to `Azure.ResourceManager.Resources`.
2. Renamed namespace `Azure.ResourceManager.Models.CommonTypes.ManagedIdentity` to `Azure.ResourceManager.CommonProperties`.
3. Renamed folder `common-types/managed-identity` to `common-properties`.
4. Renamed `ManagedIdentityTrackedResources` interface in `common-properties` to `ManagedIdentity`.
