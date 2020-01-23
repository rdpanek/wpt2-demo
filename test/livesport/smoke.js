describe('Livesport', () => {

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
      const titleElm = $('//title[contains(text(),"Livesport.cz: Fotbal online, fotbalové live výsledky, livescore")]')
      expect(titleElm.waitForExist()).to.be.true

      // wait for loadEventEnd
      browser.waitForloadEventEnd()

      // evaluate of Performance Audit
      browser.EvaluatePerformanceAudit()

    })
  })
  
  afterEach(() => {
    browser.disablePerformanceAudits()
  })

})
