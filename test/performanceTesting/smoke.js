describe('Performance Testing', () => {

  it('open', () => {
    // open browser
    browser.url('/')

    // wait for loadEventEnd
    browser.waitForloadEventEnd()

    // wait for title element
    const titleElm = $('//title[contains(text(),"Performance Testing školení | Web Performance Testing")]')
    expect(titleElm.waitForExist()).to.be.true
  })

})
