const router = require('express').Router()
const regc = require('../controllers/regcontroller')
const parkingc = require('../controllers/parkingcontroller')
 const handlelogin =  require('../helper/handlelogin')



router.get('/', regc.loginform)
router.post('/', regc.logincheck)
router.get('/parking',handlelogin,parkingc.parkingselection)
router.get('/logout',parkingc.logout)
router.get('/add',parkingc.addform)
router.post('/add',parkingc.addentry)
router.get('/out',parkingc.outentry)
router.get('/parkingupdate/:id',parkingc.calculation)
router.get('/deletepark/:id',parkingc.deletepark)
router.get('/print/:id',parkingc.print)



module.exports = router