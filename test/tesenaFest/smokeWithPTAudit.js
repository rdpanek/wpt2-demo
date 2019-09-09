describe('Tesena Fest 2019', () => {

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
      browser.url('https://www.tesena.com/tesena-fest/')

      // wait for title element
      const titleElm = $('//title[contains(text(),"tesena | fest 2019 – tesena")]')
      expect(titleElm.waitForExist()).to.be.true

      // evaluate of Performance Audit
      browser.EvaluatePerformanceAudit()

      // wait for performance entries
      browser.waitForPerformanceEntry("site.webmanifest")
    })
  })

})
