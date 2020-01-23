describe('Tipsport live', () => {

  beforeEach(() => {
    if (process.env.PT_AUDIT == 'allow') {
      browser.enablePerformanceAudits({
        networkThrottling: 'online'
      })
    }
  })

  describe('Homepage', function () {

    it('open', () => {
      // open browser
      browser.url('/')

      // wait for title element
      const titleElm = $('//title[contains(text(),"Tipsport | Největší komunita sázkařů")]')
      expect(titleElm.waitForExist()).to.be.true

      // wait for loadEventEnd
      browser.waitForloadEventEnd()

      // evaluate of Performance Audit
      browser.EvaluatePerformanceAudit()

    })
  })

  describe('Live', function(){

    it('open', () => {
      // open browser
      browser.url('/live')

      // wait for title element
      const titleElm = $('//title[contains(text(),"LIVE sázky | Tipsport")]')
      expect(titleElm.waitForExist()).to.be.true

      // wait for loadEventEnd
      browser.waitForloadEventEnd()

    })
  })

  afterEach(() => {
    browser.disablePerformanceAudits()
  })

})
