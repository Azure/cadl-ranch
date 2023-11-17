import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Test content-type: multipart/form-data")
@scenarioService("/content-type/multipart-formdata")
namespace ContentType.MultipartFormData;

model Address {
  city: string;
}

model MultiPartRequest {
  id: string; // Field "id" is text/plain
  address: Address; // Field "address" is an application/json
  profileImage: bytes; // Field "profileImage" is application/octet-stream
  previousAddresses: Address[]; // This is ONE part, as a JSON array
  pictures: bytes[]; // This is as many part as necessary
}

@scenario
@scenarioDoc("""
Expect request:
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
Content-Disposition: form-data; name="profileImage "; filename="image.jpg"
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
Content-Disposition: form-data; name="pictures"; filename="image1.png"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
Content-Disposition: form-data; name="pictures"; filename="image2.png"
Content-Type: application/octet-stream

{…file content…}
--abcde12345
```
""")
@doc("Test content-type: multipart/form-data")
@post
op multipart(@header contentType: "multipart/form-data", @body image: MultiPartRequest): NoContentResponse;
