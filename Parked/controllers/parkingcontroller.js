const Parking = require('../models/parking')



exports.parkingselection = async (req, res) => {
  const record = await Parking.find()
  const username = req.session.username
  res.render('parking.ejs', { username, record })
}
exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
exports.addform = (req, res) => {
  const username = req.session.username
  res.render('addform.ejs', { username, message: '' })
}

exports.addentry = (req, res) => {
  const username = req.session.username
  const { vno, vtype } = req.body
  const record = new Parking({ vno: vno, vtype: vtype })
  record.save()
  res.render('addform.ejs', { message: 'Successfully Record Added', username })
}
exports.outentry = async (req, res) => {
  const record = await Parking.find()
  const username = req.session.username 
  res.render('parkingout.ejs', { username, record })
}

exports.calculation=async(req,res)=>{
  const id = req.params.id
  const vout =new Date()
const record =await Parking.findById(id)
const totalTimeSpend =(vout-record.vin)/(1000*60*60)
let amount = null
if(record.vtype=='2w'){
  amount=totalTimeSpend*30
}else if (record.vtype=='3w'){
  amount=totalTimeSpend*50
}else if (record.vtype=='4w'){
  amount=totalTimeSpend*70
}else if (record.vtype=='hw'){
  amount=totalTimeSpend*150
}else if (record.vtype=='lw'){
  amount=totalTimeSpend*100
}else{
  amount=totalTimeSpend*70
}
if(amount<30){
  amount =30
}

await Parking .findByIdAndUpdate(id,{vout:vout,amount:Math.round(amount),status:'OUT'})
res.redirect('/out')

}
exports.deletepark=async(req,res)=>{
  const id = req.params.id
  await Parking.findByIdAndDelete(id)
  res.redirect('/out')
}
exports.print =async(req,res)=>{
 const record=  await Parking.findById(req.params.id)
 const totalspendtime =(record.vout-record.vin)
  const username = req.session.username 
  res.render('printformat.ejs',{username,record,totalspendtime})
}