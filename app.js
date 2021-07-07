import ListHeadsets from "./ListHeadsets.js"
import Headset from './Headset.js'
import Notification from './Notify.js'

let state = {
  notified: {
      max: false,
      low: false
  }
}

try {
  var headsetCreds = new ListHeadsets().getConnectedHeadset()
  var myHeadset = new Headset(headsetCreds)
  var notify = new Notification(state)
} 
catch (init_error) {
  console.log(init_error)
}

setInterval(function(){
  try {
      let battery_percent = myHeadset.getBatteryPercentage()
      if (battery_percent != null) {
        notify.pushNotification(battery_percent, state)
        state = notify.state
        console.log(`Battery: ${battery_percent}%`)
      }
  }
  catch (write_error) {
      console.log(write_error)
  }
}, 1000);