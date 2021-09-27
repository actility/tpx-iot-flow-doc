# Scope

The purpose of this User Guide is to describe the ThingPark X IoT Flow functionality, part of the ThingPark X framework. IoT Flows process bi-directional data streams produced and consumed by IoT sensors & IoT applications.

An LPWAN Device is both a source of events (“uplinks”) and a sink for commands (“downlinks”).
An IoT cloud service such as Azure IoT hub or AWS IoT also acts as both a sink and a source of events.
ThingPark X IoT Flow interconnects such endpoints, while also allowing additional value-added processing of the data in transit.
ThingPark X IoT Flow does not provide any persistent storage facility, if you need to store your IoT data for the long term, consider using ThingPark X IoT Core, or equivalent 3rd party cloud systems. 

This document targets end-user or developers who need to understand ThingPark X IoT Flow key concepts and learn how to configure it together with ThingPark Wireless. 

Reading this user guide, you will learn how to perform the following tasks:

* Create an instance of IoT Flow
* Set a connection with a 3rd party cloud API connector
* Configure settings of connectors to supported IoT cloud platforms
* Configure ThingPark Wireless in order to associate a Device with an IoT flow.


