import { HttpContext } from '@adonisjs/core/http'
import { rules, schema } from '@adonisjs/validator'
import User from '#app/Models/User'

const loginSchema = schema.create({
    email: schema.string([rules.trim()]),
    password: schema.string([rules.trim()]),
})

export const loginRoute = async ({ request, auth }: HttpContext) => {
    const { email, password } = await request.validate({
        schema: loginSchema,
    })
    const user = await User.findBy('email', email)

    if (user?.otpToken === password) {
        await auth.login(user, true)
        user.otpToken = null
        await user.save()
    } else {
        await auth.attempt(email, password, true)
    }
    await auth.user?.load('notifications')
    return auth.user?.userData()
}
