---
sidebar_position: 4
---

# Location Message
:::warning Important Note
For more informations, please refer to the [full documentation](https://oss-api.thingpark.com/tpw/7.3/Core-Network/lrc-as-tunnel-lorawan/documentation-tunnel-lrc-to-as-lorawan.html#/), check the only endpoint documentation, you can found example and description of all fields.
:::

```json
{
  "DevEUI_location": {
    "DevEUI": "000000000f1d8693",
    "DevAddr": "0405F519",
    "Lrcid": "00000065",
    "NwGeolocAlgo": 2,
    "NwGeolocAlgoUsed": 0,
    "Time": "2020-07-09T16:06:38.49+02:00",
    "DevLocTime": "2020-01-27T10:00:43.336+01:00",
    "DevLAT": 10.11212,
    "DevLON": 7.44464,
    "DevAlt": 50,
    "DevLocRadius": 100,
    "DevAltRadius": 50,
    "DevUlFCntUpUsed": 7010,
    "DevLocDilution": 10,
    "DevAltDilution": 0,
    "DevNorthVel": 1,
    "DevEastVel": 1,
    "CustomerID": "100000507",
    "CustomerData": {
      "loc": {
        "lat": "43.58081",
        "lon": "1.4421667"
      },
      "alr": {
        "pro": "STL",
        "ver": "1"
      },
      "tags": [
        "tag1",
        "tag2"
      ],
      "doms": [
        {
          "n": "France/Paris",
          "g": "Site"
        },
        {
          "n": "Location",
          "g": "Vertical"
        }
      ],
      "name": "My device name"
    },
    "ModelCfg": "1:TemperatureService, 2:SwissPostDevice"
  }
}
```
