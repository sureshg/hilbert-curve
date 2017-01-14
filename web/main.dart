// Copyright (c) 2017, Suresh. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:math';
import 'dart:async';

final rand = new Random();

main() async {
  final canvas = querySelector('#fractal') as CanvasElement;
  var ctx = canvas.context2D;

  var order = 64;
  var factor = min(canvas.width, canvas.height) / order;
  var maxD = pow(order, 2);
  var dist = 0;
  var p = hilbert(order, dist);

  ctx
    ..strokeStyle = randColor
    ..lineWidth = 2
    ..lineCap = "square";

  while (true) {
    ctx
      ..beginPath()
      ..moveTo(p.x * factor, p.y * factor);
    p = hilbert(order, dist);
    ctx
      ..lineTo(p.x * factor, p.y * factor)
      ..stroke();
    dist += 1;

    if (dist >= maxD) {
      dist = 1;
      ctx.strokeStyle = randColor;
      p = hilbert(order, 0);
    }
    //await wait(500);
    await window.animationFrame;
  }
}

/// Sleep [n] milliseconds.
Future<int> wait(int n) =>
    new Future.delayed(new Duration(milliseconds: n), () => n);

/// Random color string generator.
String get randColor =>
    "rgb(${rand.nextInt(240)},${rand.nextInt(240)},${rand.nextInt(240)})";

Point hilbert(int n, int d) {
  var rx = 0, ry = 0, s = 1, p = new Point(0, 0);

  while (s < n) {
    rx = 1 & d ~/ 2;
    ry = 1 & d ^ rx;
    p = rotate(s, p, rx, ry);
    p = p.add(s * rx, s * ry);
    d ~/= 4;
    s *= 2;
  }
  return p;
}

/// Rotate/flip a quadrant appropriately
Point rotate(int n, Point p, int rx, int ry) {
  var np = p;
  if (ry == 0) {
    if (rx == 1) np -= n - 1;
    np = np.swap();
  }
  return np;
}

/// A point in the fractal.
class Point {
  int x, y;

  Point(this.x, this.y);

  Point swap() => new Point(y, x);

  Point add(int a, int b) => new Point(a + x, b + y);

  Point operator -(int n) => new Point(n - x, n - y);

  @override
  String toString() {
    return 'Point{x: $x, y: $y}';
  }
}
