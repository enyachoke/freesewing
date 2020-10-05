export default function (part) {
  let {
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro,
    measurements
  } = part.shorthand()

  points.centreBackWaist = new Point(0, 0)
  points.centreBackSeat = points.centreBackWaist.shift(270, measurements.waistToSeat)
  points.centreBackHem = points.centreBackWaist.shift(270, measurements.waistToKnee)

  let seatEase = options.seatEase * measurements.seat
  let halfWidth = 0.5 * (measurements.seat + 0.5 * seatEase)
  points.centreFrontWaist = points.centreBackWaist.shift(0, halfWidth)
  points.centreFrontSeat = points.centreBackSeat.shift(0, halfWidth)
  points.centreFrontHem = points.centreBackHem.shift(0, halfWidth)

  let waistSeatDifference = measurements.seat / 2 - measurements.waist / 2
  let waistPointRise = measurements.waistToSeat * 0.045
  points.backSideSeamPoint = points.centreBackWaist.shift(
    0,
    0.25 * measurements.waist + waistSeatDifference * 0.45
  )
  points.backSideSeam = points.backSideSeamPoint.shift(90, waistPointRise)
  points.frontSideSeamPoint = points.centreFrontWaist.shift(
    180,
    0.25 * measurements.waist + waistSeatDifference * 0.18
  )
  points.frontSideSeam = points.frontSideSeamPoint.shift(90, waistPointRise)

  points.sideSeat = points.centreBackSeat.shift(0, measurements.seat / 4 + 0.5 * seatEase)
  points.sideHem = points.centreBackHem.shift(0, measurements.seat / 4 + 0.5 * seatEase)

  paths.frame = new Path()
    .move(points.centreBackWaist)
    .line(points.centreBackSeat)
    .line(points.centreBackHem)
    .line(points.centreFrontHem)
    .line(points.centreFrontSeat)
    .line(points.centreFrontWaist)
    .line(points.frontSideSeam)
    .line(points.backSideSeam)
    .setRender(false)
    .close()
  // Complete?
  if (complete) {
  }

  // Paperless?
  if (paperless) {
  }

  return part
}
