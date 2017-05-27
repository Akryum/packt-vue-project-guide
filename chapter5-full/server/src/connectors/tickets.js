import { Tickets } from '../providers'

export function getAll (user) {
  return Tickets.find({
    user_id: user._id,
  })
}
