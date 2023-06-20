# Alarm MESSAGE

## Device Alarm
This message is received when an alarm have been emit from ThingPark since the version TP7.3.

```json
{
  "DevEUI_alarm" : {
    "ID" : 4,
    "State" : 1,
    "CreationTime" : "2023-09-09T18:14:56.49+02:00",
    "LastUpdateTime" : "2023-09-09T18:25:24.49+02:00",
    "Occurrence" : 1,
    "Acked" : 0,
    "AddInfo1" : "69",
    "DevEUI" : "0018B20000001156",
    "CustomerID" : "100002164",
    "CustomerData" : {
      "loc" : {
        "lat" : "43.58081",
        "lon" : "1.4421667"
      },
      "tags" : [ "tag1", "tag2" ],
      "doms" : [ {
        "n" : "France/Paris",
        "g" : "Site"
      }, {
        "n" : "Location",
        "g" : "Vertical"
      } ]
    }
  }
}
```

```json
{
  "BS_alarm" : {
    "ID" : 102,
    "State" : 1,
    "CreationTime" : "2023-09-09T18:14:56.49+02:00",
    "LastUpdateTime" : "2023-09-09T18:25:24.49+02:00",
    "Occurrence" : 1,
    "Acked" : 0,
    "AddInfo1" : "10",
    "LrrID" : "100001C2",
    "PartnerID" : "acme-np",
    "CustomerID" : "100002164",
    "BaseStationData" : {
      "doms" : [ {
        "n" : "France/Paris",
        "g" : "Site"
      }, {
        "n" : "Network",
        "g" : "Vertical"
      } ]
    }
  }
}
```
