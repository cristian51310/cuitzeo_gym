
/****************************************************************/
/*                  Obtener pagina de error 404                 */
/****************************************************************/

exports.getError = (req, res, next) => {
  res.status(404).render('404')
}
