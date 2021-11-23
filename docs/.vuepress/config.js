var fs = require('fs');
var version = fs.readFileSync('./version.txt', 'utf8').trim();


module.exports = {
    theme: getPackage().theme,
    title: getTitle,
    // theme: 'display',
    description: 'A guide on how to install/operate/understand/use ThingPark X platform in production',
    base: '/thingpark-x/latest/',
    themeConfig: {
        logo: getPackage().banner,
        emojicomKey: '24lr9TXIVpwrZ8KvVCll',
        repo: 'https://github.com/actility/tpx-iot-flow-doc',
        repoLabel: 'Contribute!',
        docsRepo: 'https://github.com/actility/tpx-iot-flow-doc',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Edit on GitHub',
        lastUpdated: 'Last Updated',
        informationDeep: deepData(),
        smoothScroll: true,
        nav: [
            {
                text: 'Versions',
                ariaLabel: 'Language Menu',
                items: [
                    {
                        text: 'Latest',
                        link: 'https://docs.preprod.thingpark.com/thingpark-x/latest/Overview/ThingPark_Solution_Overview/'
                    },
                    {
                        text: '1.4',
                        link: 'https://docs.preprod.thingpark.com/thingpark-x/1.4/Overview/ThingPark_Solution_Overview/'
                    },
                    {
                        text: '1.3',
                        link: 'https://docs.preprod.thingpark.com/thingpark-x/1.3/Overview/ThingPark_Solution_Overview/'
                    }
                ]
            },
        ],
        sidebar: {
            '/': [
                {
                    title: 'Overview',   // required
                    collapsable: true, // optional, defaults to true
                    path: '/Overview/',
                },
                {
                    title: 'Getting Started',   // required
                    collapsable: true, // optional, defaults to true
                    children: [
                        {
                            title: 'Access ThingPark X Iot Flow',   // required
                            path: '/Getting_Started/Acces_ThingPark_X_Iot_Flow/ThingPark_X_Iot_Flow_UI/Direct_Access',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: true, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                            children: [
                                {
                                    title: 'ThingPark X Iot Flow UI',   // required
                                    path: '/Getting_Started/Acces_ThingPark_X_Iot_Flow/ThingPark_X_Iot_Flow_UI/Direct_Access',      // optional, link of the title, which should be an absolute path and must exist
                                    collapsable: true, // optional, defaults to true
                                    sidebarDepth: 1,    // optional, defaults to 1
                                    children: [
                                        '/Getting_Started/Acces_ThingPark_X_Iot_Flow/ThingPark_X_Iot_Flow_UI/Direct_Access',
                                        {
                                            title: 'From ThingPark Entreprise',   // required
                                            path: '/Getting_Started/Acces_ThingPark_X_Iot_Flow/ThingPark_X_Iot_Flow_UI/From_ThingPark_Entreprise',      // optional, link of the title, which should be an absolute path and must exist
                                            collapsable: true, // optional, defaults to true
                                            sidebarDepth: 1,    // optional, defaults to 1
                                        },
                                    ]
                                },
                                {
                                    title: 'ThingPark X Iot Flow API',   // required
                                    path: '/Getting_Started/Acces_ThingPark_X_Iot_Flow/ThingPark_X_Iot_Flow_API/',      // optional, link of the title, which should be an absolute path and must exist
                                    collapsable: true, // optional, defaults to true
                                    sidebarDepth: 1,    // optional, defaults to 1
                                },
                            ]
                        },
                        // {
                        //     title: 'ThingPark X IoT Flow API overview',   // required
                        //     path: '/Getting_Started/Getting_Started_ThingPark/',      // optional, link of the title, which should be an absolute path and must exist
                        //     collapsable: false, // optional, defaults to true
                        //     sidebarDepth: 1,    // optional, defaults to 1
                        // },

                        {
                            title: 'Setting up a connection instance',   // required
                            path: '/Getting_Started/Setting_Up_A_Connection_instance/Creating_a_connection_instance_using_ThingPark_X_IoT_Flow_UI',
                            collapsable: true, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                            children: [
                                {
                                    title: 'Creating a connection instance using ThingPark X IoT-Flow UI',   // required
                                    path: '/Getting_Started/Setting_Up_A_Connection_instance/Creating_a_connection_instance_using_ThingPark_X_IoT_Flow_UI',      // optional, link of the title, which should be an absolute path and must exist
                                    collapsable: true, // optional, defaults to true
                                    sidebarDepth: 1,    // optional, defaults to 1
                                },
                                {
                                    title: 'Creating a connection instance using the API',   // required
                                    path: '/Getting_Started/Setting_Up_A_Connection_instance/Creating_a_connection_instance_using_the_API',      // optional, link of the title, which should be an absolute path and must exist
                                    collapsable: true, // optional, defaults to true
                                    sidebarDepth: 1,    // optional, defaults to 1
                                },
                                {
                                    title: 'About connections',   // required
                                    path: '/Getting_Started/Setting_Up_A_Connection_instance/About_connections',      // optional, link of the title, which should be an absolute path and must exist
                                    collapsable: true, // optional, defaults to true
                                    sidebarDepth: 1,    // optional, defaults to 1
                                }
                            ]
                        },
                        {
                            title: 'Setting up an IoT Flow instance',   // required
                            path: '/Getting_Started/Setting_Up_An_IoT_Flow_Instance/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Associating ThingPark Wireless devices with ThingPark X IoT Flow',   // required
                            path: '/Getting_Started/Associating_ThingPark_Wireless_Devices_With_A_ThingPark_X_IoT_Flow/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Driver and Codec API',   // required
                            path: '/Getting_Started/Driver_And_Codec_API/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                    ]
                },
                {
                    title: 'Message',   // required
                    collapsable: true, // optional, defaults to true
                    sidebarDepth: 1,    // optional, defaults to
                    children: [
                        {
                            title: 'Uplink Message',   // required
                            path: '/Message/Uplink_Message/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: true, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Downlink Message',   // required
                            path: '/Message/Downlink_Message/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Notification Message',   // required
                            path: '/Message/Notification_Message/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                    ]
                },
                {
                    title: 'Connector',   // required// optional, link of the title, which should be an absolute path and must exist
                    collapsable: true, // optional, defaults to true
                    children: [
                        {
                            title: 'Connecting with MQTT',   // required
                            path: '/Connector/MQTT/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Connecting to AZURE IoT',   // required
                            path: '/Connector/AZURE/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Connecting to AWS IoT core',   // required
                            path: '/Connector/AWS/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Connecting to AWS GreenGrassV2',   // required
                            path: '/Connector/AWS_GG/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Connecting to HERE',   // required
                            path: '/Connector/HERE/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Connecting to HTTP',   // required
                            path: '/Connector/HTTP/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Connecting to THINGWORX',   // required
                            path: '/Connector/THINGWORX/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Connecting to IBM Watson',   // required
                            path: '/Connector/IBMWATSON/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Connecting to YANDEX',   // required
                            path: '/Connector/YANDEX/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        {
                            title: 'Connecting to MODBUS',   // required
                            path: '/Connector/MODBUS/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        },
                        // {
                        //     title: 'Connecting to OPC-UA',   // required
                        //     path: '/Connector/OPCUA/',      // optional, link of the title, which should be an absolute path and must exist
                        //     collapsable: false, // optional, defaults to true
                        //     sidebarDepth: 1,    // optional, defaults to 1
                        // },
                        {
                            title: 'Connecting to GINJER',   // required
                            path: '/Connector/GINJER/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                         },
                        // {
                        //     title: 'Connecting to TAGO',   // required
                        //     path: '/Connector/TAGO/',      // optional, link of the title, which should be an absolute path and must exist
                        //     collapsable: false, // optional, defaults to true
                        //     sidebarDepth: 1,    // optional, defaults to 1
                        // }
                    ]
                },
                {
                    title: 'Appendix',   // required
                    collapsable: true, // optional, defaults to true
                    children: [
                        {
                            title: 'Appendix',   // required
                            path: '/Appendix/',      // optional, link of the title, which should be an absolute path and must exist
                            collapsable: false, // optional, defaults to true
                            sidebarDepth: 1,    // optional, defaults to 1
                        }
                    ]
                }
            ],
        }
    },
    plugins: [
        [
            '@vuepress/last-updated'
        ]
    ]
};

function getPackage() {
    var options = {}
    const resultPackages = require('minimist')(process.argv.slice(2))._[2]
    if (resultPackages) {
        options['theme'] = resultPackages
        options['banner'] = '/img/DesktopBanner-' + resultPackages + '.png'
        return options
    } else {
        options['theme'] = 'actility'
        options['banner'] = '/img/DesktopBanner-actility.png'
        return options
    }
}

function getTitle() {
    return 'ThingPark X IoT Flow (' + version + ')';
}

function deepData(){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear()
    var hh = String(today.getHours()).padStart(2, '0');
    var min = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');
    let objectJson = {
        currentDate : {
            Year: yyyy,
            Month : mm,
            Day : dd,
            Hours: hh,
            Minutes : min,
            Secondes:ss
        },
        currentPackage : JSON.parse(fs.readFileSync('./package.json', 'utf8').trim())
    }
    return objectJson
}


function getBase() {
    if (version.endsWith("-SNAPSHOT")) {
        return "/thingpark-x/";
    }
    var rx = /([0-9]*\.[0-9]*).*/g;
    var result = rx.exec(version);
    return "/thingpark-x/" + result[1] + "/";
}
