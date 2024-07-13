import type { HttpContext } from '@adonisjs/core/http'
import { breakVotesIndex } from '#app/Controllers/Http/breakVotes/breakVotesIndex'
import { storeBreakVote } from '#app/Controllers/Http/breakVotes/storeBreakVote'

export default class BreakVotesController {
    public async index(ctx: HttpContext) {
        return breakVotesIndex(ctx)
    }

    public async store(ctx: HttpContext) {
        return storeBreakVote(ctx)
    }

    public async show(ctx: HttpContext) {
        return ctx.response.notImplemented({ error: 'not implemented' })
    }

    public async update(ctx: HttpContext) {
        return ctx.response.notImplemented({ error: 'not implemented' })
    }

    public async destroy(ctx: HttpContext) {
        return ctx.response.notImplemented({ error: 'not implemented' })
    }
}
