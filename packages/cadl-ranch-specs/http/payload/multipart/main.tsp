import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Test for multipart")
@scenarioService("/multipart")
namespace Payload.MultiPart;

model MultiPartRequest {
  id: string;
  profileImage: bytes;
}

model Address {
  city: string;
}

model ComplexPartsRequest {
  id: string;
  address: Address;
  profileImage: bytes;
  previousAddresses: Address[];
  pictures?: bytes[];
}

model JsonPartRequest {
  address: Address;
  profileImage: bytes;
}

model BinaryArrayPartsRequest {
  id: string;
  pictures: bytes[];
}

model JsonArrayPartsRequest {
  profileImage: bytes;
  previousAddresses: Address[];
}

model MultiBinaryPartsRequest {
  profileImage: bytes;
  picture?: bytes;
}

@route("/form-data")
namespace FormData {
  @scenario
  @scenarioDoc("""
Expect request (
- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with 
  appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
- according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
  If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
):
```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"
Content-Type: text/plain

123
--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream;

{…file content…}
--abcde12345--
```
""")
  @doc("Test content-type: multipart/form-data")
  @post
  @route("/mixed-parts")
  op basic(@header contentType: "multipart/form-data", @body body: MultiPartRequest): NoContentResponse;

  @scenario
  @scenarioDoc("""
Please send request twice, first time with 2 files in "pictures", second time no file in "pictures" (
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with 
    appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
    If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):
```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"
Content-Type: text/plain

123
--abcde12345
Content-Disposition: form-data; name="address"
Content-Type: application/json

{
  "city": "X"
}
--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
Content-Disposition: form-data; name="previousAddresses"
Content-Type: application/json

[{
  "city": "Y"
},{
  "city": "Z"
}]
--abcde12345
Content-Disposition: form-data; name="pictures"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
Content-Disposition: form-data; name="pictures"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
```
""")
  @doc("Test content-type: multipart/form-data for mixed scenarios")
  @post
  @route("/complex-parts")
  op complex(@header contentType: "multipart/form-data", @body body: ComplexPartsRequest): NoContentResponse;

  @scenario
  @scenarioDoc("""
Expect request (
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with 
    appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
    If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):
```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="address"
Content-Type: application/json

{
  "city": "X"
}
--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
```
""")
  @doc("Test content-type: multipart/form-data for scenario contains json part and binary part ")
  @post
  @route("/json-part")
  op jsonPart(@header contentType: "multipart/form-data", @body body: JsonPartRequest): NoContentResponse;

  @scenario
  @scenarioDoc("""
Expect request (
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with 
    appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
    If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):
```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"
Content-Type: text/plain

123
--abcde12345
Content-Disposition: form-data; name="pictures"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
Content-Disposition: form-data; name="pictures"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
```
""")
  @doc("Test content-type: multipart/form-data for scenario contains multi binary parts")
  @post
  @route("/binary-array-parts")
  op binaryArrayParts(
    @header contentType: "multipart/form-data",
    @body body: BinaryArrayPartsRequest,
  ): NoContentResponse;

  @scenario
  @scenarioDoc("""
Expect request (
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with 
    appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
    If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):
```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
Content-Disposition: form-data; name="previousAddresses"
Content-Type: application/json

[{
  "city": "Y"
},{
  "city": "Z"
}]
--abcde12345--
```
""")
  @doc("Test content-type: multipart/form-data for scenario contains multi json parts")
  @post
  @route("/json-array-parts")
  op jsonArrayParts(@header contentType: "multipart/form-data", @body body: JsonArrayPartsRequest): NoContentResponse;

  @scenario
  @scenarioDoc("""
Please send request twice, first time with only "profileImage", second time with both "profileImage" and "picture" (
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.4, content-type of file part shall be labeled with 
    appropriate media type, cadl-ranch will check it; content-type of other parts is optional, cadl-ranch will ignore it.
  - according to https://datatracker.ietf.org/doc/html/rfc7578#section-4.2, filename of file part SHOULD be supplied.
    If there are duplicated filename in same filedName, cadl-ranch can't parse them all.
  ):
```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
Content-Disposition: form-data; name="picture"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
```
""")
  @doc("Test content-type: multipart/form-data for scenario contains multi binary parts")
  @post
  @route("/multi-binary-parts")
  op multiBinaryParts(
    @header contentType: "multipart/form-data",
    @body body: MultiBinaryPartsRequest,
  ): NoContentResponse;
}
