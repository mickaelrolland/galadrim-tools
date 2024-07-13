import { hasRights } from '@galadrim-tools/shared'
import { HttpContext } from '@adonisjs/core/http'
import Event from '#app/Models/Event'
import Ws from '#app/Services/Ws'
import { validateEventsParams } from './storeEvent'

export const updateRoute = async ({ params, request, auth, response }: HttpContext) => {
    const event = await Event.findOrFail(params.id)
    const user = auth.user!
    if (event.userId !== user.id && !hasRights(user.rights, ['EVENT_ADMIN'])) {
        return response.forbidden({ error: `Vous n'avez pas les droits nécessaires` })
    }
    const { start, end, room, title } = await validateEventsParams(request)
    event.start = start
    event.end = end
    event.room = room
    if (title) {
        event.title = title
    }
    await event.save()
    Ws.io.to('connectedSockets').emit('updateEvent', event)
    return event
}
