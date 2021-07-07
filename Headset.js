import HID from "node-hid"
HID.setDriverType('libsub')

export default class Headset{
    constructor(deviceInfo){
        this.headset_name = deviceInfo['product'].replace('SteelSeries ','')
        this.device = new HID.HID(deviceInfo.path)
        this.device.setNonBlocking(1)
        
        if (!this.device) throw new Error('Error initialize Headset.')
    }

    getHeadsetName(){
        return this.headset_name
    }

    getBatteryPercentage(){
        try{
            this.device.write([0x06, 0x18])
            const report = this.device.readTimeout(1000);

            if(parseInt(report) > 1){
                const battery_percent = report[3]
                return battery_percent;
            }
            return null;

        } catch (error) {
            throw new Error('Cannot write to Headset.');
        }
    }

}