import bcrypt from 'bcrypt'

import { response } from '../../../types/controller.options'

export default async function genHash(pass: string): Promise<response> {
  const randomSalt: number = Math.floor(Math.random() * 9);

  return await new Promise((resolve, reject) => {
    bcrypt.hash(pass, randomSalt, function (err, hash) {
      if (err) reject({
        error: true,
        message: `Houve um erro inesperado.`,
        statusCode: 500
      })
      resolve({
        error: false,
        message: hash,
        statusCode: 500
      })
    });
  })
}
