import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { IImage } from '@galadrim-tools/shared'
import { DateTime } from 'luxon'
import CodeNamesGameRound from './code_names_game_round.js'

export default class CodeNamesGame extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare redSpyMasterId: number

  @column()
  declare blueSpyMasterId: number

  @column({
    prepare: (value: 0 | 1) => Boolean(value),
    serialize: (value: 0 | 1) => Boolean(value),
  })
  declare isOver: boolean

  // @attachment({ folder: 'codeNames', preComputeUrl: true })
  declare image: IImage | null

  @hasMany(() => CodeNamesGameRound, { foreignKey: 'gameId' })
  declare rounds: HasMany<typeof CodeNamesGameRound>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
