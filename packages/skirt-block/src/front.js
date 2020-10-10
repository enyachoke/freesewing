import { join } from 'path'
import { addDartToCurve, dartCalc } from './utils'
// /**
//  * Calculates the angle (in degress) between two points pointing outward from one center
//  *
//  * @param p0 first point
//  * @param p1 second point
//  * @param c center point
//  */
// const find_angle = function (p0, p1, c) {
//   var p0c = Math.sqrt(Math.pow(c.x - p0.x, 2) +
//     Math.pow(c.y - p0.y, 2)); // p0->c (b)
//   var p1c = Math.sqrt(Math.pow(c.x - p1.x, 2) +
//     Math.pow(c.y - p1.y, 2)); // p1->c (a)
//   var p0p1 = Math.sqrt(Math.pow(p1.x - p0.x, 2) +
//     Math.pow(p1.y - p0.y, 2)); // p0->p1 (c)
//   return Math.acos((p1c * p1c + p0c * p0c - p0p1 * p0p1) / (2 * p1c * p0c)) * (180 / Math.PI);
// }

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
    utils,
    measurements
  } = part.shorthand()

  points.frontSideCurveCp1 = points.frontSideSeam.shift(250, measurements.waistToSeat * 0.382)
  points.frontSideCurveCp2 = points.sideSeat.shift(90, measurements.waistToSeat * 0.233)

  points.frontWaistCurveBaseCp2 = points.frontSideSeamPoint.shift(
    0,
    points.centreFrontWaist.dist(points.frontSideSeam) / 10
  )
  points.frontWaistCurveBaseCp1 = points.centreFrontWaist.shift(
    180,
    points.centreFrontWaist.dist(points.frontSideSeam) / 2
  )

  let frontWaistCurve = new Path()
    .move(points.frontSideSeam)
    .curve(points.frontWaistCurveBaseCp2, points.frontWaistCurveBaseCp1, points.centreFrontWaist)

  let dartSize = 0.5 * (measurements.seat - measurements.waist) * 0.18
  let frontDart1Depth = options.frontDartDepthFactor * measurements.waistToSeat
  //Front Dart 1
  let curve1 = addDartToCurve(
    part,
    frontWaistCurve,
    0.4 * frontWaistCurve.length(),
    dartSize,
    frontDart1Depth
  )
  let waistLength = curve1.left.length()
  points.frontDartStart = curve1.dart.start()
  points.frontDartMiddle = curve1.dart.ops[1].to
  points.frontDartEnd = curve1.dart.end()
  waistLength += curve1.right.length()
  let waistPath = curve1.left.join(curve1.dart.join(curve1.right))
  let waistPathSA = curve1.left.join(curve1.right)

  paths.waistF = waistPath.reverse().setRender(false)
  paths.waistFSA = waistPathSA.reverse().setRender(false)

  paths.sideSeam = new Path()
    .move(points.frontSideSeam)
    .curve(points.frontSideCurveCp1, points.frontSideCurveCp2, points.sideSeat)
    .line(points.sideHem)
    .setRender(false)

  paths.bottom = new Path().move(points.sideHem).line(points.centreFrontHem).setRender(false)
  points.hemPointSide = points.sideHem.shift(270, options.hem)
  points.hemPointcentreFront = points.centreFrontHem.shift(270, options.hem)

  paths.hemLine = new Path()
    .move(points.hemPointSide)
    .line(points.hemPointcentreFront)
    .setRender(false)

  paths.centerFront = new Path()
    .move(points.centreFrontHem)
    .line(points.centreFrontSeat)
    .line(points.centreFrontWaist)
    .setRender(false)

  paths.seam = paths.sideSeam
    .clone()
    .join(paths.bottom)
    .join(paths.centerFront)
    .join(paths.waistF)
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.centreFrontHem,
      to: points.centreFrontWaist,
      grainline: true
    })

    if (sa) {
      paths.sa = new Path()
        .move(points.centreFrontWaist)
        .join(paths.waistFSA)
        .join(paths.sideSeam)
        .join(paths.hemLine)
        .offset(sa)
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.frontSideSeam,
      to: points.centreFrontWaist,
      y: points.frontSideSeam.y - 15
    })

    macro('hd', {
      from: points.frontDartStart,
      to: points.frontDartEnd,
      y: points.frontDartStart.y - 10
    })

    macro('hd', {
      from: points.sideHem,
      to: points.centreFrontHem,
      y: points.sideHem.y + sa + 10
    })

    macro('hd', {
      from: points.frontDartMiddle,
      to: points.frontSideSeam,
      y: points.frontSideSeam.y - sa - 25
    })

    macro('vd', {
      from: points.centreFrontWaist,
      to: points.centreFrontHem,
      x: points.centreFrontWaist.x + sa + 25
    })

    macro('vd', {
      from: points.frontDartEnd,
      to: points.frontDartMiddle,
      x: points.sideSeat.x - +sa + 15
    })
  }

  return part
}
