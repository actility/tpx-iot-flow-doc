# Abeeway Message

## ResolvedPosition Message
This message is a resource representing a resolved device position with related feed inputs and solver outputs.

```json
{
  "dxProfileId": "dev1-api",
  "customerId": "100018742",
  "modelCfg": null,
  "parentRealmId": "tpw-users-dev-ope",
  "deviceEUI": "20635f01e10008f4",
  "time": "2022-04-20T16:37:42.288000+00:00",
  "age": 97179.779,
  "validityState": "PREVIOUS",
  "horizontalAccuracy": 0,
  "incomingSubscriberId": "100018742",
  "trackerType": "Smart Badge V1.0",
  "processedFeed": {
    "deviceProfileId": "ABEEWAY/MICRO",
    "payloadEncoded": "0520648c0040020201030300",
    "sequenceNumber": 200,
    "receptionTime": "2022-04-20T16:37:42.288000+00:00",
    "SF": 9,
    "dynamicMotionState": "STATIC",
    "temperatureMeasure": 26.82352941176471,
    "processedPacket": {
      "baseStationId": "10000625",
      "antennaCoordinates": [
        3.411758,
        6.426904
      ],
      "SNR": 12,
      "RSSI": -91
    },
    "port": 18
  },
  "resolvedTracker": {
    "firmwareVersion": "2.2.1",
    "bleFirmwareVersion": "3.3.0",
    "messageType": "HEARTBEAT",
    "eventType": "UNKNOWN",
    "shutdownCause": "UNKNOWN",
    "trackingMode": "MOTION_TRACKING",
    "dynamicMotionState": "STATIC",
    "temperatureMeasure": 26.82352941176471,
    "gpsScanMode": "UNKNOWN",
    "sensorMode": "UNKNOWN",
    "periodicPositionInterval": -1,
    "batteryLevel": 100,
    "batteryStatus": "OPERATING",
    "sosFlag": false,
    "activityCount": -1,
    "trackingUlPeriod": -1,
    "loralivePeriod": -1,
    "energyStatusPeriod": -1,
    "geolocSensorProfile": "UNKNOWN",
    "oneshotGeolocMethod": "UNKNOWN",
    "extAntennaProfile": "UNKNOWN",
    "motionStartEndNbTx": -1,
    "gpsTimeout": -1,
    "xgpsTimeout": -1,
    "gpsEHPE": -1,
    "gpsConvergence": -1,
    "transmitStrat": "UNKNOWN",
    "bleBeaconCount": -1,
    "bleBeaconTimeout": -1,
    "gpsStandbyTimeout": -1,
    "confirmedUlBitmap": -1,
    "confirmedUlRetry": -1,
    "motionSensitivity": -1,
    "shockDetection": -1,
    "periodicActivityPeriod": -1,
    "motionDuration": -1,
    "bleRssiFilter": -1,
    "temperatureHigh": -1,
    "temperatureLow": -1,
    "temperatureAction": "UNKNOWN",
    "bleBond": "UNKNOWN",
    "batteryCapacity": -1,
    "reedSwitchConfiguration": "UNKNOWN",
    "collectionScanType": "UNKNOWN",
    "collectionBLEFilterType": "UNKNOWN",
    "collectionBLEFilterMain1": -1,
    "collectionBLEFilterMain2": -1,
    "collectionBLEFilterSecValue": -1,
    "collectionBLEFilterSecMask": -1,
    "collectionNbEntry": -1,
    "networkTimeoutCheck": -1,
    "networkTimeoutReset": -1
  },
  "uplinkPayload": {
    "messageType": "HEARTBEAT",
    "trackingMode": "MOTION_TRACKING",
    "batteryLevel": 100,
    "batteryStatus": "OPERATING",
    "ackToken": 0,
    "firmwareVersion": "2.2.1",
    "bleFirmwareVersion": "3.3.0",
    "resetCause": 64,
    "periodicPosition": false,
    "temperatureMeasure": 26.8,
    "sosFlag": 0,
    "appState": 0,
    "dynamicMotionState": "STATIC",
    "onDemand": false,
    "payload": "0520648c0040020201030300",
    "deviceConfiguration": {
      "mode": "MOTION_TRACKING"
    }
  },
  "resolvedTrackerParameters": {
    "mode": "MOTION_TRACKING",
    "firmwareVersion": "2.2.1",
    "bleFirmwareVersion": "3.3.0"
  },
  "messageSource": "LORA",
  "downlinkUrl": "https://dev1.thingpark.com/iot-flow/downlinkMessages/0ada5981-84d8-4e6d-89a0-8265a6a78381"
}
```

:::tip Note
Please refer to <a href="https://dx-api.thingpark.io/location-connector/latest/doc/index.html#resolvedposition" >the following documentation</a> for more informations about the resolvedMessage's properties description.
:::
