import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  View,
  Button,
  Alert,

  base64Image
} from "react-native";
import { BluetoothManager,BluetoothEscposPrinter, Printer, PrintImage } from "react-native-bluetooth-escpos-printer";
import {
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import ItemList from "./ItemList";
import SamplePrint from "./SamplePrint";
import { captureRef } from 'react-native-view-shot';
import { styles } from "./styles";
import { RNFS } from 'react-native-fs';
import { useRoute } from "@react-navigation/native";
import Base64 from 'react-native-base64';
import Share from 'react-native-share'
import { faL } from "@fortawesome/free-solid-svg-icons";
const App = ({ navigation }) => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [boundAddress, setBoundAddress] = useState("");
  // const [base64Image, setBase64Image] = useState('');
  const route = useRoute();
  // const ticketImage = route.params.ticketImage;
  const base64Image = route.params.base64Image;
  const uri = route.params.uri;
  const loginD = route.params.loginD;
  const[isConnected,setIsConnected] = useState(false)
 




  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        setBleOpend(Boolean(enabled));
        setLoading(false);
      },
      (err) => {
        err;
      }
    );

    if (Platform.OS === "ios") {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          deviceAlreadPaired(rsp);
        }
      );
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        (rsp) => {
          deviceFoundEvent(rsp);
        }
      );
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName("");
          setBoundAddress("");
        }
      );
    } else if (Platform.OS === "android") {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          deviceAlreadPaired(rsp);
        }
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        (rsp) => {
          deviceFoundEvent(rsp);
        }
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName("");
          setBoundAddress("");
        }
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
        () => {
          ToastAndroid.show(
            "Device Not Support Bluetooth !",
            ToastAndroid.LONG
          );
        }
      );
    }

    console.log(pairedDevices.length);
    if (pairedDevices.length < 1) {
      scan();
      console.log("scanning...");
    } else {
      const firstDevice = pairedDevices[0];
      console.log('length  :' + pairedDevices.length);
      console.log(firstDevice);
      connect(firstDevice);

      // connect(firstDevice);
      // console.log(pairedDevices.length + "hello");
    }
  },[pairedDevices]);
  // deviceFoundEvent,pairedDevices,scan,boundAddress
  // boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan


  const deviceAlreadPaired = useCallback(
    (rsp) => {
      var ds = null;
      if (typeof rsp.devices === "object") {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) {}
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices]
  );
 

  const deviceFoundEvent = useCallback(
    (rsp) => {
      var r = null;
      try {
        if (typeof rsp.device === "object") {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs]
  );

 

  const connect = async (row) => {
    try {
      setLoading(true);
      await BluetoothManager.connect(row.address);
      setLoading(false);
      setBoundAddress(row.address);
      setName(row.name || 'UNKNOWN');
      console.log('Connected to device:', row);
      setIsConnected(true)
    } catch (e) {
      console.log("fjvndjfvnd")
     // alert(e);
      Alert.alert(
        "LIYU BUS",
        "No printer connected",
        [{ text: "OK", onPress: () => {} }]
      )
    }
    finally{setLoading(false)
    }
  };

  const unPair = (address) => {
    setLoading(true);
    BluetoothManager.unpaire(address).then(
      (s) => {
        setLoading(false);
        setBoundAddress("");
        setName("");
      },
      (e) => {
        setLoading(false);
        alert(e);
      }
    );
  };

  const scanDevices = useCallback(() => {
    setLoading(true);
    BluetoothManager.scanDevices().then(
      (s) => {
        // const pairedDevices = s.paired;
        var found = s.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
      },
      (er) => {
        setLoading(false);
        // ignore
      }
    );
  }, [foundDs]);

  const scan = useCallback(() => {
    try {
      async function blueTooth() {
        const permissions = {
          title: "HSD bluetooth asks for permission to access bluetooth",
          message:
            "HSD bluetooth requires access to bluetooth for the process of connecting to a bluetooth printer",
          buttonNeutral: "Another time",
          buttonNegative: "No",
          buttonPositive: "yes",
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
            scanDevices();
          }
        } else {
          // ignore akses ditolak
        }
      }
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  const scanBluetoothDevice = async () => {
    setLoading(true);
    try {
      const request = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      if (
        request["android.permission.ACCESS_FINE_LOCATION"] === RESULTS.GRANTED
      ) {
        scanDevices();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };



  const base64ImageNoSchema = base64Image.split(",")[1]
  const shareViewAsImage= async () => {
    console.log('uri--------------------',uri)
    try {
      // const uri = await viewRef.current.capture();
      const shareOptions = {
        title: 'Share Image',
        message: 'Your Ticket',
        url: uri, 
        type: 'image/jpeg',
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };
 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bluetoothStatusContainer}>
        <Text style={styles.bluetoothStatus(bleOpend ? "#47BF34" : "#A8A9AA")}>
          Bluetooth {bleOpend ? "Active" : "Not Active"}
        </Text>
      </View>
      {!bleOpend && (
        <Text style={styles.bluetoothInfo}>Please activate your bluetooth</Text>
      )}
      <Text style={styles.sectionTitle}>
        Printer connected to the application:
      </Text>
      {boundAddress.length > 0 && (
        <ItemList
          label={name}
          value={boundAddress}
          onPress={() => unPair(boundAddress)}
          actionText="Disconnect"
          color="#E9493F"
        />
      )}
      {boundAddress.length < 1 && (
        <Text style={styles.printerInfo}>
          There is no printer connected yet
        </Text>
      )}
      <Text style={styles.sectionTitle}>
        Bluetooth connected to this cellphone:
      </Text>

      <View style={styles.containerList}>
        {pairedDevices.map((item, index) => {
          return (
            <ItemList
              key={index}
              onPress={() => connect(item)}
              label={item.name}
              value={item.address}
              connected={item.address === boundAddress}
              actionText="Connect"
              color="#00BCD4"
            />
          );
        })}
      </View>
    
      <Button onPress={() => scanBluetoothDevice()} title="Scan Bluetooth" />
      <View style={{marginTop:10}}>
        <Button
          title="Print Ticket"
          onPress={async ()=> {
            setLoading(true)
            try {
            
            await BluetoothEscposPrinter.printPic(base64ImageNoSchema, {
                width: 700,
                right: 10
              });
      
            }
           
            catch (e) {
              console.log("error :" ,e);
              console.log('dvmfjvkdnvkdjf')
              
            }
          
            if(isConnected){
              console.log('hello')
              navigation.navigate("home", { loginD })
                        }
                      
          }}
        />
      </View>
      <View style={{marginTop:10}}>
        <Button
          title="Share Ticket"
          onPress={()=> {
            shareViewAsImage()
          }}
        />
      </View>
      {/* <View style={{marginTop:10}}>
        <Button
          title="check"
          onPress={()=> {
            console.log('loginD----------',loginD)
          }}
        />
      </View> */}
            {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#3c6791" />
          </View>
        )}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};
export default App;