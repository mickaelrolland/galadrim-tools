import { MatrixDto, rotateMatrix } from '@galadrim-tools/shared'
import BaseSeeder from '@adonisjs/lucid/seeders'
import Matrix from '#app/Models/Matrix'

const matrices: MatrixDto[] = [
    {
        red: 0b01000_00001_10010_10110_10001,
        blue: 0b00100_01110_00001_00001_01100,
        white: 0b10011_10000_01000_01000_00010,
        black: 12,
    },
    {
        red: 0b01000_00001_11100_00100_10010,
        blue: 0b00111_10000_00011_11001_00000,
        white: 0b10000_01010_00000_00010_01101,
        black: 7,
    },
    {
        red: 0b10001_10100_00010_00000_00111,
        blue: 0b01100_01011_01000_00010_11000,
        white: 0b00010_00000_10101_11001_00000,
        black: 17,
    },
    {
        red: 0b00100_10001_10000_11001_00010,
        blue: 0b01011_00000_00110_00100_11001,
        white: 0b10000_01100_01001_00010_00100,
        black: 8,
    },
    {
        red: 0b10001_10101_00001_00001_11000,
        blue: 0b01010_01000_10110_01000_00001,
        white: 0b00100_00010_01000_10010_00110,
        black: 17,
    },
    {
        red: 0b00010_00010_10111_10000_01001,
        blue: 0b10100_11000_01000_01011_00000,
        white: 0b01001_00101_00000_00100_10100,
        black: 23,
    },
    {
        red: 0b00010_01110_10101_01000_01000,
        blue: 0b11000_10000_01010_00010_10010,
        white: 0b00101_00001_00000_10101_00001,
        black: 22,
    },
    {
        red: 0b01000_11001_10101_00000_00010,
        blue: 0b10101_00010_01000_01011_00001,
        white: 0b00010_00100_00010_10100_01100,
        black: 20,
    },
    {
        red: 0b00000_01110_01001_00010_00011,
        blue: 0b00111_00000_00100_11001_11000,
        white: 0b11000_10001_10010_00000_00100,
        black: 17,
    },
    {
        red: 0b00011_01100_00001_01000_01101,
        blue: 0b10100_00001_01100_10100_10000,
        white: 0b01000_10010_10010_00001_00010,
        black: 18,
    },

    {
        red: 0b00100_00010_00110_10110_10010,
        blue: 0b10001_01100_10001_00001_01000,
        white: 0b01010_10000_01000_01000_00101,
        black: 9,
    },
    {
        red: 0b01001_01010_01000_00100_10011,
        blue: 0b10000_00100_00110_11001_00100,
        white: 0b00010_10001_10001_00010_01000,
        black: 2,
    },
    {
        red: 0b10000_00001_01111_00000_10011,
        blue: 0b01101_00110_00000_10010_01000,
        white: 0b00010_01000_10000_01101_00100,
        black: 5,
    },
    {
        red: 0b11010_00000_01010_01100_00001,
        blue: 0b00001_11010_00001_10010_01010,
        white: 0b00100_00101_10000_00001_10100,
        black: 12,
    },
    {
        red: 0b01001_11010_00100_00001_01101,
        blue: 0b10110_00000_00011_10100_00010,
        white: 0b00000_00101_11000_01010_10000,
        black: 24,
    },
    {
        red: 0b10000_10110_11001_00001_00100,
        blue: 0b01110_00000_00100_10010_11000,
        white: 0b00001_01001_00010_01100_00010,
        black: 24,
    },
    {
        red: 0b11010_01000_00000_00101_10010,
        blue: 0b00100_10001_11101_10000_00100,
        white: 0b00001_00110_00010_01010_00001,
        black: 21,
    },
    {
        red: 0b00100_01000_01010_10001_00110,
        blue: 0b00010_00101_10101_00100_10001,
        white: 0b01001_10010_00000_001010_01000,
        black: 0,
    },
    {
        red: 0b00110_11010_00000_01110_00100,
        blue: 0b01001_00000_01010_10000_11001,
        white: 0b10000_00101_00101_00001_00010,
        black: 10,
    },
    {
        red: 0b10001_01010_01001_00100_00001,
        blue: 0b00110_00100_10100_01011_00100,
        white: 0b01000_10001_00010_10000_10010,
        black: 21,
    },

    {
        red: 0b10010_00000_11000_10011_00011,
        blue: 0b00101_11001_00001_00000_01100,
        white: 0b01000_00100_00110_01100_10000,
        black: 8,
    },
    {
        red: 0b10000_00111_00010_11001_00100,
        blue: 0b01011_01000_11000_00000_10010,
        white: 0b00100_10000_00001_00110_01001,
        black: 12,
    },
    {
        red: 0b01110_00010_00001_01100_00001,
        blue: 0b10000_00101_01010_10011_00100,
        white: 0b00001_11000_10100_00000_01010,
        black: 20,
    },
    {
        red: 0b01100_01100_00011_11000_00010,
        blue: 0b00000_00001_11000_00110_10101,
        white: 0b10001_10010_00100_00001_01000,
        black: 3,
    },
    {
        red: 0b00111_00100_10101_00000_11000,
        blue: 0b01000_11000_01010_10010_00100,
        white: 0b10000_00011_00000_00101_00011,
        black: 16,
    },
    {
        red: 0b00100_00000_00101_01101_10100,
        blue: 0b10010_11000_11010_00010_00010,
        white: 0b01001_00110_00000_10000_01001,
        black: 9,
    },
    {
        red: 0b00001_10010_00100_00010_01110,
        blue: 0b01000_00100_01010_11100_10001,
        white: 0b10110_01001_10000_00001_00000,
        black: 14,
    },
    {
        red: 0b00000_01100_01001_01001_10100,
        blue: 0b10010_10011_10010_10000_00010,
        white: 0b01101_00000_00100_00100_01001,
        black: 18,
    },
    {
        red: 0b10010_11001_10000_00000_01001,
        blue: 0b00101_00100_00101_01100_10010,
        white: 0b01000_00010_01010_10001_00100,
        black: 18,
    },
    {
        red: 0b01011_00000_01010_00101_00011,
        blue: 0b00100_10100_00100_10010_01100,
        white: 0b10000_01010_10001_01000_10000,
        black: 9,
    },

    {
        red: 0b00011_10110_00000_01001_00010,
        blue: 0b10100_01001_01000_10010_10100,
        white: 0b01000_00000_10011_00100_01001,
        black: 12,
    },
    {
        red: 0b01001_11010_01000_00010_01000,
        blue: 0b00100_00001_10000_10101_10011,
        white: 0b10000_00100_00111_01000_00100,
        black: 3,
    },
    {
        red: 0b00010_01100_00010_11000_11100,
        blue: 0b11101_00000_00100_00101_00001,
        white: 0b00000_10011_10001_00010_00010,
        black: 11,
    },
    {
        red: 0b00000_00011_11011_00000_01101,
        blue: 0b01100_11100_00000_01010_00010,
        white: 0b00011_00000_00100_10101_10000,
        black: 0,
    },
    {
        red: 0b01000_10001_10110_10000_10100,
        blue: 0b00010_01010_00000_01110_01001,
        white: 0b10101_00100_01001_00000_00010,
        black: 19,
    },
    {
        red: 0b10000_00001_01110_10110_00000,
        blue: 0b01001_10100_10000_01001_00110,
        white: 0b00110_01010_00000_00000_11001,
        black: 14,
    },
    {
        red: 0b10010_00011_00000_11010_10010,
        blue: 0b01100_10100_00011_00000_01001,
        white: 0b00001_01000_10100_00101_00100,
        black: 11,
    },
    {
        red: 0b10100_00000_01101_00011_00100,
        blue: 0b00010_01111_10000_00100_01001,
        white: 0b01001_10000_00010_01000_10010,
        black: 15,
    },
    {
        red: 0b10110_00100_10000_00001_01100,
        blue: 0b01001_01000_00111_01010_10000,
        white: 0b00000_10011_01000_10100_00001,
        black: 23,
    },
    {
        red: 0b10000_10011_01000_00000_10110,
        blue: 0b00111_01100_00010_10010_01000,
        white: 0b01000_00000_10100_01101_00001,
        black: 14,
    },
]

export default class RestaurantSeeder extends BaseSeeder {
    public static environment = ['development', 'production']

    public async run() {
        const first = await Matrix.first()

        if (first) return

        const matricesToCreate = matrices.flatMap((matrix) => {
            const r90 = rotateMatrix(matrix)
            const r180 = rotateMatrix(r90)
            const r270 = rotateMatrix(r180)

            return [matrix, r90, r180, r270]
        })

        await Matrix.createMany(matricesToCreate)
    }
}
