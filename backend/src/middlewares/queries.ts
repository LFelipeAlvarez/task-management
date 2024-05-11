import { RequestHandler } from 'express'

export const validateBoardQuery: RequestHandler = (req, res, next) => {
  if (req.query.board === undefined) {
    return res.status(400).json({ error: 'Query parameter "board" is required' })
  }
  next()
}

// export const validateParams: RequestHandler = (req, res, next) => {
//   if (req.params.id === undefined) {
//     return res.status(400).json({ error: 'ID is required in the URL for this operation' })
//   }
//   next()
// }
