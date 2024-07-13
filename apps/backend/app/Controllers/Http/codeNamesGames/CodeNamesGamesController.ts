import type { HttpContext } from '@adonisjs/core/http'
import { addCodeNamesGameRound } from '#app/Controllers/Http/codeNamesGames/addCodeNamesGameRound'
import { codeNamesGamesIndex } from '#app/Controllers/Http/codeNamesGames/codeNamesGamesIndex'
import { destroyCodeNamesGame } from '#app/Controllers/Http/codeNamesGames/destroyCodeNamesGame'
import { showCodeNamesGame } from '#app/Controllers/Http/codeNamesGames/showCodeNamesGame'
import { storeCodeNamesGame } from '#app/Controllers/Http/codeNamesGames/storeCodeNamesGame'

export default class CodeNamesGamesController {
    public async index(ctx: HttpContext) {
        return codeNamesGamesIndex(ctx)
    }

    public async store(ctx: HttpContext) {
        return storeCodeNamesGame(ctx)
    }

    public async show(ctx: HttpContext) {
        return showCodeNamesGame(ctx)
    }

    public async update({ response }: HttpContext) {
        return response.notImplemented({ error: 'Not implemented yet' })
    }

    public async destroy(ctx: HttpContext) {
        return destroyCodeNamesGame(ctx)
    }

    public async addRound(ctx: HttpContext) {
        return addCodeNamesGameRound(ctx)
    }
}
