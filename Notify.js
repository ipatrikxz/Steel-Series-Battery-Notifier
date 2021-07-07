import notifier from 'node-notifier'

export default class Notify{

    notifications = {
        max: {
            title: 'Fejhallgató feltöltve ',
            message: 'Lehuzhatod a töltőröl.'
        },
        min: {
            title: 'Fejhallgató lemerül ',
            message: 'Merül a fülesed báttya. Dugd be lassan.'
        },
    }

    state = {
        notified: {
            max: null,
            low: null
        }
    }

    constructor(state){
        this.state.notified.max = state.notified.max
        this.state.notified.low = state.notified.low
    }

    pushNotification(battery_percent){
        if (battery_percent > 1) {
            
            if(this.state.notified.max == false) {     
                if (battery_percent > 85 && battery_percent < 100){
                    this.state.notified.max = true
                    this.notifyOnMaxBattery(battery_percent)
                }
            }
            if(this.state.notified.low == false) {
                if(battery_percent < 10){
                    this.notifyOnLowBattery(battery_percent)
                    this.state.notified.low = true
                }
            }
        }
    }

    notifyOnMaxBattery(battery_percent){
        notifier.notify({
            title: `${this.notifications.max.title} ${battery_percent}%`,
            message: this.notifications.max.message,
        })
    }

    notifyOnLowBattery(battery_percent){
        notifier.notify({
            title: `${this.notifications.min.title} ${battery_percent}%`,
            message: this.notifications.min.message,
        })
    }

}