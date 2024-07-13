import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import type { ColumnConfig } from '../createModelViewConfig'
import { LucidRow } from " @adonisjs/lucid/types/model";

export const loadFilesForInstances = async (fields: ColumnConfig[], modelInstances: LucidRow[]) => {
    const filesColumn = fields.filter(({ adomin }) => adomin.type === 'file')

    const promises = modelInstances.flatMap(async (modelInstance) => {
        const innerPromises = filesColumn.map(async ({ name }) => {
            const attachment: AttachmentContract | undefined = modelInstance[name]
            if (!attachment || typeof attachment.url === 'string') return
            const url = await attachment.getUrl()
            attachment.url = url
        })

        await Promise.all(innerPromises)
    })

    await Promise.all(promises)
}
