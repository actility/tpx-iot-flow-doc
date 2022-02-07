# API guidelines

## Compatibility Guidelines 
The HTTP API is versioned using a single number. This number symbolises the same as the major version number. This means
that backward incompatible changes will require this version number to change. However, the minor version is not
explicit. This allows for a stable API endpoint, but also means new features can be added to the API in the same
version number.

New features and bug fixes are released in tandem with a new ThingPark X. Backward incompatible changes (e.g. endpoints
removal, parameters removal etc.), as well as removal of entire API versions are done in tandem with a major point
release of ThingPark X itself.

## Basic usage 
API requests should be prefixed with API name and the API version. For example, the root of the IoT Flow API v1 is at
/iot-flow/v1.

## APIs
 * [IoT Admin API](api/iot-admin.md) (/iot-admin/v1)
 * [IoT Flow API](api/iot-flow.md) (/iot-flow/v2)
 * [IoT Core API](api/iot-core.md) (/iot-core/v1)
 * [Media API](api/media.md) (/media/v1)

## Authentication
Most API requests require authentication, or will only return public data when authentication is not provided.
For those cases where it is not required, this will be mentioned in the documentation for each individual endpoint.

There are two ways to authenticate with the ThingPark X IoT Flow API:
 * using DX Admin tokens
 * using OAuth2 OIDC tokens

If authentication information is invalid or omitted, an error message will be returned with status code 401:

```
401 Unauthorized
{
  "code": "com-4001",
  "message": "..."
}
```

### OIDC tokens
You can use an OIDC token to authenticate with the API by passing it in either the access_token parameter or the
Authorization header.

OIDC tokens will be validated in `IoT Admin` and `IoT Flow` APIs. The validation consist in validating its
signature, the expiration date, the issued-at date, the not-before date and the issuer. For more information on the
format of the token, please refer to [OpenID Connect](http://openid.net/specs/openid-connect-core-1_0.html) and for 
more information on the validation of the token's signature please refer to 
[RFC 7519](https://tools.ietf.org/html/rfc7519).

### Impersonation tokens
For admins who want to authenticate with the API as a specific user, or who want to build applications or scripts
that do so, they must use Impersonation tokens.
They are an alternative to directly using the user's password, since the user's password/token may not be known or may
change over time.
Impersonation tokens are used exactly like regular OIDC tokens, and can be passed in either the
access_token parameter or the Authorization header.

## Content negociation
Message formats for both requests and responses can be negotiated respectively with the Content-Type and Accept
HTTP headers. Currently application/json formats is supported. A typical request to a
ThingPark X API endpoint should therefore specify the HTTP headers below: 

Content-Type: application/json 
Accept: application/json

## Status codes 
The API is designed to return different status codes according to context and action. This way, if a request results
in an error, the caller is able to get insight into what went wrong.

The following table gives an overview of how the API functions generally behave.

|Request type|Description|
|-|-|
|GET|Access one or more resources and return the result as JSON|
|POST|Return 201 Created if the resource is successfully created and return the newly created resource as JSON|
|GET / PUT / PATCH|Return 200 OK if the resource is accessed or modified successfully. The (modified) result is returned as JSON|
|DELETE|Returns 204 No Content if the resource was deleted successfully|

The following table shows the possible return codes for API requests.

|Return values|Description|
|-|-|
|200 OK|The GET, PUT or PATCH request was successful, the resource(s) itself is returned as JSON. Could also be a response to a non REST POST in case of success|
|201 Created|The POST request was successful and the resource is returned as JSON|
|202 Accepted|The PUT, PATCH or POST request was accepted and will be treated asynchronously|
|204 No Content|The server has successfully fulfilled the request and that there is no additional content to send in the response payload body|
|304 Not Modified|Indicates that the resource has not been modified since the last request|
|400 Bad Request|A required attribute of the API request is missing, or API request body is not valid|
|401 Unauthorized|The user is not authenticated|
|403 Forbidden|The request is not allowed to perform the operation|
|404 Not Found|A resource could not be accessed because it does not exist|
|405 Method Not Allowed|The HTTP method is not supported for the targeted resource|
|409 Conflict|A conflicting resource already exists with the same ID|
|412 Preconditions failed|Indicates the request was denied. May happen if the If-Unmodified-Since header is provided when trying to delete a resource, which was modified in between|
|500 Server Error|While handling the request something went wrong on server-side|

## Pagination
Sometimes the returned result will span across many pages. When listing resources you can pass the following parameters:

|Parameter|Description|
|-|-|
|page|Page number (default: 1)|
|perPage|Number of items to list per page (default: 20, max: 100)|

### Pagination Link header 
Link headers are sent back with each response. They have rel set to prev/next/first/last and contain the relevant URL.
Please use these links instead of generating your own URLs.

### Other pagination headers 
Additional pagination headers are also sent back.

|Header|Description|
|-|-|
|X-Total|The total number of items|
|X-Total-Pages|The total number of pages|
|X-Per-Page|The number of items per page|
|X-Page|The index of the current page (starting at 1)|
|X-Next-Page|The index of the next page|
|X-Prev-Page|The index of the previous page|

## ID path encoding 
When using ID in API calls, make sure that they are URL-encoded.

For example, / is represented by %2F:

```
GET /iot-flow/v1/flows/test%2Ftest
```

## Data validation and error reporting 
When working with the API you may encounter validation errors, in which case the API will answer with an HTTP 400 status.

Such errors appear in two cases:
 * A required attribute of the API request is missing
 * An attribute did not pass the validation

## Unknown route 
When you try to access an API URL that does not exist you will receive 404 Not Found.

```
HTTP/1.1 404 Not Found
Content-Type: application/json
{
    "code": "com-4004",
    "message": "..."
}
```

## Encoding + in ISO 8601 dates 
If you need to include a + in a query parameter, you may need to use %2B instead due a W3 recommendation that causes
a + to be interpreted as a space. For example, in an ISO 8601 date, you may want to pass a time in Mountain Standard
Time, such as:

```
2018-04-30T02:51:08.000+01:00
```

The correct encoding for the query parameter would be:

```
2018-04-30T02:51:08.000%2B01:00
```

