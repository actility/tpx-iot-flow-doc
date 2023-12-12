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

![img](images/overview.png)
By default, each messages are transformed with the "Message Simplifier" processor in order to select only important datas. This transformation collect a set of LoRaWAN fields like RSSI/SNR and the result of the decoded hexadecimal payload. All fields contained in the transformed message are exposed in the OPCUA Server. The root path of each devices is defined by ```deviceNodeIdPattern```.
You can scope each transformation by model of device for obtain the expected structure and naming convention.
![img](images/overviewTree.png)

## Creating a Connection From UI

You need to know parameters required to perform this task. To learn more, check the [Parameters required for connecting to an OPC-UA platform](#OPCUAparameters) below in this topic.

1. Click Connections -&gt; Create -&gt; ThingPark X IoT Flow.

![img](images/ui/create_connection.png)

Then, a new page will open. Select the connection type : OPCUA.

![img](images/ui/select_a_connection.png)

2. Fill in the form as in the example below and click on **Create**.

![img](images/ui/form-filled.png)

:::tip Note
Parameters marked with * are mandatory.
:::

* A notification appears on the upper right side of your screen to confirm that the application has been created.

![img](images/ui/notification-creation.png)

4. After creating the application, you will be redirected to the application details.

![img](images/ui/application-details.png)

**Changing the Settings after Creation**
You can change the settings parameters such as the destination URL or the Headers after the creation of the OPCUA application.

To do this, proceed as follows:

1. Select the OPC-UA application for which you want to change one or several parameters.

2. In the application information dashboard, click on the **Edit** icon corresponding to the parameter you want to change.

![img](images/ui/edit-button.png)

3. Enter the new value, and click on the **Confirm** icon.

![img](images/ui/confirm-edit.png)

* The Confirmation window displays,

![img](images/ui/proceed-update.png)

* A notification will inform you that the parameter is updated.

![img](images/ui/notification-update.png)

<a id="OPCUAparameters">**Parameters required for connecting for an OPC-UA platform**</a>

The parameters are the following:

| Field | Description |
| ------ | ------ |
| ```bindAddress``` | The IP address on which the embedded OPC-UA server will bind on in case the server has multiple network interfaces. |
| ```domainName``` | Domain name representing the OPC-UA server for the connector. If not sure, give the same IP than the bindAddress. |
| ```discoveryPath``` | Represent the endpointUrl for the discovery feature of OCP-UA server. The value /discovery still recommanded by default.|
| ```tcpBindPort``` | The port on which the embedded OPC-UA server listens to for the TCP transport profile (4840 to 4845 allowed) |
| ```path``` | The baseURI for accessing embedded the OPC-UA server. |
| ```username``` | Username used for basic authentication to the OPC-UA server. |
| ```password``` | Password used for basic authentication to the OPC-UA server. |
| ```deviceNodeIdPattern``` | Pattern used for publication of all device informations. |
| ```baseStationNodeIdPattern``` | Pattern used for publication of all gateway informations. |
| ```clientCertificate``` | Certificate used to limit the access to a specific client. |
| ```serverCertificate``` | Certificate used to secure the TCP communication. |
| ```serverPrivateKey``` | Private key of the server certificate. |

## Client certificate
If you set the Client certificate on the connection setup, only the client with this certificate is authorized to establish a connection. 
This certificate should come from the client and be provided with the PEM format.
Example with UAExpert :
![img](images/ClientCertificat.png)
You can extract this certificate and convert this DER format to PEM format using OpenSSL.
```openssl x509 -inform der -in uaexpert.der -out uaexpert.pem```

### Server certificate
If you set the Server certificate on the connection setup, you secure the TCP communication.
You can generate a Server certificate on PEM format using OpenSSL.
```
openssl req -x509 -newkey rsa:4096 -keyout opcua_server_pk.pem -out opcua_server_cert.pem -sha256 -days 36500 -nodes -subj "/C=FR/ST=IleDeFrance/L=Paris/O=Actility/OU=R&amp;D/CN=Localhost" -extensions san -config &lt;(echo '[req]'; echo 'distinguished_name=req'; echo '[san]'; echo 'subjectAltName=URI:urn:actility:tpx:iot-flow:opcua-server,DNS:localhost')
```
:::tip Note
The certificate should contain a `subjectAltName` with the application URI and DNS. Eg. `URI:urn:actility:tpx:iot-flow:opcua-server,DNS:localhost`
:::

### Aliases
OPC-UA connection support aliases of node Ids. Just fill the panel named "Alias rules" with the original path and the expected path.
![img](images/ui/alias-rules.png)

### Persistence &amp; Purge
Each minute, the OPC-UA connection store localy values of all nodeIds. When the connection restart, all values are restored with a data quality at "Uncertain" but after receiving a fresh value, the quality back to "Good".
![img](images/ui/data-quality.png)

Due to the persistence mechanism, an old value cannot be destroy. A purge button on the "Advanced settings" panel help to purge all data.
![img](images/ui/purge.png)

### Discovery feature
The OCPUA connector support the discovery feature. You just need be sure to set the domain name.
![img](images/ui/discovery.png)

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

The following table lists the properties applicable to a connection instance.

| Field | Description                                                                                                                                  |
| ------ |----------------------------------------------------------------------------------------------------------------------------------------------|
| ```bindAddress``` | The IP address on which the embedded OPC-UA server will bind on in case the server has multiple network interfaces.                          |
| ```domainName``` | Domain name, host name or the IP Address representing the OPC-UA server for the connector. If not sure, give the same IP as the bindAddress. |
| ```discoveryPath``` | Represent the endpointUrl for the discovery feature of OCP-UA server. The value /discovery still recommanded by default.                     |
| ```tcpBindPort``` | The port on which the embedded OPC-UA server listens to for the TCP transport profile (4840 to 4845 allowed)                                 |
| ```path``` | The baseURI for accessing embedded the OPC-UA server.                                                                                        |
| ```username``` | Username used for basic authentication to the OPC-UA server.                                                                                 |
| ```password``` | Password used for basic authentication to the OPC-UA server.                                                                                 |

:::warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Displaying information to know if it worked

1. Download and install an OPC-UA client, for example [UA-Expert](https://www.unified-automation.com/downloads/opc-ua-clients.html).

2. Go to the **Devices List** section, and click on the device you want to affect to your OPC-UA application.

![img](images/list-devices.png)

3. When you are on the device's details page, click on **Add an application**.

![img](images/add-application.png)

4. Select your OPC-UA application and click on the **Confirm** icon.

* A notification appears to confirm that the application has been added to the device.

![img](images/notification-application.png)

5. Connect to the embedded OPC-UA namespace via the OPC-UA client you downloaded from the configured address

![img](images/connect_to_namespace.png)

* You can then browse the contents of the embedded OPC-UA namespace to verify whether the namespace is updated/populated according the the defined DevEUIs and mapping rules configuration of your connection.

![img](images/opcua_browse_namespace.png)

## How To Connect With Kepware

![img](images/kepware/kepware.png)

1. To connect to the OPCUA Server via Kepware, you need to create a new Channel from the KepServerEX Configuration window. Right click to the Project -&gt; Connectivity and select New Channel

![img](images/kepware/1_kepware_new_channel.jpg)

2. Select OPCUA Client from the dropdown as the type of the channel.

![img](images/kepware/2_kepware_select_protocol.jpg)

3. Give a name to the new channel that will be created.

![img](images/kepware/3_kepware_name_channel.jpg)

4. To let Kepware discover the OPC-UA Server's endpoints, click the '...' next to the Endpoint URL textbox.

![img](images/kepware/4_kepware_endpoint_url.jpg)

5. Enter the discovery url of the OPC-UA Server to the Discovery URL field. Use the domain name, hostname or the IP address of the OPCUA server as the domain name. This must be the same value as the domainName property of the OPC-UA Connector Configuration. Also check the Use Discovery URL checkbox if the Discovery URL field is not enabled. Under the UA Servers section, the available OPCUA Connection endpoints will be listed. You can select the suitable endpoint that you want to connect to.

![img](images/kepware/5_kepware_enter_discovery_url.jpg)

6. Select the Security Policy supported by the OPC-UA Server. For embedded OPC-UA Server, if a server certificate is specified in the OPC-UA Connector Configuration, then Security Policy must be Basic256Sha256.  If a server certificate is not specified, then it must be set as None. Leave the Message Mode field as None.

![img](images/kepware/6_kepware_enter_security_info.jpg)

7. Provide the username and password required for auhtentication to the OPC-UA Server. For embedded OPC-UA Server, if username and password are specified in the OPC-UA Connector Configuration, then those must be used. If a username and password are not provided in the connector configuration, then leave them empty as authentication to the OPC-UA server is not required. Click Next and the channel will be created.

![img](images/kepware/7_kepware_enter_auth_info.jpg)

8. Now, on the newly created channel on the project tree, click the link to add a new device. The Add Device wizard opens. Enter a device name, such as the DevEUI of the device. Click Next.

![img](images/kepware/8_kepware_add_device.jpg)

9. Select the scan mode you want and also the preference for fetching of initial updates.

![img](images/kepware/9_kepware_device_scan.jpg)

10. Select Poll as the update mode and select Enable for Registered Read/Write 

![img](images/kepware/10_kepware_device_update_mode.jpg)

11. On the next screen click the Select Import Items button.

![img](images/kepware/11_kepware_device_select_import_items.jpg)

12. Browse the OPC-UA Server's namespace tree and select the branches that belong to the Device and Properties you want to observe, click Add Branches button to select them. After the selections are finished, click OK.

![img](images/kepware/12_kepware_device_import_select_attributes.jpg)

:::warning Important note
Be aware of the domain name or IP Address of the OPC-UA Server when providing a discovery URL. This must match the actual domain name or IP Address of the OPC-UA Server.
:::

## Structure of the OPC-UA Namespace

OPC-UA namespace is organized into a folder hierarchy. The top (root) folder of the namespace is named IoTHub;
![img](images/namespace_root.png)

Under the IotHub folder, there are two folders called Devices and Gateways.

- Devices folder holds the devices that have received uplink packets.
- Gateways folder holds the base stations.

### Devices Folder

When a device receives an uplink packet first time, a folder with that deviceEui name is created under the Devices.
![img](images/devices_root.png)

When you expand a device subfolder, you can see the device attributes listed;
![img](images/device_attributes.png)

When you click on an attribute, you can see the type and value of the attribute (and many other information not specified here) from the Attributes tab on the right panel of your OPC-UA client.
![img](images/device_attribute_details.png)

### Gateways Folder

A scheduled job periodically runs to collect the base stations and creates folders corresponding to the id of each base station.
![img](images/gateways_root.png)

When you expand a Gateway subfolder, you can see the base station attributes listed;
![img](images/gateway_attributes.png)

When you click on an attribute, you can see the type and value of the attribute (and many other information not specified here) from the Attributes tab on the right panel of your OPC-UA client.
![img](images/gateway_attribute_details.png)
