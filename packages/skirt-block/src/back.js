import { addDartToCurve, dartCalc } from './utils'
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

  points.backSideCurveCp1 = points.sideSeat.shift(90, measurements.waistToSeat * 0.26)
  points.backSideCurveCp2 = points.backSideSeam.shift(285, measurements.waistToSeat * 0.34)

  points.backWaistCurveBaseCp1 = points.backSideSeamPoint.shift(
    180,
    points.centreBackWaist.dist(points.backSideSeam) / 10
  )
  points.backWaistCurveBaseCp2 = points.centreBackWaist.shift(
    0,
    points.centreBackWaist.dist(points.backSideSeam) / 2
  )

  let backWaistCurve = new Path()
    .move(points.centreBackWaist)
    .curve(points.backWaistCurveBaseCp2, points.backWaistCurveBaseCp1, points.backSideSeam)

  let dartSize = 0.5 * (measurements.seat - measurements.waist) * 0.2
  let backDart1Depth = options.backDartDepthFactor * measurements.waistToSeat
  let backDart2Depth =
    options.backDartDepthFactor * options.backDartReduction * measurements.waistToSeat
  //Back Dart 1
  let curve1 = addDartToCurve(
    part,
    backWaistCurve,
    0.5 * backWaistCurve.length(),
    dartSize,
    backDart1Depth
  )

  let waistLength = curve1.left.length()
  points.dart1Start = curve1.dart.start()
  points.dart1Middle = curve1.dart.ops[1].to
  points.dart1End = curve1.dart.end()
  //Back Dart 2
  let curve2 = addDartToCurve(
    part,
    curve1.right,
    backWaistCurve.length() / 4,
    dartSize,
    backDart2Depth
  )
  waistLength += curve2.left.length()
  waistLength += curve2.right.length()
  let waistPath = curve1.left.join(
    curve1.dart.join(curve2.left.join(curve2.dart.join(curve2.right)))
  )
  let waistPathSA = curve1.left.join(curve2.left.join(curve2.right))
  points.dart2Start = curve2.dart.start()
  points.dart2Middle = curve2.dart.ops[1].to
  points.dart2End = curve2.dart.end()

  paths.waist = waistPath.reverse().setRender(false)
  paths.waistSA = waistPathSA.reverse().setRender(false)

  paths.sideSeam = new Path()
    .move(points.sideHem)
    .line(points.sideSeat)
    .curve(points.backSideCurveCp1, points.backSideCurveCp2, points.backSideSeam)
    .setRender(false)

  paths.centerBack = new Path()
    .move(points.centreBackWaist)
    .line(points.centreBackSeat)
    .line(points.centreBackHem)
    .setRender(false)

  paths.bottom = new Path().move(points.sideHem).line(points.centreBackHem).setRender(false)

  paths.seam = paths.seam = paths.sideSeam
    .clone()
    .join(paths.waist)
    .join(paths.centerBack)
    .join(paths.bottom)
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    if (sa) {
      paths.sa = new Path()
        .move(points.centreBackHem)
        .join(paths.sideSeam)
        .join(paths.waistSA)
        .offset(sa)
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless || true) {
    macro('hd', {
      from: points.dart1End,
      to: points.dart1Start,
      y: points.dart1End.y - 15
    })

    macro('hd', {
      from: points.dart2End,
      to: points.dart2Start,
      y: points.dart2End.y - 15
    })

    macro('hd', {
      from: points.centreBackHem,
      to: points.sideHem,
      y: points.sideHem.y + 15
    })

    macro('vd', {
      from: points.centreBackWaist,
      to: points.centreBackHem,
      x: points.centreBackHem.x - 15
    })

    macro('vd', {
      from: points.dart1End,
      to: points.dart1Middle,
      x: points.dart1Middle.x - 15
    })

    macro('vd', {
      from: points.dart2End,
      to: points.dart2Middle,
      x: points.dart2Middle.x - 15
    })
  }

  return part
}
