import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContext } from '@adonisjs/core/http'
import { validateRestaurantsParams } from '#app/Controllers/Http/restaurants/storeRestaurant'
import Restaurant from '#app/Models/Restaurant'
import RestaurantTag from '#app/Models/RestaurantTag'
import Ws from '#app/Services/Ws'

type PromiseType<T> = T extends Promise<infer U> ? U : never

type RestaurantValidatedInput = PromiseType<ReturnType<typeof validateRestaurantsParams>>

const updateRestaurantScalars = async (restaurant: Restaurant, input: RestaurantValidatedInput) => {
    const { name, description, lat, lng, image, averagePrice, websiteLink } = input

    restaurant.name = name
    restaurant.description = description
    restaurant.lat = lat
    restaurant.lng = lng
    restaurant.websiteLink = websiteLink ?? null

    restaurant.averagePrice = averagePrice ?? null

    if (image) {
        restaurant.image = Attachment.fromFile(image)
    }

    await restaurant.save()
}

const updateRestaurantTags = async (restaurant: Restaurant, newTags: number[]) => {
    await restaurant.load('tags')

    const tagsIdsArray = restaurant.tags.map((tag) => tag.id)
    const tagsSet = new Set(tagsIdsArray)
    const tagsToCreate = newTags
        .filter((tagId) => !tagsSet.has(tagId))
        .map((tagId) => ({ restaurantId: restaurant.id, tagId }))

    await RestaurantTag.createMany(tagsToCreate)

    const newTagsSet = new Set(newTags)
    const tagsToDelete = tagsIdsArray.filter((tagId) => !newTagsSet.has(tagId))

    await RestaurantTag.query()
        .where('restaurantId', restaurant.id)
        .andWhereIn('tagId', tagsToDelete)
        .delete()
}

export const updateRoute = async ({ params, request, bouncer }: HttpContext) => {
    const restaurant = await Restaurant.findOrFail(params.id)

    await bouncer.with('RestaurantsPolicy').authorize('viewUpdateOrDelete', restaurant)

    const input = await validateRestaurantsParams(request)

    await updateRestaurantScalars(restaurant, input)

    await updateRestaurantTags(restaurant, input.tags)

    const restaurantToSend = await Restaurant.fetchById(restaurant.id)

    Ws.io.to('connectedSockets').emit('updateRestaurant', restaurantToSend)

    return restaurantToSend
}
