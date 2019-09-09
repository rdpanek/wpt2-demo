describe('Performance Testing', () => {

  it('open', () => {
    // open browser
    browser.url('https://www.performance-testing.cz')

    // wait for title element
    const titleElm = $('//title[contains(text(),"Performance Testing školení | Web Performance Testing")]')
    expect(titleElm.waitForExist()).to.be.true

    // wait for performance entries
    browser.waitForPerformanceEntry("favicon.ico")
  })

})
