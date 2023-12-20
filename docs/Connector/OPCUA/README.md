---
sidebarDepth: 4
sidebar_label: Connecting to Opcua
---

# CREATING AN OPC-UA CONNECTION

:::tip Note
The OPC-UA connector is available only on Thingpark Entreprise OCP version
:::

The creation of a connection establishes a unidirectional from your devices and gateways to an embedded OPC-UA server.
Uplinks from devices are decoded and automatically mapped to OPC-UA namespace node values, gateways statistics are also exposed to this embedded OPC-UA server.
You can connect to the embedded OPC-UA server and query the namespace node values via their own OPC-UA client implementations. Aliases are also supported for publish values on existing nodeId.

This OPC-UA server contain a discovery mechanism. It's good practice to provide a discovery-specific endpoint with no security.
It's required practice if all regular endpoints have security configured. Usage of the "/discovery" suffix is defined by OPC UA Part 6:
```Each OPC UA Server Application implements the Discovery Service Set. If the OPC UA Server requires a different address for this Endpoint it shall create the address by appending the path "/discovery" to its base address.```

## Overview
<div style={{textAlign: 'center'}}>![img](images/overview.png)</div>
By default, each messages are transformed with the "Message Simplifier" processor in order to select only important datas. This transformation collect a set of LoRaWAN fields like RSSI/SNR and the result of the decoded hexadecimal payload. All fields contained in the transformed message are exposed in the OPCUA Server. The root path of each devices is defined by ```deviceNodeIdPattern```.
You can scope each transformation by model of device for obtain the expected structure and naming convention.
<div style={{textAlign: 'center'}}>![img](images/overviewTree.png)</div>

## Creating a Connection From UI

You need to know parameters required to perform this task. To learn more, check the [Parameters required for connecting to an OPC-UA platform](#OPCUAparameters) below in this topic.

1. Click Connections -&gt; Create -&gt; ThingPark X IoT Flow.

<div style={{textAlign: 'center'}}>![img](images/ui/create_connection.png)</div>

Then, a new page will open. Select the connection type : OPCUA.

<div style={{textAlign: 'center'}}>![img](images/ui/select_a_connection.png)</div>

2. Fill in the form as in the example below and click on **Create**.

<div style={{textAlign: 'center'}}>![img](images/ui/form-filled.png)</div>

:::tip Note
Parameters marked with * are mandatory.
:::

* A notification appears on the upper right side of your screen to confirm that the application has been created.

<div style={{textAlign: 'center'}}>![img](images/ui/notification-creation.png)</div>

4. After creating the application, you will be redirected to the application details.

<div style={{textAlign: 'center'}}>![img](images/ui/application-details.png)</div>

**Changing the Settings after Creation**
You can change the settings parameters such as the destination URL or the Headers after the creation of the OPCUA application.

To do this, proceed as follows:

1. Select the OPC-UA application for which you want to change one or several parameters.

2. In the application information dashboard, click on the **Edit** icon corresponding to the parameter you want to change.

<div style={{textAlign: 'center'}}>![img](images/ui/edit-button.png)</div>

3. Enter the new value, and click on the **Confirm** icon.

<div style={{textAlign: 'center'}}>![img](images/ui/confirm-edit.png)</div>

* The Confirmation window displays,

<div style={{textAlign: 'center'}}>![img](images/ui/proceed-update.png)</div>

* A notification will inform you that the parameter is updated.

<div style={{textAlign: 'center'}}>![img](images/ui/notification-update.png)</div>

## Basic settings
<div style={{textAlign: 'center'}}>![img](images/ui/basic-settings.png)</div>

| Field | Description |
| ------ | ------ |
| ```Bind Address``` | The IP address on which the embedded OPC-UA server will bind on in case the server has multiple network interfaces. |
| ```TCP Bind Port``` | The port on which the embedded OPC-UA server listens to for the TCP transport profile (4840 to 4845 allowed) |
| ```Path``` | The baseURI for accessing embedded the OPC-UA server. |
| ```Username``` | Username used for basic authentication to the OPC-UA server. |
| ```Password``` | Password used for basic authentication to the OPC-UA server. |
| ```Base Station Node ID Pattern``` | Pattern used for publication of all gateway informations. |
| ```Device Node ID Pattern``` | Pattern used for publication of all device informations. |
| ```Server Certificate``` | Certificate used to secure the TCP communication. |
| ```Server Private Key``` | Private key of the server certificate. |

## Advanced settings
<div style={{textAlign: 'center'}}>![img](images/ui/advanced-settings.png)</div>

| Field | Description |
| ------ | ------ |
| ```Domain Name``` | Domain name representing the OPC-UA server for the connector. If not sure, give the same IP than the bindAddress. |
| ```Discovery Path``` | Represent the endpointUrl for the discovery feature of OCP-UA server. The value /discovery still recommanded by default.|
| ```Client Certificate``` | Certificate used to limit the access to a specific client. |
| ```Purge All Data``` | Very old data could persist on a cache. A purge clean all old datas. |
| ```Allow insecure endpoint``` | If checked, insecure endpoint will also be opened along with secure endpoint. |
| ```Uplink Validity``` | If set with a value (for instance, 1m), uplinks older than the set validity, will not be sent to the cloud service, and an alarm event is saved in the events’ log. When connections have not started or have downtimes, uplinks are accumulating. Most of these uplinks expire before connections get up again. Examples: ```60m```, ```12h```, ```3d12h60m```|
| ```Debug``` | Option used for obtain more logs from your connection. The Debug mode is automatically switched off after 2 days. |

## Client certificate
If you set the Client certificate on the connection setup, only the client with this certificate is authorized to establish a connection. 
This certificate should come from the client and be provided with the PEM format.
Example with UAExpert :
<div style={{textAlign: 'center'}}>![img](images/ClientCertificat.png)</div>
You can extract this certificate and convert this DER format to PEM format using OpenSSL.
```openssl x509 -inform der -in uaexpert.der -out uaexpert.pem```

## Server certificate
If you set the Server certificate on the connection setup, you secure the TCP communication.
You can generate a Server certificate on PEM format using OpenSSL.
```
openssl req -x509 -newkey rsa:4096 -keyout opcua_server_pk.pem -out opcua_server_cert.pem -sha256 -days 36500 -nodes -subj "/C=FR/ST=IleDeFrance/L=Paris/O=Actility/OU=R&amp;D/CN=Localhost" -extensions san -config &lt;(echo '[req]'; echo 'distinguished_name=req'; echo '[san]'; echo 'subjectAltName=URI:urn:actility:tpx:iot-flow:opcua-server,DNS:localhost')
```
:::tip Note
The certificate should contain a `subjectAltName` with the application URI and DNS. Eg. `URI:urn:actility:tpx:iot-flow:opcua-server,DNS:localhost`
:::

## Aliases
OPC-UA connection support aliases of node Ids. Just fill the panel named "Alias rules" with the original path and the expected path.
<div style={{textAlign: 'center'}}>![img](images/ui/alias-rules.png)</div>

## Devices alarms
Devices could send alarm messages to OPCUA when no data have been received during a while.
These alarms impact the data quality of the related OCPUA nodes, the data quality come "Uncertain" but after receiving a fresh value, the quality back to "Good".

## Persistence &amp; Purge
Each minute, the OPC-UA connection store localy values of all nodeIds. When the connection restart, all values are restored with a data quality at "Uncertain" but after receiving a fresh value, the quality back to "Good".
<div style={{textAlign: 'center'}}>![img](images/ui/data-quality.png)</div>

Due to the persistence mechanism, an old value cannot be destroy. A purge button on the "Advanced settings" panel help to purge all data.
<div style={{textAlign: 'center'}}>![img](images/ui/purge.png)</div>

## Discovery feature
The OCPUA connector support the discovery feature. You just need be sure to set the domain name.
<div style={{textAlign: 'center'}}>![img](images/ui/discovery.png)</div>

## Limitations
* TCP port range is limited from 4840 to 4845.
* OPCUA Server accept only one client connection if you use a client certificate.
* OPCUA Server don't support authentication based on certificates.
* OPCUA Server support only TCP connection, HTTPS protocol is not supported.
* OPCUA Server Security Policy is limited to `Basic256Sha256` with Message Security Mode to `Sign&amp;Encrypt` if a Server certificate is provided, otherwise no security is required.
* When UAExpert is used as an OPCUA Client GUI tool, a server private key and a server certificate must be provided in the connection configuration, otherwise UAExpert fails to connect to the OPCUA Server. Another OPCUA Client GUI tool, [FreeOpcUa](https://github.com/FreeOpcUa/opcua-client-gui) does not require to provide a server certificate. However, FreeOpcUa does not have username/password authentication option, so the username and password fields in the connection configuration must be set to blank. 

## Creating a Connection With API

To do this, you need to use the **Connections** group resource:

* `POST/connections` to create a new Connection instance
* `PUT/connections` to update a Connection instance
* `DELETE/connections` to delete a Connection instance

:::tip Note
We follow the REST-full API pattern, when updating configuration properties for a connection resource. Thus, you must also provide the whole configuration again.
:::

Example for creation of a new connection instance :

```json
POST /connections
{
    "connectorId": "actility-opcua-iot",
    "name": "Actility OPC-UA Connection",
    "configuration": {
      "bindAddress": "0.0.0.0",
      "domainName": "opcua.company.com",
      "discoveryPath": "/discovery",
      "tcpBindPort": 4840,
      "path": "/tpx",
      "username": "Till",
      "password": "Lindemann",
      "purgeNamespace": false,
      "openBothSecureAndInsecureEndpoints": false,
      "deviceNodeIdPattern": "IoTHub/Devices/{DevEUI}",
      "baseStationNodeIdPattern": "IoTHub/Gateways/{Id}",
      "aliases": [
        {
          "path": "IoTHub/Devices/A81758FFFE04F27E/temperature",
          "mappedPath": "AliasTemperature/Alias/Tag0001"
        },
        {
          "path": "IoTHub/Devices/A81758FFFE04F27E/humidity",
          "mappedPath": "AliasHumidity/Tag0002"
        },
        {
          "path": "IoTHub/Devices/A81758FFFE04F27E/light",
          "mappedPath": "Light/Alias/Tag0003"
        }
      ],
      "clientCertificate": "-----BEGIN CERTIFICATE-----MIIEyzCCA7O ... 5z0SXZIjpQ==-----END CERTIFICATE-----",
      "serverCertificate": "-----BEGIN CERTIFICATE-----MIIEnTCCA ... DLnhn-----END CERTIFICATE-----",
      "serverPrivateKey": "-----BEGIN PRIVATE KEY-----MIIEvQIB ... 1ROtDV8=-----END PRIVATE KEY-----"
    }
}
```

:::warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../Getting%20started/Setting%20Up%20A%20Connection%20instance/About_connections#common-parameters).
:::

## Displaying information to know if it worked

1. Download and install an OPC-UA client, for example [UA-Expert](https://www.unified-automation.com/downloads/opc-ua-clients.html).

2. Go to the **Devices List** section, and click on the device you want to affect to your OPC-UA application.

<div style={{textAlign: 'center'}}>![img](images/list-devices.png)</div>

3. When you are on the device's details page, click on **Add an application**.

<div style={{textAlign: 'center'}}>![img](images/add-application.png)</div>

4. Select your OPC-UA application and click on the **Confirm** icon.

* A notification appears to confirm that the application has been added to the device.

<div style={{textAlign: 'center'}}>![img](images/notification-application.png)</div>

5. Connect to the embedded OPC-UA namespace via the OPC-UA client you downloaded from the configured address

<div style={{textAlign: 'center'}}>![img](images/connect_to_namespace.png)</div>

* You can then browse the contents of the embedded OPC-UA namespace to verify whether the namespace is updated/populated according the the defined DevEUIs and mapping rules configuration of your connection.

<div style={{textAlign: 'center'}}>![img](images/opcua_browse_namespace.png)</div>

## How To Connect With Kepware

<div style={{textAlign: 'center'}}>![img](images/kepware/kepware.png)</div>

1. To connect to the OPCUA Server via Kepware, you need to create a new Channel from the KepServerEX Configuration window. Right click to the Project -&gt; Connectivity and select New Channel

<div style={{textAlign: 'center'}}>![img](images/kepware/1_kepware_new_channel.jpg)</div>

2. Select OPCUA Client from the dropdown as the type of the channel.

<div style={{textAlign: 'center'}}>![img](images/kepware/2_kepware_select_protocol.jpg)</div>

3. Give a name to the new channel that will be created.

<div style={{textAlign: 'center'}}>![img](images/kepware/3_kepware_name_channel.jpg)</div>

4. To let Kepware discover the OPC-UA Server's endpoints, click the '...' next to the Endpoint URL textbox.

<div style={{textAlign: 'center'}}>![img](images/kepware/4_kepware_endpoint_url.jpg)</div>

5. Enter the discovery url of the OPC-UA Server to the Discovery URL field. Use the domain name, hostname or the IP address of the OPCUA server as the domain name. This must be the same value as the domainName property of the OPC-UA Connector Configuration. Also check the Use Discovery URL checkbox if the Discovery URL field is not enabled. Under the UA Servers section, the available OPCUA Connection endpoints will be listed. You can select the suitable endpoint that you want to connect to.

<div style={{textAlign: 'center'}}>![img](images/kepware/5_kepware_enter_discovery_url.jpg)</div>

6. Select the Security Policy supported by the OPC-UA Server. For embedded OPC-UA Server, if a server certificate is specified in the OPC-UA Connector Configuration, then Security Policy must be Basic256Sha256.  If a server certificate is not specified, then it must be set as None. Leave the Message Mode field as None.

<div style={{textAlign: 'center'}}>![img](images/kepware/6_kepware_enter_security_info.jpg)</div>

7. Provide the username and password required for auhtentication to the OPC-UA Server. For embedded OPC-UA Server, if username and password are specified in the OPC-UA Connector Configuration, then those must be used. If a username and password are not provided in the connector configuration, then leave them empty as authentication to the OPC-UA server is not required. Click Next and the channel will be created.

<div style={{textAlign: 'center'}}>![img](images/kepware/7_kepware_enter_auth_info.jpg)</div>

8. Now, on the newly created channel on the project tree, click the link to add a new device. The Add Device wizard opens. Enter a device name, such as the DevEUI of the device. Click Next.

<div style={{textAlign: 'center'}}>![img](images/kepware/8_kepware_add_device.jpg)</div>

9. Select the scan mode you want and also the preference for fetching of initial updates.

<div style={{textAlign: 'center'}}>![img](images/kepware/9_kepware_device_scan.jpg)</div>

10. Select Poll as the update mode and select Enable for Registered Read/Write 

<div style={{textAlign: 'center'}}>![img](images/kepware/10_kepware_device_update_mode.jpg)</div>

11. On the next screen click the Select Import Items button.

<div style={{textAlign: 'center'}}>![img](images/kepware/11_kepware_device_select_import_items.jpg)</div>

12. Browse the OPC-UA Server's namespace tree and select the branches that belong to the Device and Properties you want to observe, click Add Branches button to select them. After the selections are finished, click OK.

<div style={{textAlign: 'center'}}>![img](images/kepware/12_kepware_device_import_select_attributes.jpg)</div>

:::warning Important note
Be aware of the domain name or IP Address of the OPC-UA Server when providing a discovery URL. This must match the actual domain name or IP Address of the OPC-UA Server.
:::

## Structure of the OPC-UA Namespace

OPC-UA namespace is organized into a folder hierarchy. The top (root) folder of the namespace is named IoTHub;
<div style={{textAlign: 'center'}}>![img](images/namespace_root.png)</div>

Under the IotHub folder, there are two folders called Devices and Gateways.

- Devices folder holds the devices that have received uplink packets.
- Gateways folder holds the base stations.

### Devices Folder

When a device receives an uplink packet first time, a folder with that deviceEui name is created under the Devices.
<div style={{textAlign: 'center'}}>![img](images/devices_root.png)</div>

When you expand a device subfolder, you can see the device attributes listed;
<div style={{textAlign: 'center'}}>![img](images/device_attributes.png)</div>

When you click on an attribute, you can see the type and value of the attribute (and many other information not specified here) from the Attributes tab on the right panel of your OPC-UA client.
<div style={{textAlign: 'center'}}>![img](images/device_attribute_details.png)</div>

### Gateways Folder

A scheduled job periodically runs to collect the base stations and creates folders corresponding to the id of each base station.
<div style={{textAlign: 'center'}}>![img](images/gateways_root.png)</div>

When you expand a Gateway subfolder, you can see the base station attributes listed;
<div style={{textAlign: 'center'}}>![img](images/gateway_attributes.png)</div>

When you click on an attribute, you can see the type and value of the attribute (and many other information not specified here) from the Attributes tab on the right panel of your OPC-UA client.
<div style={{textAlign: 'center'}}>![img](images/gateway_attribute_details.png)</div>
