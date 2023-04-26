# @azure-tools/cadl-ranch-specs

## 0.14.3

### Patch Changes

- 3bce56a: refine internal tests
- 23e6b35: Fix discrepancy between custom page model definition and mock response.
- 441c974: Bump all dependencies - April 2023
- a0036b4: Fix datetime issue in dictionary
- Updated dependencies [d10d1b2]
- Updated dependencies [441c974]
- Updated dependencies [18773ec]
  - @azure-tools/cadl-ranch@0.4.7
  - @azure-tools/cadl-ranch-api@0.2.5
  - @azure-tools/cadl-ranch-expect@0.2.4

## 0.14.2

### Patch Changes

- 69904c9: fix url for required optional in property

## 0.14.1

### Patch Changes

- 555f9f7: rename types -> type

## 0.14.0

### Minor Changes

- 759070a: remove api version test in azure core traits
- a29f855: create a Types folder with all of the types moved there

### Patch Changes

- 50c25b9: update internal decorator
- Updated dependencies [344334c]
  - @azure-tools/cadl-ranch@0.4.6

## 0.13.0

### Minor Changes

- 088b0b5: reconfigure dashboard view of core and tcgc

### Patch Changes

- 70c1a28: add paging test with a custom paging model

## 0.12.1

### Patch Changes

- f52d101: fix coverage check for resiliency

## 0.12.0

### Minor Changes

- debea25: remove dev driven test
- b58f70f: fix service driven resiliency tests

### Patch Changes

- 5a6d929: Add test case for spread operator
- 3a6b67d: add tsv, ssv, pipes query collection format test
- Updated dependencies [debea25]
- Updated dependencies [3a6b67d]
  - @azure-tools/cadl-ranch@0.4.5
  - @azure-tools/cadl-ranch-expect@0.2.3
  - @azure-tools/cadl-ranch-api@0.2.4

## 0.11.2

### Patch Changes

- dd5b5f1: fix collectionformat tests

## 0.11.1

### Patch Changes

- 2b5a65a: add collection format test back
- d2aa86a: Fix mock api issue for nullable array and client path parameter.
- d2aa86a: Fix nullable collection model definition problem.

## 0.11.0

### Minor Changes

- a2d916d: update to 0.43.0
- 6440f07: add path tests for server, rearrange structure for existing server tests

### Patch Changes

- 6440f07: add test for clients with path params
- Updated dependencies [d458e4b]
- Updated dependencies [a2d916d]
- Updated dependencies [6440f07]
  - @azure-tools/cadl-ranch-api@0.2.3
  - @azure-tools/cadl-ranch@0.4.4
  - @azure-tools/cadl-ranch-expect@0.2.2

## 0.10.1

### Patch Changes

- ef38bb8: Fix the nullable path issue
- ba682b7: Support validating collection format and update related mock tests
- Updated dependencies [ba682b7]
  - @azure-tools/cadl-ranch-api@0.2.2
  - @azure-tools/cadl-ranch@0.4.3

## 0.10.0

### Minor Changes

- ac96083: have lro-basic return a model instead of string
- 30f8cb7: Add LongRunningResourceCreateOrReplace, LongRunningResourceDelete, LongRunningResourceAction to Azure.Lro.Core operations tests

### Patch Changes

- 4b33715: Add test cases for nullable values
- 43322db: Add test for internal

## 0.9.3

### Patch Changes

- [#240](https://github.com/Azure/cadl-ranch/pull/240) [`6bc4639`](https://github.com/Azure/cadl-ranch/commit/6bc463939a70b57a51e4e0f23039ddf1f0f3e921) Thanks [@tadelesh](https://github.com/tadelesh)! - rename _.cadl to _.tsp

- Updated dependencies [[`6bc4639`](https://github.com/Azure/cadl-ranch/commit/6bc463939a70b57a51e4e0f23039ddf1f0f3e921), [`00e98ee`](https://github.com/Azure/cadl-ranch/commit/00e98eead076345e66a2982f44653ab7084f3e5f)]:
  - @azure-tools/cadl-ranch@0.4.2

## 0.9.2

### Patch Changes

- [#235](https://github.com/Azure/cadl-ranch/pull/235) [`48d4408`](https://github.com/Azure/cadl-ranch/commit/48d440866691302b1ccb692c4df8f7da581fafa8) Thanks [@iscai-msft](https://github.com/iscai-msft)! - bump typespec versions to 0.42.0

- Updated dependencies [[`48d4408`](https://github.com/Azure/cadl-ranch/commit/48d440866691302b1ccb692c4df8f7da581fafa8)]:
  - @azure-tools/cadl-ranch@0.4.1
  - @azure-tools/cadl-ranch-api@0.2.1
  - @azure-tools/cadl-ranch-expect@0.2.1

## 0.9.1

### Patch Changes

- [#231](https://github.com/Azure/cadl-ranch/pull/231) [`affbe52`](https://github.com/Azure/cadl-ranch/commit/affbe52e4d722c8b6f942479c722ae7983226d2e) Thanks [@iscai-msft](https://github.com/iscai-msft)! - fix http imports in cadl specs

## 0.9.0

### Minor Changes

- [#228](https://github.com/Azure/cadl-ranch/pull/228) [`324634d`](https://github.com/Azure/cadl-ranch/commit/324634dab77bd46dba5205d29f63ea9294f078f7) Thanks [@iscai-msft](https://github.com/iscai-msft)! - switch to typespec packages

### Patch Changes

- [#227](https://github.com/Azure/cadl-ranch/pull/227) [`7690e77`](https://github.com/Azure/cadl-ranch/commit/7690e772980bdc68714452bf2e4348c6834bb6ed) Thanks [@chunyu3](https://github.com/chunyu3)! - add collection header test

- Updated dependencies [[`324634d`](https://github.com/Azure/cadl-ranch/commit/324634dab77bd46dba5205d29f63ea9294f078f7)]:
  - @azure-tools/cadl-ranch@0.4.0
  - @azure-tools/cadl-ranch-api@0.2.0
  - @azure-tools/cadl-ranch-expect@0.2.0

## 0.8.1

### Patch Changes

- [#213](https://github.com/Azure/cadl-ranch/pull/213) [`b47c445`](https://github.com/Azure/cadl-ranch/commit/b47c44524c88aa4a68b67fa9b4fb4c897f97771e) Thanks [@chunyu3](https://github.com/chunyu3)! - Update the collectionFormat mockapi.

- [#216](https://github.com/Azure/cadl-ranch/pull/216) [`2ce9612`](https://github.com/Azure/cadl-ranch/commit/2ce96123f54c412a26d447ebac34d433dbe7b3f4) Thanks [@haolingdong-msft](https://github.com/haolingdong-msft)! - update mock response for collection format test case

- [#214](https://github.com/Azure/cadl-ranch/pull/214) [`ce1ee18`](https://github.com/Azure/cadl-ranch/commit/ce1ee18cea64d665e51d2f3da496adb3bdf57300) Thanks [@changlong-liu](https://github.com/changlong-liu)! - - Add cases customizations with azure.core parameters and traits.

- [#218](https://github.com/Azure/cadl-ranch/pull/218) [`2800a19`](https://github.com/Azure/cadl-ranch/commit/2800a19caabbb6bccf89d28492fbd02b234ee50b) Thanks [@archerzz](https://github.com/archerzz)! - fix test case on discriminator

## 0.8.0

### Minor Changes

- [#210](https://github.com/Azure/cadl-ranch/pull/210) [`41a966f`](https://github.com/Azure/cadl-ranch/commit/41a966fefa9c9d32e7afc561ac66a89ac4ea6484) Thanks [@weidongxu-microsoft](https://github.com/weidongxu-microsoft)! - Support versioning to azure/core test, validate the api-version in mockapi

### Patch Changes

- [#212](https://github.com/Azure/cadl-ranch/pull/212) [`ffbb8f1`](https://github.com/Azure/cadl-ranch/commit/ffbb8f1d53314114d2befc15ec4bcb0c3e48782c) Thanks [@qiaozha](https://github.com/qiaozha)! - add collection format test

- [#204](https://github.com/Azure/cadl-ranch/pull/204) [`7d51edb`](https://github.com/Azure/cadl-ranch/commit/7d51edb53af6363b305562d02b728291abfaa46e) Thanks [@changlong-liu](https://github.com/changlong-liu)! - add test of unions

- [#211](https://github.com/Azure/cadl-ranch/pull/211) [`5ec32d9`](https://github.com/Azure/cadl-ranch/commit/5ec32d9926ad3433c22bdf3648eace31b36c9265) Thanks [@pshao25](https://github.com/pshao25)! - Fix datetime compare issue

- Updated dependencies [[`ffbb8f1`](https://github.com/Azure/cadl-ranch/commit/ffbb8f1d53314114d2befc15ec4bcb0c3e48782c), [`5ec32d9`](https://github.com/Azure/cadl-ranch/commit/5ec32d9926ad3433c22bdf3648eace31b36c9265)]:
  - @azure-tools/cadl-ranch@0.3.1
  - @azure-tools/cadl-ranch-api@0.1.13

## 0.7.0

### Minor Changes

- [#200](https://github.com/Azure/cadl-ranch/pull/200) [`3cf55c0`](https://github.com/Azure/cadl-ranch/commit/3cf55c07c648b3ac4c93695fcfac6b5a62069c93) Thanks [@weidongxu-microsoft](https://github.com/weidongxu-microsoft)! - Use ResourceOperations for Azure.Core Preview2

- [#202](https://github.com/Azure/cadl-ranch/pull/202) [`9975660`](https://github.com/Azure/cadl-ranch/commit/997566096547313802830ee1c3d147882bfeabbf) Thanks [@weidongxu-microsoft](https://github.com/weidongxu-microsoft)! - Add ResourceCreateOrReplace, ResourceRead, ResourceList, ResourceDelete, ResourceAction to Azure.Core operations tests

### Patch Changes

- [#207](https://github.com/Azure/cadl-ranch/pull/207) [`131e76f`](https://github.com/Azure/cadl-ranch/commit/131e76f54230066d7152c7bb3fa170d0a769542d) Thanks [@pshao25](https://github.com/pshao25)! - Remove the convenientAPI decorator from array spec

- [#208](https://github.com/Azure/cadl-ranch/pull/208) [`2279600`](https://github.com/Azure/cadl-ranch/commit/22796008a07dcc5eafe3cac5417e0b0ed822b20d) Thanks [@iscai-msft](https://github.com/iscai-msft)! - bump cadl to 0.40.0

- Updated dependencies [[`2279600`](https://github.com/Azure/cadl-ranch/commit/22796008a07dcc5eafe3cac5417e0b0ed822b20d), [`68ac3cc`](https://github.com/Azure/cadl-ranch/commit/68ac3ccc553645284f39254c558bc0e4f24c85c8)]:
  - @azure-tools/cadl-ranch@0.3.0
  - @azure-tools/cadl-ranch-api@0.1.12
  - @azure-tools/cadl-ranch-expect@0.1.16

## 0.6.7

### Patch Changes

- [#195](https://github.com/Azure/cadl-ranch/pull/195) [`3ef3ddf`](https://github.com/Azure/cadl-ranch/commit/3ef3ddf99c0a25ecabec8054711724ad73c01520) Thanks [@lmazuel](https://github.com/lmazuel)! - Update some Readme descriptions for clarity

- [#198](https://github.com/Azure/cadl-ranch/pull/198) [`92503ae`](https://github.com/Azure/cadl-ranch/commit/92503ae7cbf675b5ac4a60e515da00548cf7fce2) Thanks [@changlong-liu](https://github.com/changlong-liu)! - - fix @convenientAPI in arrays/item-types/main.cadl

- Updated dependencies [[`3ef3ddf`](https://github.com/Azure/cadl-ranch/commit/3ef3ddf99c0a25ecabec8054711724ad73c01520)]:
  - @azure-tools/cadl-ranch@0.2.16

## 0.6.6

### Patch Changes

- [#191](https://github.com/Azure/cadl-ranch/pull/191) [`92449fd`](https://github.com/Azure/cadl-ranch/commit/92449fd5bbf4adf8db9e80a955c311a14a148dd2) Thanks [@iscai-msft](https://github.com/iscai-msft)! - Move to CADL 0.39 as a baseline

- [#192](https://github.com/Azure/cadl-ranch/pull/192) [`2c90d3a`](https://github.com/Azure/cadl-ranch/commit/2c90d3adb812296e7119be4dfa407f75e170e1ab) Thanks [@changlong-liu](https://github.com/changlong-liu)! - - fix visibility url in cadl.

- [#190](https://github.com/Azure/cadl-ranch/pull/190) [`97a653e`](https://github.com/Azure/cadl-ranch/commit/97a653e4b9765431b4046c8acd961d1a9eb71878) Thanks [@changlong-liu](https://github.com/changlong-liu)! - - Adding a testcase for parameterized server.

- Updated dependencies [[`92449fd`](https://github.com/Azure/cadl-ranch/commit/92449fd5bbf4adf8db9e80a955c311a14a148dd2), [`2c90d3a`](https://github.com/Azure/cadl-ranch/commit/2c90d3adb812296e7119be4dfa407f75e170e1ab)]:
  - @azure-tools/cadl-ranch@0.2.15
  - @azure-tools/cadl-ranch-api@0.1.11
  - @azure-tools/cadl-ranch-expect@0.1.15

## 0.6.5

### Patch Changes

- [#186](https://github.com/Azure/cadl-ranch/pull/186) [`8b31efb`](https://github.com/Azure/cadl-ranch/commit/8b31efb60165fb72baed943bafc037b94981dad4) Thanks [@lmazuel](https://github.com/lmazuel)! - Add projection tests

- Updated dependencies [[`8b31efb`](https://github.com/Azure/cadl-ranch/commit/8b31efb60165fb72baed943bafc037b94981dad4)]:
  - @azure-tools/cadl-ranch@0.2.14

## 0.6.4

### Patch Changes

- [#184](https://github.com/Azure/cadl-ranch/pull/184) [`e3bd97c`](https://github.com/Azure/cadl-ranch/commit/e3bd97cbea74f5171e28b753478fe82ad628f7a2) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Update templated spec to be under Azure.Core category

- [#162](https://github.com/Azure/cadl-ranch/pull/162) [`1df7329`](https://github.com/Azure/cadl-ranch/commit/1df732912a4785da7a3e692386a3206dccf06b45) Thanks [@iscai-msft](https://github.com/iscai-msft)! - Add template tests

- Updated dependencies [[`e3bd97c`](https://github.com/Azure/cadl-ranch/commit/e3bd97cbea74f5171e28b753478fe82ad628f7a2)]:
  - @azure-tools/cadl-ranch-expect@0.1.14
  - @azure-tools/cadl-ranch@0.2.13

## 0.6.3

### Patch Changes

- [#181](https://github.com/Azure/cadl-ranch/pull/181) [`311bdaf`](https://github.com/Azure/cadl-ranch/commit/311bdaf58ab691d5f3f4b131561609fdb54686ba) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Update url of visibility mock api

- Updated dependencies [[`311bdaf`](https://github.com/Azure/cadl-ranch/commit/311bdaf58ab691d5f3f4b131561609fdb54686ba)]:
  - @azure-tools/cadl-ranch@0.2.12

## 0.6.2

### Patch Changes

- [#179](https://github.com/Azure/cadl-ranch/pull/179) [`760b57f`](https://github.com/Azure/cadl-ranch/commit/760b57f85cae17e707a530e1fc3db9b3a60ee3f1) Thanks [@lmazuel](https://github.com/lmazuel)! - Add Union Auth tests in CADL-Ranch

## 0.6.1

### Patch Changes

- [#176](https://github.com/Azure/cadl-ranch/pull/176) [`c38c13c`](https://github.com/Azure/cadl-ranch/commit/c38c13ce29608ef928d9192156c26173693da4ed) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Update storage account for coverage upload

## 0.6.0

### Minor Changes

- [#164](https://github.com/Azure/cadl-ranch/pull/164) [`791c99c`](https://github.com/Azure/cadl-ranch/commit/791c99cd4708cc9c2686ef1cd4aec8118c470928) Thanks [@tjprescott](https://github.com/tjprescott)! - Updated tests for proper expected behavior of enums in Azure.

### Patch Changes

- [#164](https://github.com/Azure/cadl-ranch/pull/164) [`791c99c`](https://github.com/Azure/cadl-ranch/commit/791c99cd4708cc9c2686ef1cd4aec8118c470928) Thanks [@tjprescott](https://github.com/tjprescott)! - Added test for fixed enums

- Updated dependencies [[`b40f674`](https://github.com/Azure/cadl-ranch/commit/b40f674bb52b826be196d7b318e48fa23d19fa8a)]:
  - @azure-tools/cadl-ranch@0.2.11

## 0.5.2

### Patch Changes

- [#171](https://github.com/Azure/cadl-ranch/pull/171) [`690f5f2`](https://github.com/Azure/cadl-ranch/commit/690f5f2990744d712507378d6a3e6485648b012a) Thanks [@iscai-msft](https://github.com/iscai-msft)! - bump cadl dependencies

- Updated dependencies [[`690f5f2`](https://github.com/Azure/cadl-ranch/commit/690f5f2990744d712507378d6a3e6485648b012a)]:
  - @azure-tools/cadl-ranch@0.2.10
  - @azure-tools/cadl-ranch-api@0.1.10
  - @azure-tools/cadl-ranch-expect@0.1.13

## 0.5.1

### Patch Changes

- [#163](https://github.com/Azure/cadl-ranch/pull/163) [`7ee5b68`](https://github.com/Azure/cadl-ranch/commit/7ee5b68093ad761c6dabecd43fb4a9dc887560a2) Thanks [@changlong-liu](https://github.com/changlong-liu)! - - add visibility spec and mockapi

## 0.5.0

### Minor Changes

- [#160](https://github.com/Azure/cadl-ranch/pull/160) [`c4b58d9`](https://github.com/Azure/cadl-ranch/commit/c4b58d9473913d82021a676eddb34cd0e8f2da7c) Thanks [@msyyc](https://github.com/msyyc)! - Bug fix for models/usage

### Patch Changes

- [#165](https://github.com/Azure/cadl-ranch/pull/165) [`dce629c`](https://github.com/Azure/cadl-ranch/commit/dce629c677d0102bd71e646c39a4efabeb8cb0b1) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Added `never` as a model property type case. (Meaning the property should not be included)

- [#166](https://github.com/Azure/cadl-ranch/pull/166) [`e3adc0d`](https://github.com/Azure/cadl-ranch/commit/e3adc0d84d113548d1bc56e1e0fd8d67fae6773e) Thanks [@iscai-msft](https://github.com/iscai-msft)! - bump cadl deps

- Updated dependencies [[`e3adc0d`](https://github.com/Azure/cadl-ranch/commit/e3adc0d84d113548d1bc56e1e0fd8d67fae6773e)]:
  - @azure-tools/cadl-ranch@0.2.9
  - @azure-tools/cadl-ranch-expect@0.1.12

## 0.4.3

### Patch Changes

- [#148](https://github.com/Azure/cadl-ranch/pull/148) [`0631ee6`](https://github.com/Azure/cadl-ranch/commit/0631ee6db7de212db19f63f267b8a1f138af4a1d) Thanks [@pshao25](https://github.com/pshao25)! - Add convenienceAPI decorator to array spec

- [#154](https://github.com/Azure/cadl-ranch/pull/154) [`e9b3aed`](https://github.com/Azure/cadl-ranch/commit/e9b3aed77d72e4917d33842c4077cd8565db8201) Thanks [@haolingdong-msft](https://github.com/haolingdong-msft)! - models/usage, fix but that senario url and mockapi url mismatch

- [#153](https://github.com/Azure/cadl-ranch/pull/153) [`c91d046`](https://github.com/Azure/cadl-ranch/commit/c91d046168ca738600846e0c83ad41d6c6f470e7) Thanks [@changlong-liu](https://github.com/changlong-liu)! - - Fix mockapi of getting a datetime.

## 0.4.2

### Patch Changes

- [#150](https://github.com/Azure/cadl-ranch/pull/150) [`63c9fb0`](https://github.com/Azure/cadl-ranch/commit/63c9fb06a57466c9fcb09d8a7b3e172c76d603bd) Thanks [@pshao25](https://github.com/pshao25)! - Change namesapce array to arrays

- [#149](https://github.com/Azure/cadl-ranch/pull/149) [`66814a8`](https://github.com/Azure/cadl-ranch/commit/66814a8ae6c4fe2f8bc61e8fc8703f0a74f0bf98) Thanks [@changlong-liu](https://github.com/changlong-liu)! - - add testcases for using special words as operation/parameter/property names

- Updated dependencies [[`66814a8`](https://github.com/Azure/cadl-ranch/commit/66814a8ae6c4fe2f8bc61e8fc8703f0a74f0bf98)]:
  - @azure-tools/cadl-ranch@0.2.8

## 0.4.1

### Patch Changes

- [#142](https://github.com/Azure/cadl-ranch/pull/142) [`9116e47`](https://github.com/Azure/cadl-ranch/commit/9116e478df9cba0aad2bee1d23ed59382260c325) Thanks [@changlong-liu](https://github.com/changlong-liu)! - fix lro mockapi: add response body for Azure_Lro_PollingSuccess

- Updated dependencies [[`9116e47`](https://github.com/Azure/cadl-ranch/commit/9116e478df9cba0aad2bee1d23ed59382260c325)]:
  - @azure-tools/cadl-ranch@0.2.7

## 0.4.0

### Minor Changes

- [#143](https://github.com/Azure/cadl-ranch/pull/143) [`2705271`](https://github.com/Azure/cadl-ranch/commit/27052714fefdceef0b5e8cc26b862fc16f05418b) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Add scenarios for Array

### Patch Changes

- [#145](https://github.com/Azure/cadl-ranch/pull/145) [`45b34d8`](https://github.com/Azure/cadl-ranch/commit/45b34d8de510f2a0d04f90c0eedec832251a7479) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Remove interfaces scenario

## 0.3.7

### Patch Changes

- [#140](https://github.com/Azure/cadl-ranch/pull/140) [`e30765b`](https://github.com/Azure/cadl-ranch/commit/e30765ba40737daa897e4b3c2d82e63ed3975003) Thanks [@pshao25](https://github.com/pshao25)! - Fix the datetime compare issue

## 0.3.6

### Patch Changes

- [#138](https://github.com/Azure/cadl-ranch/pull/138) [`e0c063c`](https://github.com/Azure/cadl-ranch/commit/e0c063c3b8b06b4ff976d2c8f4793b11aaf5709a) Thanks [@iscai-msft](https://github.com/iscai-msft)! - add cadl-dpg dep, operationGroup decorators

## 0.3.5

### Patch Changes

- [#132](https://github.com/Azure/cadl-ranch/pull/132) [`66570fc`](https://github.com/Azure/cadl-ranch/commit/66570fcbacd7ed571672ab9920068ae981c67ca8) Thanks [@changlong-liu](https://github.com/changlong-liu)! - - fix dictionary mockapi

- Updated dependencies [[`4cecb47`](https://github.com/Azure/cadl-ranch/commit/4cecb476985c47a5d9926c3d068f5abefe8573df)]:
  - @azure-tools/cadl-ranch@0.2.6

## 0.3.4

### Patch Changes

- [#130](https://github.com/Azure/cadl-ranch/pull/130) [`38d1672`](https://github.com/Azure/cadl-ranch/commit/38d1672d0fd38ee11cf65e8409cf366f282340e4) Thanks [@iscai-msft](https://github.com/iscai-msft)! - bump cadl dependencies

- Updated dependencies [[`38d1672`](https://github.com/Azure/cadl-ranch/commit/38d1672d0fd38ee11cf65e8409cf366f282340e4)]:
  - @azure-tools/cadl-ranch@0.2.5
  - @azure-tools/cadl-ranch-expect@0.1.11

## 0.3.3

### Patch Changes

- Updated dependencies [[`48ba1f6`](https://github.com/Azure/cadl-ranch/commit/48ba1f62e10733b3c562f261736ab01e55de2d5f), [`ea70aac`](https://github.com/Azure/cadl-ranch/commit/ea70aac457b6404c0585cd1e00da8db0455ae843)]:
  - @azure-tools/cadl-ranch@0.2.4

## 0.3.2

### Patch Changes

- [#125](https://github.com/Azure/cadl-ranch/pull/125) [`78f52a6`](https://github.com/Azure/cadl-ranch/commit/78f52a69c09af377a1e0d4d9592cd17207982283) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Redresign Models usage scenarios

- Updated dependencies [[`fc7ac81`](https://github.com/Azure/cadl-ranch/commit/fc7ac81e7bb6c8be4f5aa01863ab7f811dc96c52), [`78f52a6`](https://github.com/Azure/cadl-ranch/commit/78f52a69c09af377a1e0d4d9592cd17207982283)]:
  - @azure-tools/cadl-ranch@0.2.3

## 0.3.1

### Patch Changes

- Updated dependencies [[`4634cd7`](https://github.com/Azure/cadl-ranch/commit/4634cd7aa834b44bf58695a8a5c0b090ce0c525d), [`23665a0`](https://github.com/Azure/cadl-ranch/commit/23665a0a9abd1428486c274d5b72971ee1f8c379)]:
  - @azure-tools/cadl-ranch@0.2.2

## 0.3.0

### Minor Changes

- [#105](https://github.com/Azure/cadl-ranch/pull/105) [`08f06ba`](https://github.com/Azure/cadl-ranch/commit/08f06ba886189114fde67c68ccc433d3381cf5d9) Thanks [@msyyc](https://github.com/msyyc)! - Adding specs and mockapi to support basic lro

### Patch Changes

- [#118](https://github.com/Azure/cadl-ranch/pull/118) [`a307dea`](https://github.com/Azure/cadl-ranch/commit/a307deab3c1af32935992bd2fd8340f5879aeec5) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Fix: should be allowed on interface and namespace as well(next to @scenario)

- Updated dependencies [[`a307dea`](https://github.com/Azure/cadl-ranch/commit/a307deab3c1af32935992bd2fd8340f5879aeec5)]:
  - @azure-tools/cadl-ranch-expect@0.1.10
  - @azure-tools/cadl-ranch@0.2.1

## 0.2.0

### Minor Changes

- [#111](https://github.com/Azure/cadl-ranch/pull/111) [`b58be0e`](https://github.com/Azure/cadl-ranch/commit/b58be0e35aae20dad18f6c50f1b9ec407ca86e18) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Upload scenario manifest to storage account for dashboard

### Patch Changes

- [#113](https://github.com/Azure/cadl-ranch/pull/113) [`1fc9000`](https://github.com/Azure/cadl-ranch/commit/1fc90008a87acead33c86567c167dbcaa524115f) Thanks [@haolingdong-msft](https://github.com/haolingdong-msft)! - bug fix, update models/property-optional /duration operation

- [#107](https://github.com/Azure/cadl-ranch/pull/107) [`9d6ae37`](https://github.com/Azure/cadl-ranch/commit/9d6ae3770ef6da76172377a922b5b6a52ea55d28) Thanks [@changlong-liu](https://github.com/changlong-liu)! - Fix route in dictionary mock apis.

- [#114](https://github.com/Azure/cadl-ranch/pull/114) [`f34dc29`](https://github.com/Azure/cadl-ranch/commit/f34dc29d87003d6a3e5c37b78e2e9d83cabc27d7) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Upload coverage report and show aggregated report on dashboard

- [#109](https://github.com/Azure/cadl-ranch/pull/109) [`069a616`](https://github.com/Azure/cadl-ranch/commit/069a616b32b3f898b5396f0a592ea53620cf571b) Thanks [@iscai-msft](https://github.com/iscai-msft)! - fix coverage report for invalid authentication tests

- Updated dependencies [[`b58be0e`](https://github.com/Azure/cadl-ranch/commit/b58be0e35aae20dad18f6c50f1b9ec407ca86e18), [`f34dc29`](https://github.com/Azure/cadl-ranch/commit/f34dc29d87003d6a3e5c37b78e2e9d83cabc27d7)]:
  - @azure-tools/cadl-ranch@0.2.0

## 0.1.12

### Patch Changes

- [#108](https://github.com/Azure/cadl-ranch/pull/108) [`69518f3`](https://github.com/Azure/cadl-ranch/commit/69518f30d90cfdbae4ec8c7493229a2c2fe4fa01) Thanks [@iscai-msft](https://github.com/iscai-msft)! - Fix model type for collections model optional property testing

- [#91](https://github.com/Azure/cadl-ranch/pull/91) [`cc4dd0f`](https://github.com/Azure/cadl-ranch/commit/cc4dd0fbeb58e7e85fd5ec6282739c49338daa71) Thanks [@pshao25](https://github.com/pshao25)! - Fix datetime compare issue

- [#104](https://github.com/Azure/cadl-ranch/pull/104) [`e622348`](https://github.com/Azure/cadl-ranch/commit/e6223481a78f7b9844fee6d9457d01d9adf05860) Thanks [@changlong-liu](https://github.com/changlong-liu)! - Adding specs and mockapi for dictionary.

- [#74](https://github.com/Azure/cadl-ranch/pull/74) [`cf1b966`](https://github.com/Azure/cadl-ranch/commit/cf1b9660e195ffca5f4292830f3e78f7af748534) Thanks [@changlong-liu](https://github.com/changlong-liu)! - Add specs for inheritance models with or without discriminator.

## 0.1.11

### Patch Changes

- [#95](https://github.com/Azure/cadl-ranch/pull/95) [`e856629`](https://github.com/Azure/cadl-ranch/commit/e85662983475a709898fd8ded76dfc5b9140dec0) Thanks [@iscai-msft](https://github.com/iscai-msft)! - Add oauth2 test, reformat existing api-key auth test

- [#103](https://github.com/Azure/cadl-ranch/pull/103) [`d8af894`](https://github.com/Azure/cadl-ranch/commit/d8af894795cdb84f2641dcf03c7798a101ecc213) Thanks [@timotheeguerin](https://github.com/timotheeguerin)! - Update dependencies including cadl August release

- Updated dependencies [[`d8af894`](https://github.com/Azure/cadl-ranch/commit/d8af894795cdb84f2641dcf03c7798a101ecc213)]:
  - @azure-tools/cadl-ranch@0.1.9
  - @azure-tools/cadl-ranch-api@0.1.9
  - @azure-tools/cadl-ranch-expect@0.1.9
