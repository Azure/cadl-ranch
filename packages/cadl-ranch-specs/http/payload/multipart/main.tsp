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
  pictures: bytes[];
}

@route("/form-data")
namespace FormData {
  @scenario
  @scenarioDoc("""
Expect request:
```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"

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
Expect request:
```
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"

123
--abcde12345
Content-Disposition: form-data; name="address"
{
  "city": "X"
}
--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="<any-name-is-ok>"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
Content-Disposition: form-data; name="previousAddresses"

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
--abcde12345
```
""")
  @doc("Test content-type: multipart/form-data for mixed scenarios")
  @post
  @route("/complex-parts")
  op complex(@header contentType: "multipart/form-data", @body body: ComplexPartsRequest): NoContentResponse;
}
