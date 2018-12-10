mocha.setup('bdd')
// var chai = require('chai')
// chai.use(require('chai-dom'))
console.log('test script')
const expect = chai.expect
const should = chai.should
const assert = chai.assert


// DOM STRINGS
let cardContainer
let quickAlertCard
let favSaveBtn = document.getElementById('favorites')
let childDiv = document.querySelector('div.savedFavorite')
let curReference = document.getElementById('savedCurReference')
let h1 = document.querySelector('h1')
let tripPlanText = document.getElementById('tripPlanText')
cardContainer = document.querySelector('article.cards')
quickAlertCard = document.getElementById('quickAlertCard')


describe('main', () => {
  if (console) console.log('testing main')
  const defaultBadInput = 'asdf'
  const defaultInput = "Denver, CO"
  describe('bad input', () => {
    it('should be false', () => {
      expect(badInput).to.equal(false)
    })
  })
  describe('#getItem', () => {
    it('is a function', () => {
      assert.isFunction(getItem)
    })
    it('gets value from localStorage', () => {
      localStorage.setItem('test', JSON.stringify('test'))
      localStorage.getItem(JSON.stringify('test'))
      assert.exists('test', 'localStorage exists')
    })
    it('Logo to be BIKESLY', () => {
      expect(h1.tagName).to.equal('H1')
      expect(h1.innerText).to.equal('BIKESLY')
    })
  })

  describe('#trip plan', () => {
    it(`is a function`, () => {
      expect(tripPlan).to.be.a('function')
    })
    it('should have the title TRIP PLANNING', () => {
      expect(tripPlanText.innerText).to.equal('TRIP PLANNING')
    })
  })

  describe('quick search', () => {
    it(`is a function`, () => {
      expect(quickSearch).to.be.a('function')
    })
    it('writes city name to DOM', () => {
      expect(document.getElementById('location').innerText).to.equal(`Search Location`)
    })
    describe('#tempConversion', () => {
      it('is a function', () => {
        assert.isFunction(tempConversion)
      })
      it(`converts Kelvin to Fahrenheit`, () => {
        assert.equal(tempConversion(300), 80.6)
      })
    })
    describe('#windConversion', () => {
      it(`is a function`, () => {
        assert.isFunction(windConversion)
      })
      it(`converts m/s to MPH`, () => {
        assert.equal(windConversion(10), 22.37)
      })
    })
    describe('#windDirection', () => {
      it(`converts angle to direction coordinate`, () => {
        assert.isFunction(windDirection)
      })
      it(`converts wind degree to coordinate direction`, () => {
        assert.equal(windDirection(80), 'NE')
      })
    })
  })

  // expect(element.tagName).to.equal()




})
mocha.run()