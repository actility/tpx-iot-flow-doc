# ThingPark X IoT Flow Overview

Actility believes in a radically more efficient and sustainable world through ubiquitous digital-twin technology.
Digital twins are software representation of physical devices.
The software interface exposes the device properties (and their current values like battery level), along with callable method sending
downlink messages.

We want to spark this transition and become the leading global mediation platform between cloud apps & physical world.
ThingPark X is the cornerstone of Actility’s vision to make digital twins common place. Positioned at the edge of the LoRaWAN network,
ThingPark X simplifies the interface between LPWAN-connected sensors and IoT application,
transforming sensors raw data into application-friendly actionable information,
that can be fed into digital twins object of various IoT Platforms.

<img src="./images/ThingPark.png" width=500 />

### ThingPark X IoT Flow in the ThingPark Product Stack

ThingPark X IoT Flow acts as a mediation layer handling bi-directional communication between ThingPark powered networks and
application servers or major cloud-based IoT Services in order to keep digital twins in sync.
This ability to feed digital twins consistently whatever the LPWAN sensors connected relies on
key capabilities delivered by TP X IoT Flow:

1. ***ThingPark X Drivers***: Transforms the device specific payload into a generic JSON object. Based on ThingPark device profiles, our TP X Platform will be able to decode uplink messages collected through the LPWAN network, in order to transform raw data into actionable data points. ThingPark X Drivers Library supports already more that 100 sensor models and offers the possibility to upload custom drivers.

2. ***ThingPark X IoT Flow Connections***: Adapting transport protocol and forwarding to external application servers or cloud providers. Connectors ensure the proper delivery of the extracted sensor data (via the driver engine) to your selected IoT platform(TP X IoT Core, AWS IoT Core, Azure IoT hub, Thingworx,…), ensuring that:
   
	a. Authentication is properly handled
   
	b. Device / Thing provisioning is consistent. E.g. AWS IoT Core connector will create dedicated thing type on AWS IoT Core and instantiates things if it does not exist yet.
   
    c. Data publication at the right place - E.g.  in the device shadow, or in the alarm framework of the IoT platform if data extracted is an alarm.

3. ***ThingPark X IoT Flow Flows***: Define the list of devices to listen payloads to, the driver to use for those devices in order to decode their payloads, and the connection to send the data in. It allows filtering and forwarding along with optional data transformation (decoding payloads).

[comment]: <> (<hyvor></hyvor>)
