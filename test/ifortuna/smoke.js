describe('Tipsport live', () => {

  beforeEach(() => {
    if (process.env.PT_AUDIT == 'allow') {
      browser.enablePerformanceAudits({
        networkThrottling: 'online'
      })
    }
  })

  describe('Homepage', function () {

    it('open sazeni', () => {
      // open browser
      browser.url('/sazeni')

      // wait for title element
      const titleElm = $('//title[contains(text(),"Kurzové sázení online | Fortuna")]')
      expect(titleElm.waitForExist()).to.be.true

      // wait for loadEventEnd
      browser.waitForloadEventEnd()

      // evaluate of Performance Audit
      browser.EvaluatePerformanceAudit()

    })
  })

  afterEach(() => {
    if (process.env.PT_AUDIT == 'allow') {
      browser.disablePerformanceAudits()
    }
  })

})
