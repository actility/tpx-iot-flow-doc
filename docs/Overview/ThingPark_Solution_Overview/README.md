# ThingPark X IoT Flow Overview

A Digital twin is a computer representation of a physical device or process. Actility believes in a more efficient and sustainable world through use of ubiquitous digital-twin technology, enabling algorithmic and AI driven optimization.

We want to spark this transition and become the leading global mediation platform between cloud apps & physical world.
ThingPark X is the cornerstone of Actility’s vision to make digital twins common place. ThingPark X simplifies the interface between LPWAN-connected sensors and IoT applications, transforming raw data into application-friendly actionable information that can be fed into digital twins objects of various IoT Platforms.

The ThingPark X IoT Flow Connector interfaces expose device properties (and their current values e.g. battery level) to external platforms, along with callable methods to send commands (which, in the case of LoRaWAN devices, will trigger downlink messages to the device).

<img src="./images/ThingPark.png" width=500 />

### ThingPark X IoT Flow in the ThingPark Product Stack

ThingPark X IoT Flow acts as a mediation layer handling bi-directional communication between ThingPark powered IoT networks and
application servers as well as leading cloud-based IoT platforms in order to keep digital twins in sync.
This ability to feed digital twins consistently regardless of the brand or function of LPWAN sensors relies on
key capabilities delivered by TP X IoT Flow:

1. ***Drivers***: Transforms the device specific payload into a generic JSON object. Based on ThingPark device profiles, our TP X Platform decodes uplink messages collected through the LPWAN network and transforms raw data into actionable data points. This is performed by two successive functional blocks, a binary-to-json transformation, followed by generic ontology mapping (i.e. adding physical meaning to each data point). ThingPark X Drivers Library supports already more that 100 sensor models and offers the possibility to design and upload custom drivers.

2. ***Connections***: Adapting the ontology model, transport protocol and forwarding to external application servers or cloud providers. Connectors ensure the proper delivery of the extracted sensor data (via the Driver engine) to your selected IoT platform (AWS IoT Core, Azure IoT hub or IoT Central, Thingworx and many more), ensuring that:
   
	a. Authentication is properly handled
   
	b. Device / Thing provisioning is consistent. E.g. AWS IoT Core connector will create dedicated thing type on AWS IoT Core and instantiates things if it does not exist yet.
   
    c. Data publication is at the right place - e.g.  in the device shadow, or in the alarm framework of the IoT platform if the extracted data is an alarm.

3. ***Flows***: Define the list of devices that will be in scope of this data flow, the Driver(s) to use for these devices in order to encode commands, decode uplink payloads and map them to the proper ontology, and the bidirectional Connection(s) to interface with external platforms. Flows allow filtering and forwarding along with optional data transformation such as decoding, filtering and mapping.
