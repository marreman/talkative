const Talkative = require("../talkative")

describe("talkative", () => {
  it("should be a function", () => {
    expect(typeof Talkative).toEqual("function")
  })

  it("should have an empty events property", () => {
    expect(new Talkative().events).toEqual({})
  })

  it("should be possible to bind to events", () => {
    const mediator = new Talkative()
    const callback = jasmine.createSpy()

    mediator.bind("foo", callback)
    mediator.trigger("foo")

    expect(callback).toHaveBeenCalled()
  })

  it("should be possible to unbind to events", () => {
    const mediator = new Talkative()
    const callback = jasmine.createSpy()

    mediator.bind("foo", callback)
    mediator.unbind("foo", callback)
    mediator.trigger("foo")

    expect(callback).not.toHaveBeenCalled()
  })

  it("should not explode when triggering an event that has no listeners", () => {
    expect(() => {
      const mediator = new Talkative()
      mediator.trigger("foo")
    }).not.toThrow()
  })
})
