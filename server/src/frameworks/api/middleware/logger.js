module.exports.logger = (req, res, next) => {
  console.log('[REQUEST]\n'
    + `# Type: ${req.method}\n`
    + `# URL: ${req.originalUrl}\n`
  )
  next()
}
