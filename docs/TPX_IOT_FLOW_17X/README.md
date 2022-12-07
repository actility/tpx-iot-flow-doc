# TPX-IoT-Flow 1.7.X
## 1.7.7

### NEW FEATURES RELEASED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-2177``` | Update guide links for drivers. |
| ```TXIF-2174``` | Add "Lost" section on connection counter for messages lost or filtered. |
| ```TXIF-2174``` | Azure Event-Hub connection - New downlink switch on UI for disable subscription to incoming topic. |
| ```TXIF-2140``` | Update the code signatures with LoRa-Alliance signature for custom drivers. |
| ```TXIF-2071``` | Connection Debug mode switch available on UI. |
| ```TXIF-2072``` | Connection Debug mode auto off after 2 weeks. |
| ```TXIF-2061``` | New uplink sample on transformation form for Abeeway trackers. |

#### Abeeway processor
All connectors that support processors (uplink transformations) could now use easily the Location Engine provide by Abeeway.
Initial uplink still continue to be delivered on destination and when the Location Engine solver resolve the location, the Resolved Position message is delivered on destination. 

![img](./images/AbeewayProcessor.png)

Documentation of the Resolved Position message could be found on <a href="https://dx-api.thingpark.io/location-connector/latest/doc/index.html#resolvedposition" style="color:teal">ThingPark X Location Engine documentation</a>.

#### Customer filter processor
All connectors that support processors (uplink transformations) could now filter messages using a JSONata expression.
On "Uplink transformation" panel, add a new operation and select "Filter" and "Filter JSONata". 
![img](./images/JSONataFilter.png)

Select an example and a predefine filter, adapt it and test it, that all.
![img](./images/JSONataFilterExample.png)

### MAJOR BUGS RESOLVED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-2161``` | Thingboard connection stay on OPENING state when login failed. |
| ```TXIF-2160``` | MODBUS Issue when 1 of 2 rules failed . |
| ```TXIF-2122``` | Azure event hub issue when downlink topic doesn't exist. |
| ```TXIF-2030``` | Uplink Topic pattern - JSLT complex expression cannot be saved. |

## 1.7.6a

### MAJOR BUGS RESOLVED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-2168``` | Reload of a connection don't work properly. |

## 1.7.6

### MAJOR BUGS RESOLVED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-2114``` | Unable to start IoT-Flow after an update in case of high number of connections (>250 per bridge). |
| ```TXIF-2112``` | IoT flow event message is confusing on closing state when deactivate a connection. |

## 1.7.4

### NEW FEATURES RELEASED
| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-2106``` | MQTT Connector - Change placeholder of connection timeout and action timeout to defaut used. |
| ```TXIF-2098``` | Thingboard connector - Inject LoRaWan fields on output Message. |
| ```TXIF-2091``` | Add a part of random delay when a connector restart. More or less one minute. |
| ```TXIF-2078``` | HTTP Strict mode for automatic retry on server error. |
| ```TXIF-2079``` | HTTP Connector - Strict mode switch on Advanced panel. |
| ```TXIF-2074``` | Thingworx option "SendRawDecodedFormat" on Advanced panel. |
| ```TXIF-2042``` | Connection Kafka partition scale-up. |
| ```TXIF-2023``` | Thingworx QueryImplementingThings should be replaced by QueryImplementingThingsOptimized. |
| ```TXIF-1953``` | New messages: Device and BS Alarms Notification. |
| ```TXIF-1293``` | Chirpstack other messages implementation. |

### MAJOR BUGS RESOLVED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-2096``` | WMW Connection timeout and action timeout should be set to 60000ms by default. |
| ```TXIF-2093``` | Uplink lost on Azure IoT Central for devices other than Abeeway. |
| ```TXIF-2085``` | Wrong datetime calculated for the next restart of a connection. |
| ```TXIF-2084``` | Thingworx should support derived template. |
| ```TXIF-2076``` | Slowness on startup for starting connections. |
| ```TXIF-2068``` | TPX-UI : Logo customization : Operator logo not used. |
| ```TXIF-2060``` | Transformation order is automatically changed. |
| ```TXIF-2058``` | Uplink transformation JMSPath & JSLT not applied. |
| ```TXIF-2075``` | HTTP uplink/downlink counter seem's not working. |
| ```TXIF-2069``` | ThingBoard connection stay on Closing state. |
| ```TXIF-2066``` | HTTP Downlink doesn't work. |

## 1.7.3

### MAJOR BUGS RESOLVED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-1910``` | Thingworx test behavior when ThingTemplateName change. |
| ```TXIF-2022``` | Azure IoT-Hub replay message on ACK failure. |
| ```TXIF-2052``` | Azure IoT-Hub too many reactors. |

## 1.7.2

### MAJOR BUGS RESOLVED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-2040``` | HTTP LRC Compliance doesn't work anymore. |
| ```TXIF-2012``` | Fuota connection page: remove User Guide link and warning notification. |
| ```TXIF-2029``` | Connection status optimisation. |
| ```TXIF-2034``` | Dx-Core Swagger URL should be adapted. |
| ```TXIF-2036``` | Event menu should be hidden on OCP. |
| ```TXIF-2041``` | Fuota's information page is not implemented. |
| ```TXIF-2043``` | Filter connection list with a word that don't match. |
| ```TXIF-2003``` | Add filter on UI for hostname on Cumulocity connector. |

## 1.7.1a

### MAJOR BUGS RESOLVED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-2063``` | Thingsboard timeout on login. |

## 1.7.1

### NEW FEATURES RELEASED

#### Google Cloud

This new connector enables devices to use the <a href="https://cloud.google.com/iot-core" style="color:teal"> Google IoT Core</a>.

![img](./images/GoogleIoTCore.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/GOOGLE_IOT_CORE/" style="color:teal">the ThingPark Connectors documentation</a>.

#### Kafka

This new connector enables sending uplinks to a Kafka Broker.

![img](./images/Kafka.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/KAFKA/" style="color:teal">the ThingPark Connectors documentation</a>.

#### Datacake

This new connector enables sending uplinks to <a href="https://docs.datacake.de/" style="color:teal">Datacake</a>.

![img](./images/Datacake.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/DATACAKE/" style="color:teal">the ThingPark Connectors documentation</a>.

#### WMW

This new connector enables sending uplinks to <a href="https://clickgo.wmw-hub.com/" style="color:teal">WMW</a>.

![img](./images/WMW.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/WMW/" style="color:teal">the ThingPark Connectors documentation</a>.

#### Qubitro

This new connector enables sending uplinks to <a href="https://www.qubitro.com/" style="color:teal">Qubitro</a>.

![img](./images/Qubitro.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/QUBITRO/" style="color:teal">the ThingPark Connectors documentation</a>.

#### CommonSense

This new connector enables sending uplinks to <a href="https://www.vertical-m2m.com/" style="color:teal">CommonSense</a>.

![img](./images/CommonSense.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/COMMONSENSE/" style="color:teal">the ThingPark Connectors documentation</a>.

#### TagoIO

This new connector enables sending uplinks to <a href="https://tago.io/" style="color:teal">TagoIO</a>.

![img](./images/Tago.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/TAGO/" style="color:teal">the ThingPark Connectors documentation</a>.

#### Gear Studio

This new connector enables sending uplinks to <a href="https://gears.studio/" style="color:teal">Gear Studio</a>.

![img](./images/GearStudio.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/GEAR_STUDIO/" style="color:teal">the ThingPark Connectors documentation</a>.

#### Opinum

This new connector enables sending uplinks to <a href="https://www.opinum.com/en/" style="color:teal">Opinum</a>.

![img](./images/Opinum.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/OPINUM/" style="color:teal">the ThingPark Connectors documentation</a>.

#### Cayenne

This new connector enables sending uplinks to <a href="https://mydevices.com/" style="color:teal">Cayenne</a>.

![img](./images/Cayenne.png)

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Connector/CAYENNE/" style="color:teal">the ThingPark Connectors documentation</a>.

### Updated connectors

#### Downlink endpoint for all connectors

All connectors now support downlinks using a dedicated endpoint.
Just a simple API REST call 'POST  https://community.thingpark.io/iot-flow/downlinkMessages/<DownlinkUUID>' with a <a href="https://docs.thingpark.com/thingpark-x/latest/Message/Downlink_Message/" style="color:teal">Downlink message</a> as body.

![img](./images/DownlinkURL.png)

### Processors

#### Objenius format
On the *Uplink transformations* panel of your connection, you can now transform automatically Actility uplinks to Objenious uplinks format.

![img](./images/ObjeniousPanel.png) 

![img](./images/Objenious.png) 

*Example of generated Objenious uplink.*
``` json
{
  "id" : "5ea1eae2-84b7-4590-a794-390a7efb2629",
  "device_id" : "A81758FFFE06F23E",
  "profile" : "elsys:ers-co2:1",
  "type" : "uplink",
  "timestamp" : "2022-08-17T17:37:27.344+00:00",
  "count" : 390,
  "payload_cleartext" : "0100e7023204002805000601a2070e53",
  "payload" : {
    "temperature" : 23.1,
    "humidity" : 50,
    "light" : 40,
    "motion" : 0,
    "co2" : 418,
    "vdd" : 3667
  },
  "device_properties" : {
    "deveui" : "A81758FFFE06F23E"
  },
  "protocol_data" : {
    "DevAddr" : "04000E24",
    "NetID" : "10000958",
    "best_gateway_id" : "10000958",
    "gateways" : 3,
    "noise" : -57.0,
    "port" : 5,
    "requested_nbrep" : 1,
    "rssi" : -47.592655,
    "sf" : 7,
    "signal" : -47.762199,
    "snr" : 14.0
  }
}
```
#### JSLT Transformation
On the *Uplink transformations* panel of your connection, you can now use JSLT transformation to generate your own format.
![img](./images/JSLT.png)

You can experiment your own transformer with a large set of messages.
![img](./images/JSLT_Transformation.png) 

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Processor/JSLT/" style="color:teal">the ThingPark Processor documentation</a>.

#### JSONata Transformation
On the *Uplink transformations* panel of your connection, you can now use JSONata transformation to generate your own format.
![img](./images/JSONata.png)

You can experiment your own transformer with a large set of messages.
![img](./images/JSONata_Transformation.png) 

Documentation can be found on <a href="https://docs.thingpark.com/thingpark-x/latest/Processor/JSONata/" style="color:teal">the ThingPark Processor documentation</a>.

### NEW FEATURES RELEASED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-1862``` | Proxy section is available on OCP only. |
| ```TXIF-1895``` | Add Forum link on all connectors for Community only. |
| ```TXIF-1591``` | CFT link is more visible on AWS Connector. |
| ```TXIF-1588``` | Adding a link to API Swagger-UI on left menu. |
| ```TXIF-1548``` | Driver UI refactoring. |
| ```TXIF-1984``` | Adding of driver examples. |
| ```TXIF-1929``` | Result of a decoded uplink could now contain fPort. |
| ```TXIF-1839``` | Search field on connection list. |
| ```TXIF-1909``` | New field ``Thing Template Name`` on Thingworx connector UI. |
| ```TXIF-1914``` | New field ``uplinkTimeValidity`` on each connector UI (Advanced panel). |
| ```TXIF-1919``` | On *Send Downlink* panel of each connector, DeviceEUI could now include dash. (Eg: 74-FE-48-FF-FF-5A-3D-9F) |
| ```TXIF-1884``` | Driver list pagination. |

### MAJOR BUGS RESOLVED

| JIRA Ticket | Description |
| ----------- | ----------- |
| ```TXIF-1930``` | Unable to update Flow name with lowercases. |
| ```TXIF-1954``` | Error when decoding driver examples. |
