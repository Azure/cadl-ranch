import "@typespec/http";
import "@azure-tools/cadl-ranch-expect";

using TypeSpec.Http;

@doc("Illustrates usage of error models.")
@scenarioService("/type/model/error")
namespace Type.Model.Error;

@doc("User model")
model User {
  username: string;
  password: string;
}

@error
@doc("Base Api Error definition type")
model ApiError {
  code: string;
}

@doc("Something is wrong with you.")
model Standard4XXResponse extends ApiError {
  @minValue(400)
  @maxValue(499)
  @statusCode
  statusCode: int32;
}

@doc("Something is wrong with me.")
model Standard5XXResponse extends ApiError {
  @minValue(500)
  @maxValue(599)
  @statusCode
  statusCode: int32;
}

alias WithStandardErrors<T> = T | Standard4XXResponse | Standard5XXResponse;

@route("/single")
interface Single {
  @scenario
  @scenarioDoc("""
  Expect 200 Response
  Expected response body:
  ```json
  {"username": "jane", "password": "doe"}
  ```
  """)
  @route("/valid")
  @get
  validResponse(): User | ApiError;

  @scenario
  @scenarioDoc("""
  Expect 304 Response
  Expected error body:
  ```json
  {"code": "Not Modified"}
  ```
  """)
  @route("/invalid")
  @get
  invalidResponse(): User | ApiError;
}

@route("/inheritance")
interface Inheritance {
  @scenario
  @scenarioDoc("""
    Expect 200 Response
    Expected response body:
    ```json
    {"username": "jane", "password": "doe"}
    ```
    """)
  @route("/valid")
  @get
  validResponse(): WithStandardErrors<User>;

  @scenario
  @scenarioDoc("""
    Expect 400 Response, Should be deserialized by error model Standard4XXResponse.
    Expected error body:
    ```json
    {"code": "Bad Request"}
    ```
    """)
  @route("/invalid/400")
  @get
  invalid400Response(): WithStandardErrors<User>;

  @scenario
  @scenarioDoc("""
    Expect 500 Response. Should be deserialized by error model Standard5XXResponse.
    Expected error body:
    ```json
    {"code": "Internal Server Error"}
    ```
    """)
  @route("/invalid/500")
  @get
  invalid500Response(): WithStandardErrors<User>;
}
