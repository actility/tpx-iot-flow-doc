# Notification Message

::: warning Important Note
For more informations, please refer to the [full documentation](https://oss-api.thingpark.com/tpw/7.3/Core-Network/lrc-as-tunnel-lorawan/documentation-tunnel-lrc-to-as-lorawan.html#/), check the only endpoint documentation, you can found example and description of all fields.
:::

```json
{
  "DevEUI_notification": {
    "Time": "2020-07-09T16:06:38.49+02:00",
    "DevEUI": "000000000F1D8693",
    "Lrcid": "00000065",
    "DevAddr": "0405F519",
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
    "ModelCfg": "1:TemperatureService, 2:SwissPostDevice",
    "FCntDn": 0,
    "Type": "join",
    "Var1": "",
    "Var2": ""
  }
}
```


| Property         | Description                                                                                                                                                                                                                                                                                                    |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ```Time```       | LRR Timestamp for the packet. Syntax: STRING (ISO date/time)                                                                                                                                                                                                                                                   |
| ```DevEUI```     | Device unique ID. Syntax: STRING (Hexadecimal representation)                                                                                                                                                                                                                                                  |
| ```Lrcid```      | ID of the LRC that processed the packet. Syntax: STRING (Hexadecimal representation)                                                                                                                                                                                                                           |
| ```DevAddr```    | Device DevAddr. Syntax: STRING (Hexadecimal representation)                                                                                                                                                                                                                                                    |
| ```CustomerID``` | Customer ID associated to the ThingPark Enterprise account. Syntax: STRING                                                                                                                                                                                                                                     |
| ```FCntDn```     | The downlink counter to be used for the next downlink frame. Only applicable to LoRaWAN® 1.0. Syntax: NUMBER (32 bits unsigned integer)                                                                                                                                                                        |
| ```Type```       | Type of notification:<ul><li>reset: Device reset</li><li>join: Successful Join procedure</li><li>devstatusans: Battery and Margin</li></ul>Syntax: STRING (enum)                                                                                                                                               |
| ```Var1```       | Notification variable 1. The content depends on notification type:<ul><li>reset: type of reset<ul><li>automatic_reset: ABP automatic reset</li><li>admin_reset: OTAA/ABP administrative reset</li></ul></li><li>join: AppSKey encrypted with AS transport key</li><li>devstatusans: Battery (0..255)</li></ul> |
| ```Var2```       | Notification variable. Uniquely, when the type of notification is "devstatusans", then the Var2 is the value of margin (-32..31)                                                                                                                                                                               |