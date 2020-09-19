const { checkQueryCrawler } = require('../helpers/checkParams')
const LotteryCraw = require('../craw')

const checkFailSaveLottery = (urlArr) => {

  const craw = new LotteryCraw()
  const fail = craw.saveLotteries(urlArr)

  if (fail.length) {
    checkFailSaveLottery(fail)
  }
}

exports.get_craw = (req, res) => {
  const { area , from, to } = checkQueryCrawler(req.query)

  if(area === '' ||from === '' ||  to === '') {
    return res.status(400).json({
      status: 0,
      msg: 'not found'
    })
  }

  res.status(200).json({
    status: 1,
    msg: 'getting lottery...'
  })

  console.log(req.io)

  // const craw = new LotteryCraw()
  // const urlArr = craw.getCrawLotteryUrl(area, from, to);
  // try {
  //   checkFailSaveLottery(urlArr)
  // } catch (err) {
  //   console.log(err)
  // }
}
