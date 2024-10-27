import { DEFAULT_MESSAGE_PROVIDER_CONFIG } from "#adomin/validation/default_validator";
import Office from "#models/office";
import RoomReservation from "#models/room_reservation";
import type { HttpContext } from "@adonisjs/core/http";
import vine, { SimpleMessagesProvider } from "@vinejs/vine";

const validationSchema = vine.compile(
    vine.object({
        range: vine.array(vine.date({ formats: { utc: true } })),
    }),
);

const messagesProvider = new SimpleMessagesProvider(DEFAULT_MESSAGE_PROVIDER_CONFIG);

export const reservationsIndex = async ({ params, request }: HttpContext) => {
    const { officeId } = params;
    const office = await Office.query().where("id", officeId).preload("rooms").firstOrFail();
    const searchParams = await validationSchema.validate(request.qs(), {
        messagesProvider,
    });
    const reservationsQuery = RoomReservation.query().whereIn(
        "officeRoomId",
        office.rooms.map((r) => r.id),
    );

    reservationsQuery.where((q) => {
        searchParams.range.forEach((date) => {
            q.orWhereRaw("DATE(start) = DATE(?)", [date]);
        });
    });

    const reservations = await reservationsQuery.preload("user");

    return reservations;
};