describe('Performance Testing', () => {

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
      browser.url('https://www.performance-testing.cz')

      // wait for title element
      const titleElm = $('//title[contains(text(),"Performance Testing školení | Web Performance Testing")]')
      expect(titleElm.waitForExist()).to.be.true

      // evaluate of Performance Audit
      browser.EvaluatePerformanceAudit()

      // wait for loadEventEnd
      browser.waitForloadEventEnd()
    })
  })

})
