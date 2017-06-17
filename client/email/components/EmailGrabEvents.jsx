export default class EmailGrabEvents {

  LargeGroup(n) {
    let lg = Events.find({start: {$gt: new Date(), $lt: n}, published: true, tags: "Large Group"}).fetch();
    
  }
}
