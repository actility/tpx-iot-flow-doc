---
sidebarDepth: 4
---

# Chirpstack

* ChirpStack is an open-source LoRaWAN Network Server which can be used to set up LoRaWAN networks.

We use a standard output transformation processor that transform TPX output messages to different [Chirpstack Event](https://www.chirpstack.io/application-server/integrations/events/#json) messages JSON format.

![img](./images/chirpstack.png)

We transform all types of messages described [here](docs/Message).

## Input Uplink message

A simplified input uplink message could be similar to this:

```json
{
  "DevEUI_uplink": {
    "Time": "2023-03-01T00:00:11.013+01:00",
    "DevEUI": "402C765000000074",
    "FPort": 2,
    "FCntUp": 53,
    "ADRbit": 1,
    "MType": 4,
    "FCntDn": 54,
    "payload_hex": "02300040a0",
    "mic_hex": "61fa24cf",
    "Lrcid": "00000127",
    "LrrRSSI": -83.0,
    "LrrSNR": 9.5,
    "SpFact": 7,
    "SubBand": "G0",
    "Channel": "LC1",
    "DevLrrCnt": 2,
    "Lrrid": "3C200E92",
    "Late": 0,
    "LrrLAT": 48.933865,
    "LrrLON": 1.195898,
    "Lrrs": {
      "Lrr": [
        {
          "Lrrid": "3C200E92",
          "Chain": 0,
          "LrrRSSI": -83.0,
          "LrrSNR": 9.5,
          "LrrESP": -83.461838
        },
        {
          "Lrrid": "1000027C",
          "Chain": 0,
          "LrrRSSI": -89.0,
          "LrrSNR": 6.75,
          "LrrESP": -89.832695
        }
      ]
    },
    "CustomerID": "100133870",
    "CustomerData": {
      "alr": {
        "pro": "LORA/Generic",
        "ver": "1"
      },
      "tags": [
        "site=Paris"
      ],
      "name": "My Demo Device"
    },
    "DriverCfg": {
      "app": {
        "pId": "actility",
        "mId": "demo",
        "ver": "1"
      }
    },
    "InstantPER": 0.0,
    "MeanPER": 0.0,
    "DevAddr": "04D2848E",
    "AckRequested": 1,
    "TxPower": 2.0,
    "NbTrans": 1,
    "Frequency": 868.1,
    "DynamicClass": "A",
    "payload": {
      "battery": {
        "type": "tension",
        "value": 3.6,
        "unit": "V",
        "error": 0
      }
    }
  }
}
```

## Output Uplink message

The output of the processor follows the Chirpstack event type [up](https://www.chirpstack.io/application-server/integrations/events/#up):

```json
{
  "devEUI" : "402C765000000074",
  "fPort" : 2,
  "deviceName" : "My Demo Device",
  "fCnt" : 53,
  "adr" : true,
  "applicationName" : "actility:demo:1",
  "rxInfo" : [ {
    "gatewayID" : "3C200E92",
    "rssi" : -83.0,
    "loRaSNR" : 9.5,
    "rfChain" : 0,
    "location" : {
      "latitude" : 48.933865,
      "longitude" : 1.195898,
      "altitude" : 0
    },
    "time" : "2023-02-28T23:00:11.013Z"
  }, {
    "gatewayID" : "1000027C",
    "rssi" : -89.0,
    "loRaSNR" : 6.75,
    "rfChain" : 0
  } ],
  "data" : "AjAAQKA=",
  "objectJSON" : {
    "battery" : {
      "type" : "tension",
      "value" : 3.6,
      "unit" : "V",
      "error" : 0
    }
  },
  "tags" : {
    "site" : "Paris"
  },
  "txInfo" : {
    "frequency" : 868100000,
    "modulation" : "LORA",
    "loRaModulationInfo" : {
      "spreadingFactor" : 7
    }
  }
}
```

## Input Downlink_Sent message

A simplified input downlink_sent message could be similar to this:

```json
{
  "DevEUI_downlink_Sent" : {
    "Time" : "2020-06-05T14:24:20.787+02:00",
    "DevEUI" : "20635F0161000022",
    "FPort" : 2,
    "FCntDn" : 24,
    "FCntUp" : 74,
    "Lrcid" : "00000127",
    "SpFact" : 9,
    "SubBand" : "G3",
    "Channel" : "LC254",
    "Lrrid" : "08050376",
    "DeliveryStatus" : 1,
    "CustomerID" : "100002164",
    "CustomerData" : {
      "alr" : {
        "pro" : "ABEE/APY",
        "ver" : "1"
      },
      "name": "My Demo Device"
    },
    "TransmissionSlot" : 2,
    "Frequency" : 869.525
  }
}
```

## Output Downlink_Sent message

The output of the processor follows the Chirpstack event type [ack](https://www.chirpstack.io/application-server/integrations/events/#ack):

```json
{
  "devEUI" : "20635F0161000022",
  "deviceName" : "My Demo Device",
  "acknowledged" : true,
  "txInfo" : {
    "frequency" : 869525000,
    "modulation" : "LORA",
    "loRaModulationInfo" : {
      "spreadingFactor" : 9
    }
  }
}
```

## Input Notification Device Status message

A simplified input notification message (device status) could be similar to this:

```json
{
  "DevEUI_notification" : {
    "Time" : "2023-02-22T17:14:02.000+00:00",
    "DevEUI" : "0018B20000000B20",
    "Lrcid" : "00000127",
    "DevAddr" : "05CB0AE8",
    "CustomerID" : "100132373",
    "FCntDn" : 0,
    "Type" : "devstatusans",
    "Var1": "98",
    "Var2": "8"
  }
}
```

## Output Notification Device Status message

The output of the processor follows the Chirpstack event type [status](https://www.chirpstack.io/application-server/integrations/events/#status):

```json
{
  "devEUI" : "0018B20000000B20",
  "deviceName" : "0018B20000000B20",
  "batteryLevel" : 98,
  "batteryLevelUnavailable" : false,
  "margin" : 8
}
```

## Input Decode Error message

A simplified input uplink message with decode error could be similar to this:

```json
{
  "DevEUI_uplink": {
    "Time": "2023-03-01T00:00:11.013+01:00",
    "DevEUI": "402C765000000074",
    "FPort": 2,
    "FCntUp": 53,
    "ADRbit": 1,
    "MType": 4,
    "FCntDn": 54,
    "payload_hex": "02300040a0",
    "mic_hex": "61fa24cf",
    "Lrcid": "00000127",
    "LrrRSSI": -83.0,
    "LrrSNR": 9.5,
    "SpFact": 7,
    "SubBand": "G0",
    "Channel": "LC1",
    "DevLrrCnt": 2,
    "Lrrid": "3C200E92",
    "Late": 0,
    "LrrLAT": 48.933865,
    "LrrLON": 1.195898,
    "Lrrs": {
      "Lrr": [
        {
          "Lrrid": "3C200E92",
          "Chain": 0,
          "LrrRSSI": -83.0,
          "LrrSNR": 9.5,
          "LrrESP": -83.461838
        },
        {
          "Lrrid": "1000027C",
          "Chain": 0,
          "LrrRSSI": -89.0,
          "LrrSNR": 6.75,
          "LrrESP": -89.832695
        }
      ]
    },
    "CustomerID": "100133870",
    "CustomerData": {
      "alr": {
        "pro": "LORA/Generic",
        "ver": "1"
      },
      "tags": [
        "site=Paris"
      ],
      "name": "My Demo Device"
    },
    "DriverCfg": {
      "app": {
        "pId": "actility",
        "mId": "demo",
        "ver": "1"
      }
    },
    "InstantPER": 0.0,
    "MeanPER": 0.0,
    "DevAddr": "04D2848E",
    "AckRequested": 1,
    "TxPower": 2.0,
    "NbTrans": 1,
    "Frequency": 868.1,
    "DynamicClass": "A",
    "payloadDecodedError": {
      "code": "com-5000",
      "message": "driver internal errors: wrong payload length"
    }
  }
}
```

## Output Decode Error Message

The output of the processor follows the Chirpstack event type [error](https://www.chirpstack.io/application-server/integrations/events/#error):

```json
{
  "devEUI" : "402C765000000074",
  "fPort" : 2,
  "deviceName" : "My Demo Device",
  "fCnt" : 53,
  "adr" : true,
  "applicationName" : "actility:demo:1",
  "rxInfo" : [ {
    "gatewayID" : "3C200E92",
    "rssi" : -83.0,
    "loRaSNR" : 9.5,
    "rfChain" : 0,
    "location" : {
      "latitude" : 48.933865,
      "longitude" : 1.195898,
      "altitude" : 0
    },
    "time" : "2023-02-28T23:00:11.013Z"
  }, {
    "gatewayID" : "1000027C",
    "rssi" : -89.0,
    "loRaSNR" : 6.75,
    "rfChain" : 0
  } ],
  "data" : "AjAAQKA=",
  "tags" : {
    "site" : "Paris"
  },
  "txInfo" : {
    "frequency" : 868100000,
    "modulation" : "LORA",
    "loRaModulationInfo" : {
      "spreadingFactor" : 7
    }
  },
  "type": "DECODE_ERROR",
  "error": "{\"code\":\"com-5000\",\"message\":\"driver internal errors:wrong payload length\"}"
}
```

## Input Join message

A simplified input join message could be similar to this:

```json
{
  "DevEUI_uplink": {
    "Time": "2023-03-01T00:00:11.013+01:00",
    "DevEUI": "402C765000000074",
    "FPort": 2,
    "FCntUp": 53,
    "ADRbit": 1,
    "MType": 4,
    "FCntDn": 54,
    "rawJoinRequest" : "003246524144b21800200b000000b2180052ff36f5e390",
    "mic_hex": "61fa24cf",
    "Lrcid": "00000127",
    "LrrRSSI": -83.0,
    "LrrSNR": 9.5,
    "SpFact": 7,
    "SubBand": "G0",
    "Channel": "LC1",
    "DevLrrCnt": 2,
    "Lrrid": "3C200E92",
    "Late": 0,
    "LrrLAT": 48.933865,
    "LrrLON": 1.195898,
    "Lrrs": {
      "Lrr": [
        {
          "Lrrid": "3C200E92",
          "Chain": 0,
          "LrrRSSI": -83.0,
          "LrrSNR": 9.5,
          "LrrESP": -83.461838
        },
        {
          "Lrrid": "1000027C",
          "Chain": 0,
          "LrrRSSI": -89.0,
          "LrrSNR": 6.75,
          "LrrESP": -89.832695
        }
      ]
    },
    "CustomerID": "100133870",
    "CustomerData": {
      "alr": {
        "pro": "LORA/Generic",
        "ver": "1"
      },
      "tags": [
        "site=Paris"
      ],
      "name": "My Demo Device"
    },
    "DriverCfg": {
      "app": {
        "pId": "actility",
        "mId": "demo",
        "ver": "1"
      }
    },
    "InstantPER": 0.0,
    "MeanPER": 0.0,
    "DevAddr": "04D2848E",
    "AckRequested": 1,
    "TxPower": 2.0,
    "NbTrans": 1,
    "Frequency": 868.1,
    "DynamicClass": "A"
  }
}
```

## Output Join message

The output of the processor follows the Chirpstack event type [join](https://www.chirpstack.io/application-server/integrations/events/#join):

```json
{
  "devEUI" : "402C765000000074",
  "deviceName" : "My Demo Device",
  "applicationName" : "actility:demo:1",
  "rxInfo" : [ {
    "gatewayID" : "3C200E92",
    "rssi" : -83.0,
    "loRaSNR" : 9.5,
    "rfChain" : 0,
    "location" : {
      "latitude" : 48.933865,
      "longitude" : 1.195898,
      "altitude" : 0
    },
    "time" : "2023-02-28T23:00:11.013Z"
  }, {
    "gatewayID" : "1000027C",
    "rssi" : -89.0,
    "loRaSNR" : 6.75,
    "rfChain" : 0
  } ],
  "tags" : {
    "site" : "Paris"
  },
  "txInfo" : {
    "frequency" : 868100000,
    "modulation" : "LORA",
    "loRaModulationInfo" : {
      "spreadingFactor" : 7
    }
  }
}
```
