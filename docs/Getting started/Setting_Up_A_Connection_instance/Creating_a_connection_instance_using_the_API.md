# Creating a connection instance using the API

To create a connection instance using the API:

1. Retrieve the connector **ID** for the type of connection required, using the `/connectors` endpoint.

```json

GET /connectors
 [
  {
    "id": "actility-aws-iot",
    "producerId": "actility",
    "moduleId": "aws-iot",
    "version": "2.0.0",
    "description": "Actility AWS Connector",
    "connection": {
      "configurationSchema": {
        "id": "urn:jsonschema:com:actility:tpx:flow:core:domain:connection:aws:AwsConfig",
        "properties": {
          "description": {
            "type": "string"
          },
          "createDevices": {
            "type": "boolean"
          },
        }
      }
    },
    "flow": {}
  }

```

2.  Create the connection using the `/connections` endpoint as shown below:

```json
POST /connections
 
{
  "connectorId": "actility-aws-iot",
  "name": "Test AWS Connection",
  "active": true,
  "alarms": [
    {
      "startTime": "2019-01-31T09:00:00+01:00",
      "endTime": "2019-01-31T18:00:00+01:00",
      "timezone": "Europe/Paris",
      "recurrence": [
        {
        "frequency": "weekly",
        "byDays": ["monday", "tuesday", "wednesday", "thursday", "friday"]
        }
      ],
      "uplinkRateMinPerHour": 10,
      "message": "Low rate during business day..."
    }
  ],
  "configuration": {
    "description": "AWS Europe Datacenter",
    "createDevices": true,
    "sendMetadata": false,
    "sendRawDecodedFormat": true,
    "uplinkTimeValidity": "5m",
    "downlinkEnabled": false,
    "downlinkAsId": "TWA_199983788.1972.AS",
    "downlinkAsKey": "9311e33d7d44fc52215b0dc789aa1d22",
    "downlinkPort": 5,
    "uplinkTopicPattern": "tpx/things/{DevEUI}/uplink",
    "downlinkTopicPattern": "tpx/things/{DevEUI}/downlink",
    "deviceType": "actilitytestsensor",
    "region": "eu-central-1",
    "accountPrefix": "a2sheeefctigr-ats",
    "secretAccessKey": "lymHcfefddzerrZHnV5Q5YN/GTMFNiTREAj/7dz3358",
    "accessKeyId": "AKIAJUJWTO76B3XZGHYA",
    "certificateId": "arn:aws:iot:eu-central-1:101513775872:cert/8be79f58542e4f8983t45fgjb0842465efa41fea4554fa974",
    "certificate": "-----BEGIN CERTIFICATE-----xxx-----END CERTIFICATE-----",
    "privateKey": "-----BEGIN RSA PRIVATE KEY-----xxx-----END RSA PRIVATE KEY-----"
  }
}
```

* **connectorId** parameter is set to the value retrieved in the previous step.
* To know more about connector specific parameters, please refer to the **Connectors** section of the online documentation.
* Connection generic parameters are depicted below.

3. Connection details, startup time and status can further be retrieved using `GET /connections` as shown below.

```json
GET /connections

[
  {
    "configuration": {
      "protocol": "SSL",
      "region": "eu-central-1",
      "accountPrefix": "a2e8k469sk385s-ats",
      "accessKeyId": "*****",
      "secretAccessKey": "*****",
      "certificateId": "arn:aws:iot:eu-central-1:076081621542:cert/28e7cc38a99f78b3d0b2b1af5d4cd8ddc83264ad435ce4248f4146ccc34e3329",
      "privateKey": "*****",
      "deviceType": "actilityDeviceType",
      "uplinkTopicPattern": "tpx/things/{DevEUI}/uplink",
      "downlinkTopicPattern": "tpx/things/{DevEUI}/downlink",
      "description": "Test AWS Connection configuration",
      "createDevices": true,
      "sendMetadata": false,
      "sendRawDecodedFormat": false,
      "certificate": "*****"
    },
    "id": "8",
    "connectorId": "actility-aws-iot",
    "name": "Test AWS Connection",
    "active": true,
    "startupTime": "2019-09-27T10:08:08.309+02:00",
    "state": "OPENED"
  },
]
```


