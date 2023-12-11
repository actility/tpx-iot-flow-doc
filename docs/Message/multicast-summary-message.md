# Multicast Summary Message
:::warning Important Note
For more informations, please refer to the [full documentation](https://oss-api.thingpark.com/tpw/7.3/Core-Network/lrc-as-tunnel-lorawan/documentation-tunnel-lrc-to-as-lorawan.html#/), check the only endpoint documentation, you can found example and description of all fields.
:::

```json
{
  "DevEUI_multicast_summary": {
    "Time": "2020-07-09T16:06:38.49+02:00",
    "DevEUI": "000000000F1D8693",
    "DevAddr": "0405F519",
    "FPort": 2,
    "FCntDn": 11,
    "Lrcid": "00000065",
    "TransmissionStatus": "ABORTED",
    "LrrCnt": 93,
    "LrrSuccessCnt": 86,
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
    "LrrFailedCnt": 7,
    "LrrFailedDistribution": "A3=2,D0=7,DC=3",
    "CorrelationID": "4434704901C7450B"
  }
}
```
