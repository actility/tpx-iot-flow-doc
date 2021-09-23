# Notification Message 

When you do not need device metadata, you can send directly the result of a decoded hexadecimal payload. 

```json
{
    "DevEUI_notification": {
        "Time": "2019-08-12T18:02:26.550+02:00",
        "DevEUI": "0018b20000000d48",
        "Lrcid": "0000000F",
        "DevAddr": "04e19fcb",
        "CustomerID": "199983788",
        "FCntDn": 11,
        "Type": "join",
        "Var1": ""
    }
}
```

| Property | Description |
| -------- | ----------- |
| ```Time``` | LRR Timestamp for the packet. Syntax: STRING (ISO date/time) |
| ```DevEUI``` | Device uniquement ID. Syntax: STRING (Hexadecimal representation) |
| ```Lrcid``` | ID of the LRC that processed the packet. Syntax: STRING (Hexadecimal representation) |
| ```DevAddr``` | Device DevAddr. Syntax: STRING (Hexadecimal representation) |
| ```CustomerID``` | Customer ID associated to the ThingPark Enterprise account. Syntax: STRING |
| ```FCntDn``` | The downlink counter to be used for the next downlink frame. Only applicable to LoRaWAN® 1.0. Syntax: NUMBER (32 bits unsigned integer) |
| ```Type``` | Type of notification:<ul><li>reset: Device reset</li><li>join: Successful Join procedure</li><li>devstatusans: Battery and Margin</li></ul>Syntax: STRING (enum) |
| ```Var1``` | Notification variable 1. The content depends on notification type:<ul><li>reset: type of reset<ul><li>automatic_reset: ABP automatic reset</li><li>admin_reset: OTAA/ABP administrative reset</li></ul></li><li>join: AppSKey encrypted with AS transport key</li><li>devstatusans: Battery (0..255)</li></ul> |


::: warning Important Note
For more informations, please refer to the [full documentation](https://docs.thingpark.com/thingpark-enterprise/6.1/Content/Resources/DocLibrary/TPE6.1/TP_Enterprise_6.1-rev.5_LRC-AS%20Tunnel%20Interface%20Developer%20Guide_LoRaWAN.pdf)
:::

[comment]: <> (<hyvor></hyvor>)
