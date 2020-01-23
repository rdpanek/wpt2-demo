describe('Brno Zidenice', () => {

  before(() => {
    if (process.env.PT_AUDIT == 'allow') {
      browser.enablePerformanceAudits({
        networkThrottling: 'online'
      })
    }
  })

  describe('HomePage', function(){

    it('open', () => {
      // open browser
      browser.url('http://www.zidenice.eu/')

      // wait for title element
      const titleElm = $('//title[contains(text(),"Brno-Židenice")]')
      expect(titleElm.waitForExist()).to.be.true

      // evaluate of Performance Audit
      browser.EvaluatePerformanceAudit()

      // wait for loadEventEnd
      browser.waitForloadEventEnd()
    })
  })

})
