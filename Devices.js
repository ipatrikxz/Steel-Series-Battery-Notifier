import HID from "node-hid"

export default class Devices{
    constructor(VID, PID){
        this.VID = VID
        this.PID = PID
        this.devices = HID.devices()
        HID.setDriverType('libusb');
    }

    showDevices(){
        return this.devices
    }

    getBatteryPercentage(){
        this.devices
        .filter(d => d.vendorId === this.VID && d.productId === this.PID && d.usage !== 1)
        .forEach((deviceInfo) => {
            try {
                var device = new HID.HID(deviceInfo.path)
                device.setNonBlocking(0);

                device.write([0x06, 0x18])
                var report = device.readTimeout(1000)[2]
                if (parseInt(report) > 1){
                    return report
                }
                return null;
                
            } catch (error) {
                throw new Error('Error: ' + error);
            }
        }); 
    }

}