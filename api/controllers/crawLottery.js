const { checkQueryCrawler } = require('../helpers/checkParams')
const LotteryCraw = require('../craw')

exports.get_craw = (req, res) => {
  const { area , from, to } = checkQueryCrawler(req.query)

  if(area === '' ||from === '' ||  to === '') {
    return res.status(400).json({
      status: 0
    })
  }

  res.status(200).json({
    status: 1,
    msg: 'getting lottery...'
  })
  // const urlArr = LotteryCraw.getCrawLotteryUrl(area, from, to);
  // console.log(urlArr)

}
