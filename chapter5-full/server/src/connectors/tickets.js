import { Tickets } from '../providers'

export function getAll ({ user }) {
  return Tickets.find({
    user_id: user._id,
  })
}

export function getById (id) {
  return Tickets.findOne({
    _id: id,
  })
}

export function create ({ user }, { title, description }) {
  return Tickets.insert({
    title,
    description,
    user_id: user._id,
    date: new Date(),
    comments: [],
  })
}
