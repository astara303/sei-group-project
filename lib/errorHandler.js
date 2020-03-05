function errorHandler(err, req, res, next) {
  // console.log('this errors name is ', err.name)
  if (err.name === 'ValidationError') {
    const customErrors = {}
    console.log(err)
    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
      console.log(err)
    }
    return res.status(422).json({ message: 'Unprocessable Entity', errors: customErrors })
  }

  if (err.message === 'Not Found' || err.name === 'CastError' ) {
    return res.status(404).json({ message: 'Not Found' })
  }

  res.status(500).json({ message: 'Internal Server Error' })
  next(err)
}
module.exports = errorHandler