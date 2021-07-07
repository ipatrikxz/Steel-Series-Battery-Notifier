import notifier from 'node-notifier'

export default class Notify{

    notifications = {
        max: {
            title: 'The battery is fully charged.',
            message: 'You can now remove the charger.'
        },
        min: {
            title: 'The battery is low.',
            message: 'Please plug in a charger.'
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
                if (battery_percent > 80 && battery_percent < 100){
                    this.state.notified.max = true
                    this.notifyOnMaxBattery(battery_percent)
                }
            }
            if(this.state.notified.low == false) {
                if(battery_percent <= 10){
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