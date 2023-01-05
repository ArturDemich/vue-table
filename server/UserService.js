import User from "./User.js";
import moment from "moment";

class UserService {
    async create(user) {
        const createdUser = await User.create({ ...user.data })
        return createdUser
    }

    async getAll() {
        const users = await User.find()

        const dateNow = moment().format('YYYY-MM-DDTHH:mm')

        const usersMap = await users.map((user) => {
            if (user.events) {
                for (let i = 0; i < user.events.length; i++) {
                    if (user.events[i].startDate >= dateNow) {
                        user.nextDateEvent = user.events[i].startDate
                        break
                    } else {
                        user.nextDateEvent = "No date next event"
                    }
                }
            }
            return user
        })
        return usersMap
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не вказано ID')
        }
        const user = await User.findById(id)
        return user
    }

    async update(id, event) {
        if (!id) {
            throw new Error('не вказано ID')
        }
        const { events } = await User.findById(id)
        events.push(event)

        const updatedUser = await User.findByIdAndUpdate(id, { events: events })
        return updatedUser
    }

    async delete(id) {
        if (!id) {
            throw new Error('не вказано ID')
        }
        const user = await User.findByIdAndDelete(id)
        return user
    }
}


export default new UserService();